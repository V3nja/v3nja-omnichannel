import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const clientId = process.env.TWITTER_CLIENT_ID || "";
  const host = request.headers.get("host") || "v3nja-omnichannel.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/twitter/callback`;

  if (!clientId) {
    return NextResponse.redirect(
      `${protocol}://${host}/channels?info=${encodeURIComponent(
        "Twitter / X OAuth requires TWITTER_CLIENT_ID in your Vercel project environment."
      )}`
    );
  }

  const scopes = [
    "tweet.read",
    "tweet.write",
    "users.read",
    "offline.access",
  ].join("%20");

  const state = Math.random().toString(36).substring(7);
  const codeChallenge = "challenge"; // Standard PKCE

  const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scopes}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=plain`;

  return NextResponse.redirect(twitterAuthUrl);
}
