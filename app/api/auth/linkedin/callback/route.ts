import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  const host = request.headers.get("host") || "v3nja-omnichannel.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";

  if (error || !code) {
    return NextResponse.redirect(
      `${protocol}://${host}/channels?error=${encodeURIComponent(
        error || "LinkedIn authorization was canceled"
      )}`
    );
  }

  const response = NextResponse.redirect(
    `${protocol}://${host}/channels?status=success&channel=linkedin`
  );

  response.cookies.set("v3nja_linkedin_connected", "true", {
    path: "/",
    maxAge: 60 * 60 * 24 * 60,
    httpOnly: false,
    sameSite: "lax",
  });

  return response;
}
