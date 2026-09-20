import { NextRequest, NextResponse } from "next/server";
import { generateAICaptions, HASHTAG_VAULT } from "@/lib/ai/caption-engine";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, songTitle, smartLink, style, genre } = body;

    const generated = generateAICaptions({
      topic: topic || "New music drop",
      songTitle: songTitle || "NEW SINGLE",
      smartLink: smartLink,
      style: style || "viral",
      genre: genre || "afrobeats",
    });

    return NextResponse.json({
      success: true,
      data: generated,
      hashtagVault: HASHTAG_VAULT,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
