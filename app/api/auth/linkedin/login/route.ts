import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const clientId = process.env.LINKEDIN_CLIENT_ID || "";
  const host = request.headers.get("host") || "v3nja-omnichannel.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/linkedin/callback`;

  if (!clientId) {
    return NextResponse.redirect(
      `${protocol}://${host}/channels?info=${encodeURIComponent(
        "LinkedIn requires LINKEDIN_CLIENT_ID in your Vercel project environment variables."
      )}`
    );
  }

  const scopes = [
    "openid",
    "profile",
    "w_member_social",
  ].join("%20");

  const state = Math.random().toString(36).substring(7);

  const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${state}&scope=${scopes}`;

  return NextResponse.redirect(linkedinAuthUrl);
}
