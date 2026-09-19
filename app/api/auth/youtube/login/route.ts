import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const clientId = process.env.YOUTUBE_CLIENT_ID || "";
  const host = request.headers.get("host") || "v3nja-omnichannel.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/youtube/callback`;

  if (!clientId) {
    // If not configured, explain in redirect
    return NextResponse.redirect(
      `${protocol}://${host}/channels?info=${encodeURIComponent(
        "YouTube OAuth requires YOUTUBE_CLIENT_ID in your Vercel project environment."
      )}`
    );
  }

  const scopes = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" ");

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${encodeURIComponent(scopes)}&access_type=offline&prompt=consent`;

  return NextResponse.redirect(googleAuthUrl);
}
