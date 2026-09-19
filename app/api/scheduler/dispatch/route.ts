import { NextRequest, NextResponse } from "next/server";
import { dispatchPost } from "@/lib/crosspost/scheduler";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const postId = body.postId;
    if (!postId) {
      return NextResponse.json({ success: false, error: "Post ID required" }, { status: 400 });
    }

    const res = await dispatchPost(postId);
    return NextResponse.json({ success: true, result: res });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
