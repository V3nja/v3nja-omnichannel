import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pageCount = await prisma.facebookPage.count().catch(() => 0);
    const postCount = await prisma.scheduledPost.count().catch(() => 0);
    const automationCount = await prisma.pageAutomation.count().catch(() => 0);
    const logsCount = await prisma.broadcastLog.count().catch(() => 0);

    return NextResponse.json({
      success: true,
      data: {
        status: "OPERATIONAL",
        graphApiVersion: "v25.0",
        connectedPages: pageCount,
        scheduledPosts: postCount,
        activeAutomations: automationCount,
        totalBroadcastLogs: logsCount,
        engine: "V3NJA Omnichannel & Auto-Crosspost Engine",
        uptime: process.uptime(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
