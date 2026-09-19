import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const automations = await prisma.pageAutomation.findMany({
      include: { facebookPage: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: automations });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    let page = await prisma.facebookPage.findFirst();
    if (!page) {
      page = await prisma.facebookPage.create({
        data: {
          pageId: "fb_v3nja_page_01",
          name: "V3NJA Official",
          category: "Musician/Band",
          accessToken: process.env.META_PAGE_ACCESS_TOKEN || "EAAB_mock_page_token",
          followers: 12500,
        },
      });
    }

    const automation = await prisma.pageAutomation.create({
      data: {
        facebookPageId: page.id,
        name: body.name || "WAYULOMI Facebook Drop",
        goal: body.goal || "Stream on Spotify & Apple Music",
        keywords: body.keywords || ["WAYULOMI", "WAYU", "SONG"],
        publicReplyMessages: body.publicReplyMessages || [
          "Thank you for the love! Check your Messenger for VIP access ❤️",
        ],
        messengerMessage:
          body.messengerMessage ||
          "✨ V3NJA WRLD · Official Drop 🎵\n\nThank you for supporting the music! Tap below to stream the official single across Spotify, Apple Music & YouTube. Much love! ✨",
        linkUrl: body.linkUrl || "https://v3nja-official.web.app/wayulomi",
        linkButtonLabel: body.linkButtonLabel || "Stream WAYULOMI 🎵",
        requireLikeFollow: body.requireLikeFollow !== undefined ? Boolean(body.requireLikeFollow) : true,
        followPromptMessage: "Follow V3NJA and tap below to get your official VIP link ❤️",
        followPromptButtonLabel: "I Follow V3NJA ✅",
        followUpEnabled: true,
        followUpDelayMinutes: 20,
        followUpMessage: "Hey! Thank you again for listening. Hope the vibrations resonated with you! ✨",
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, data: automation }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
