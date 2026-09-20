import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  const host = request.headers.get("host") || "v3nja-omnichannel.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/youtube/callback`;

  if (error || !code) {
    return NextResponse.redirect(
      `${protocol}://${host}/channels?error=${encodeURIComponent(
        error || "Google / YouTube authentication was canceled"
      )}`
    );
  }

  const clientId = process.env.YOUTUBE_CLIENT_ID || "";
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET || "";

  try {
    if (clientId && clientSecret) {
      // Exchange code with Google OAuth
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) {
        throw new Error(tokenData.error_description || "Failed to exchange Google token");
      }
    }

    const response = NextResponse.redirect(
      `${protocol}://${host}/channels?status=success&channel=youtube`
    );

    response.cookies.set("v3nja_youtube_connected", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 60,
      httpOnly: false,
      sameSite: "lax",
    });

    return response;
  } catch (err: any) {
    console.error("[YouTube Callback Error]", err);
    return NextResponse.redirect(
      `${protocol}://${host}/channels?error=${encodeURIComponent(err.message)}`
    );
  }
}
