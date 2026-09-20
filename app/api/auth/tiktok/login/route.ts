import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const clientKey = process.env.TIKTOK_CLIENT_KEY || "";
  const host = request.headers.get("host") || "v3nja-omnichannel.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/tiktok/callback`;

  if (!clientKey) {
    return NextResponse.redirect(
      `${protocol}://${host}/channels?info=${encodeURIComponent(
        "TikTok requires TIKTOK_CLIENT_KEY in your Vercel project environment variables."
      )}`
    );
  }

  const scopes = [
    "user.info.basic",
    "video.upload",
    "video.publish",
  ].join(",");

  const state = Math.random().toString(36).substring(7);

  const tiktokAuthUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&scope=${scopes}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${state}`;

  return NextResponse.redirect(tiktokAuthUrl);
}
