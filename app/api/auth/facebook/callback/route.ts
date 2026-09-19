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
    let savedCount = 0;

    try {
      if (pages.length === 0) {
        // Fallback user account
        await prisma.facebookPage.upsert({
          where: { pageId: "user_" + (tokenData.user_id || "v3nja") },
          update: {
            accessToken: userAccessToken,
            name: "V3NJA Connected Account",
            isConnected: true,
          },
          create: {
            pageId: "user_" + (tokenData.user_id || "v3nja"),
            name: "V3NJA Connected Account",
            accessToken: userAccessToken,
            isConnected: true,
          },
        }).catch(console.error);
        savedCount = 1;
      } else {
        // Save connected pages
        for (const page of pages) {
          const savedPage = await prisma.facebookPage.upsert({
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

          if (savedPage) {
            savedCount++;
            // Setup default campaigns
            const defaultCampaigns = [
              {
                name: "WAYULOMI Official Stream Delivery",
                keywords: ["WAYULOMI", "WAYU", "WAYULOOMI"],
                messengerMessage: "✨ Here is your VIP high-speed stream link for WAYULOMI! Produced for the culture:",
                linkUrl: "https://v3nja-official.web.app/wayulomi",
                linkButtonLabel: "Stream WAYULOMI 🎵",
              },
              {
                name: "NJALA Club & Radio Anthem",
                keywords: ["NJALA", "NJALAA"],
                messengerMessage: "🔥 Thank you for the love on NJALA! Tap below to watch & stream in Ultra HD:",
                linkUrl: "https://v3nja-official.web.app/njala",
                linkButtonLabel: "Stream NJALA 🔥",
              },
              {
                name: "ZANGA Club Banger",
                keywords: ["ZANGA", "ZANGAA"],
                messengerMessage: "⚡ You asked for it! Here is the exclusive link to stream ZANGA:",
                linkUrl: "https://v3nja-official.web.app/zanga",
                linkButtonLabel: "Stream ZANGA 🚀",
              },
              {
                name: "MIRAKO Afro Fusion Visual",
                keywords: ["MIRAKO", "MIRAKOO"],
                messengerMessage: "🌟 Official MIRAKO stream portal unlocked! Tap below to listen:",
                linkUrl: "https://v3nja-official.web.app/mirako",
                linkButtonLabel: "Stream MIRAKO 🎧",
              },
              {
                name: "V3NJA Official Merch Portal",
                keywords: ["MERCH", "CLOTHES", "HOODIE", "SHOP"],
                messengerMessage: "👑 Check out the official V3NJA WRLD Merch collection & apparel:",
                linkUrl: "https://v3nja-official.web.app/merch",
                linkButtonLabel: "Shop Merch 🛍️",
              },
            ];

            for (const camp of defaultCampaigns) {
              await prisma.pageAutomation.create({
                data: {
                  facebookPageId: savedPage.id,
                  name: camp.name,
                  keywords: camp.keywords,
                  messengerMessage: camp.messengerMessage,
                  linkUrl: camp.linkUrl,
                  linkButtonLabel: camp.linkButtonLabel,
                  publicReplyEnabled: true,
                  publicReplyMessages: [
                    "Sent you the VIP stream link in Messenger! Check your inbox 🎵🔥",
                    "VIP link delivered to your DMs! Enjoy the music ✨🎧",
                  ],
                  requireLikeFollow: true,
                  followPromptButtonLabel: "I Follow V3NJA ✅",
                },
              }).catch(() => {});
            }
          }
        }
      }
    } catch (dbErr) {
      console.error("[DB write error during FB OAuth]", dbErr);
    }

    const response = NextResponse.redirect(
      `${protocol}://${host}/channels?status=success&channel=facebook&count=${savedCount || 1}`
    );

    // Set connection cookie
    response.cookies.set("v3nja_fb_connected", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 60, // 60 days
      httpOnly: false,
    });

    if (pages[0]?.access_token) {
      response.cookies.set("v3nja_fb_page_token", pages[0].access_token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 60,
        httpOnly: true,
      });
    }

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
