import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const appId =
    process.env.FACEBOOK_APP_ID ||
    process.env.META_APP_ID ||
    process.env.INSTAGRAM_APP_ID ||
    "4125567664406392";

  const host = request.headers.get("host") || "v3nja-omnichannel.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/facebook/callback`;

  // Meta OAuth Scopes for Pages and Instagram Publishing
  const scopes = [
    "pages_show_list",
    "pages_read_engagement",
    "pages_manage_posts",
    "pages_messaging",
    "instagram_basic",
    "instagram_content_publish",
    "public_profile",
  ].join(",");

  const state = Math.random().toString(36).substring(7);

  const fbAuthUrl = `https://www.facebook.com/v25.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes)}&state=${state}&response_type=code`;

  return NextResponse.redirect(fbAuthUrl);
}
