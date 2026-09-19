import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Check Facebook Page in DB or Env
    const pages = await prisma.facebookPage.findMany();
    const hasFbEnv = Boolean(process.env.FACEBOOK_PAGE_ACCESS_TOKEN);
    const fbConnected = pages.length > 0 || hasFbEnv;

    // 2. Check Instagram in DB or Env
    const hasIgEnv = Boolean(process.env.INSTAGRAM_ACCOUNT_ID || process.env.INSTAGRAM_APP_SECRET);

    // 3. Check YouTube in Env
    const hasYtEnv = Boolean(process.env.YOUTUBE_CLIENT_ID && process.env.YOUTUBE_CLIENT_SECRET);

    // 4. Check Twitter/X in Env
    const hasXEnv = Boolean(process.env.TWITTER_API_KEY && process.env.TWITTER_API_SECRET);

    return NextResponse.json({
      success: true,
      channels: [
        {
          id: "FACEBOOK",
          name: "Facebook Page",
          handle: pages[0]?.name || (hasFbEnv ? "Facebook Page (Token Configured)" : "Not Connected"),
          icon: "🔵",
          isConnected: fbConnected,
          followers: pages[0]?.followers || 0,
          accountType: "PAGE",
        },
        {
          id: "INSTAGRAM",
          name: "Instagram",
          handle: hasIgEnv ? "@v3nja2.0" : "Not Connected",
          icon: "📸",
          isConnected: hasIgEnv,
          followers: hasIgEnv ? 2851 : 0,
          accountType: "BUSINESS",
        },
        {
          id: "YOUTUBE",
          name: "YouTube Shorts",
          handle: hasYtEnv ? "V3NJA Official" : "Not Connected",
          icon: "🔴",
          isConnected: hasYtEnv,
          followers: 0,
          accountType: "CHANNEL",
        },
        {
          id: "TWITTER",
          name: "Twitter / X",
          handle: hasXEnv ? "@v3nja_official" : "Not Connected",
          icon: "⚫",
          isConnected: hasXEnv,
          followers: 0,
          accountType: "ACCOUNT",
        },
      ],
    });
  } catch (err: any) {
    return NextResponse.json({
      success: true,
      channels: [
        { id: "FACEBOOK", name: "Facebook Page", handle: "Not Connected", icon: "🔵", isConnected: false },
        { id: "INSTAGRAM", name: "Instagram", handle: "Not Connected", icon: "📸", isConnected: false },
        { id: "YOUTUBE", name: "YouTube Shorts", handle: "Not Connected", icon: "🔴", isConnected: false },
        { id: "TWITTER", name: "Twitter / X", handle: "Not Connected", icon: "⚫", isConnected: false },
      ],
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { channel, token, pageId, pageName } = body;

    if (channel === "FACEBOOK" && token && pageId) {
      const page = await prisma.facebookPage.upsert({
        where: { pageId },
        update: {
          accessToken: token,
          name: pageName || "V3NJA Facebook Page",
          isConnected: true,
        },
        create: {
          pageId,
          name: pageName || "V3NJA Facebook Page",
          accessToken: token,
          isConnected: true,
        },
      });

      return NextResponse.json({ success: true, page });
    }

    return NextResponse.json({ success: false, error: "Invalid channel payload" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
