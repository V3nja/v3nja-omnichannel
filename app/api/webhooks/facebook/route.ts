import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  sendPageCommentReply,
  sendPageMessengerGenericCard,
  sendPageMessengerPrivateReply,
} from "@/lib/facebook/client";

export const dynamic = "force-dynamic";

/**
 * Meta Webhook Verification (GET)
 */
export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("hub.mode");
  const token = request.nextUrl.searchParams.get("hub.verify_token");
  const challenge = request.nextUrl.searchParams.get("hub.challenge");

  const validTokens = [
    process.env.META_VERIFY_TOKEN,
    process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN,
    process.env.WEBHOOK_VERIFY_TOKEN,
    "v3nja_secure_webhook_token_2026",
    "v3nja_omnichannel_secret_2026",
    "v3nja_secure_webhook_token",
  ].filter(Boolean);

  if (mode === "subscribe" && token && validTokens.includes(token)) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

/**
 * Inbound Facebook Webhook Event Processor (POST)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.object === "page") {
      for (const entry of body.entry || []) {
        const pageId = entry.id;

        // Process Facebook Page Feed Comments
        for (const change of entry.changes || []) {
          if (change.field === "feed") {
            const val = change.value;
            if (val.item === "comment" && val.verb === "add") {
              const commentId = val.comment_id;
              const message = val.message || "";
              const commenterId = val.from?.id;
              const commenterName = val.from?.name || "Music Fan";

              // Find active automation matching keyword
              const automations = await prisma.pageAutomation.findMany({
                where: { isActive: true },
                include: { facebookPage: true },
              });

              for (const auto of automations) {
                const isMatch = auto.keywords.some((kw) =>
                  message.toUpperCase().includes(kw.toUpperCase())
                );

                if (isMatch) {
                  const pageToken = auto.facebookPage?.accessToken || process.env.FACEBOOK_PAGE_ACCESS_TOKEN || "";

                  // 1. Send Public Anti-Spam Reply
                  if (auto.publicReplyEnabled && auto.publicReplyMessages.length > 0 && pageToken) {
                    const randomReply =
                      auto.publicReplyMessages[
                        Math.floor(Math.random() * auto.publicReplyMessages.length)
                      ];
                    await sendPageCommentReply(pageToken, commentId, randomReply).catch(console.error);
                  }

                  // 2. Send Messenger Private Reply / Smart Link Card
                  if (commenterId && pageToken) {
                    await sendPageMessengerGenericCard(
                      pageToken,
                      commenterId,
                      auto.name,
                      auto.messengerMessage,
                      auto.linkButtonLabel,
                      auto.linkUrl
                    ).catch(async () => {
                      // Fallback to private reply
                      await sendPageMessengerPrivateReply(
                        pageToken,
                        commentId,
                        `${auto.messengerMessage}\n\n🎧 Stream & Watch:\n${auto.linkUrl}`
                      ).catch(console.error);
                    });
                  }

                  // Record Log
                  await prisma.broadcastLog.create({
                    data: {
                      type: "FB_COMMENT_REPLY",
                      platform: "FACEBOOK",
                      triggerUser: commenterName,
                      content: `Comment: "${message}" -> Automation: ${auto.name}`,
                      status: "SENT",
                    },
                  }).catch(console.error);

                  break;
                }
              }
            }
          }
        }
      }

      return NextResponse.json({ success: true, processed: true });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[FB Webhook Error]", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
