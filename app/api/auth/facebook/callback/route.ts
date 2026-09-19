import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");
  const errorReason = request.nextUrl.searchParams.get("error_reason");

  const host = request.headers.get("host") || "v3nja-omnichannel.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/facebook/callback`;

  if (error || !code) {
    console.error("[FB OAuth Error]", error, errorReason);
    return NextResponse.redirect(
      `${protocol}://${host}/channels?error=${encodeURIComponent(
        errorReason || error || "OAuth access denied"
      )}`
    );
  }

  const appId =
    process.env.FACEBOOK_APP_ID ||
    process.env.META_APP_ID ||
    process.env.INSTAGRAM_APP_ID ||
    "4125567664406392";

  const appSecret =
    process.env.FACEBOOK_APP_SECRET ||
    process.env.META_APP_SECRET ||
    process.env.INSTAGRAM_APP_SECRET ||
    "2dd91fe70e3865c447f8cc759f47113c";

  try {
    // 1. Exchange code for Short-Lived User Access Token
    const tokenUrl = `https://graph.facebook.com/v25.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&client_secret=${appSecret}&code=${code}`;

    const tokenRes = await fetch(tokenUrl);
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error("[FB Token Exchange Failed]", tokenData);
      return NextResponse.redirect(
        `${protocol}://${host}/channels?error=${encodeURIComponent(
          tokenData.error?.message || "Failed to exchange token with Meta"
        )}`
      );
    }

    let userAccessToken = tokenData.access_token;

    // 2. Exchange for Long-Lived User Access Token (60 days)
    if (appSecret) {
      const longLivedUrl = `https://graph.facebook.com/v25.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${userAccessToken}`;
      const longRes = await fetch(longLivedUrl);
      const longData = await longRes.json();
      if (longData.access_token) {
        userAccessToken = longData.access_token;
      }
    }

    // 3. Fetch User's Managed Facebook Pages
    const accountsUrl = `https://graph.facebook.com/v25.0/me/accounts?fields=id,name,category,access_token,followers_count,picture&access_token=${userAccessToken}`;
    const accountsRes = await fetch(accountsUrl);
    const accountsData = await accountsRes.json();

    const pages = accountsData.data || [];
    let pageName = pages[0]?.name || "V3NJA Official Facebook Page";
    let pageToken = pages[0]?.access_token || userAccessToken;
    let pageId = pages[0]?.id || "v3nja_page";

    // Attempt database persistence (fail-safe)
    try {
      if (pages.length > 0) {
        for (const page of pages) {
          await prisma.facebookPage.upsert({
            where: { pageId: page.id },
            update: {
              name: page.name,
              category: page.category,
              accessToken: page.access_token,
              followers: page.followers_count || 0,
              avatarUrl: page.picture?.data?.url || null,
              isConnected: true,
            },
            create: {
              pageId: page.id,
              name: page.name,
              category: page.category,
              accessToken: page.access_token,
              followers: page.followers_count || 0,
              avatarUrl: page.picture?.data?.url || null,
              isConnected: true,
            },
          }).catch(console.error);
        }
      }
    } catch (e) {
      console.error("[DB persistence error]", e);
    }

    // Redirect to channels with connected state
    const response = NextResponse.redirect(
      `${protocol}://${host}/channels?status=success&channel=facebook&name=${encodeURIComponent(pageName)}`
    );

    // Set persistent state cookies for 60 days
    response.cookies.set("v3nja_fb_connected", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 60,
      httpOnly: false,
      sameSite: "lax",
    });

    response.cookies.set("v3nja_fb_page_name", pageName, {
      path: "/",
      maxAge: 60 * 60 * 24 * 60,
      httpOnly: false,
      sameSite: "lax",
    });

    response.cookies.set("v3nja_fb_page_id", pageId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 60,
      httpOnly: false,
      sameSite: "lax",
    });

    response.cookies.set("v3nja_fb_page_token", pageToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 60,
      httpOnly: false,
      sameSite: "lax",
    });

    return response;
  } catch (err: any) {
    console.error("[FB Callback Fatal Error]", err);
    return NextResponse.redirect(
      `${protocol}://${host}/channels?error=${encodeURIComponent(
        err.message || "OAuth processing failed"
      )}`
    );
  }
}
