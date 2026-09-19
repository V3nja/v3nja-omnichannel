import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createScheduledPost } from "@/lib/crosspost/scheduler";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await prisma.scheduledPost.findMany({
      include: { crossPostTargets: true },
      orderBy: { scheduledFor: "asc" },
    });
    return NextResponse.json({ success: true, data: posts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const post = await createScheduledPost({
      title: body.title,
      caption: body.caption,
      mediaUrl: body.mediaUrl,
      mediaType: body.mediaType || "VIDEO",
      scheduledFor: new Date(body.scheduledFor || Date.now()),
      platforms: body.platforms || ["FACEBOOK", "INSTAGRAM", "YOUTUBE_SHORTS", "TWITTER_X"],
      isEvergreen: Boolean(body.isEvergreen),
      recycleIntervalDays: Number(body.recycleIntervalDays) || 14,
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    await prisma.scheduledPost.delete({ where: { id } });
    return NextResponse.json({ success: true, deleted: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
