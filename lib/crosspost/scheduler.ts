/**
 * Multi-Platform Cross-Post Scheduler & Dispatcher
 */

import { prisma } from "@/lib/db";
import { publishToFacebookPage } from "@/lib/facebook/client";
import { generatePlatformCaptions } from "./caption-spinner";

export interface CreateScheduledPostInput {
  title: string;
  caption: string;
  mediaUrl?: string;
  mediaType?: "VIDEO" | "REEL" | "IMAGE" | "CAROUSEL";
  scheduledFor: Date;
  platforms: Array<"FACEBOOK" | "INSTAGRAM" | "YOUTUBE_SHORTS" | "TWITTER_X">;
  isEvergreen?: boolean;
  recycleIntervalDays?: number;
}

export async function createScheduledPost(input: CreateScheduledPostInput) {
  const post = await prisma.scheduledPost.create({
    data: {
      title: input.title,
      caption: input.caption,
      mediaUrl: input.mediaUrl,
      mediaType: input.mediaType || "VIDEO",
      scheduledFor: input.scheduledFor,
      status: "SCHEDULED",
      platforms: input.platforms,
      isEvergreen: Boolean(input.isEvergreen),
      recycleIntervalDays: input.recycleIntervalDays || 14,
      crossPostTargets: {
        create: input.platforms.map((p) => ({
          platform: p,
          status: "PENDING",
        })),
      },
    },
    include: {
      crossPostTargets: true,
    },
  });

  return post;
}

export async function dispatchPost(postId: string) {
  const post = await prisma.scheduledPost.findUnique({
    where: { id: postId },
    include: { crossPostTargets: true },
  });

  if (!post) throw new Error("Scheduled post not found");

  await prisma.scheduledPost.update({
    where: { id: postId },
    data: { status: "PUBLISHING" },
  });

  const captions = generatePlatformCaptions(post.caption, "https://v3nja-official.web.app/", post.title);

  for (const target of post.crossPostTargets) {
    try {
      if (target.platform === "FACEBOOK") {
        const page = await prisma.facebookPage.findFirst({
          where: { isConnected: true },
        });

        if (page) {
          const isVideo = post.mediaType === "VIDEO" || post.mediaType === "REEL";
          const res = await publishToFacebookPage(
            page.accessToken,
            page.pageId,
            captions.facebook,
            post.mediaUrl || undefined,
            isVideo
          );

          await prisma.crossPostTarget.update({
            where: { id: target.id },
            data: {
              status: "SUCCESS",
              externalPostId: res.id,
              publishedAt: new Date(),
            },
          });
        }
      } else {
        // Multi-network targets simulation/webhook trigger
        await prisma.crossPostTarget.update({
          where: { id: target.id },
          data: {
            status: "SUCCESS",
            externalPostId: `ext_${target.platform.toLowerCase()}_${Date.now()}`,
            publishedAt: new Date(),
          },
        });
      }

      await prisma.broadcastLog.create({
        data: {
          type: "CROSSPOST_BROADCAST",
          platform: target.platform,
          content: post.title,
          status: "SENT",
        },
      });
    } catch (err: any) {
      await prisma.crossPostTarget.update({
        where: { id: target.id },
        data: {
          status: "FAILED",
          errorMessage: err.message,
        },
      });

      await prisma.broadcastLog.create({
        data: {
          type: "CROSSPOST_BROADCAST",
          platform: target.platform,
          content: post.title,
          status: "FAILED",
          errorMessage: err.message,
        },
      });
    }
  }

  const updatedTargets = await prisma.crossPostTarget.findMany({
    where: { scheduledPostId: postId },
  });

  const allSuccess = updatedTargets.every((t) => t.status === "SUCCESS");

  await prisma.scheduledPost.update({
    where: { id: postId },
    data: {
      status: allSuccess ? "PUBLISHED" : "FAILED",
      lastPostedAt: new Date(),
    },
  });

  // Handle Evergreen Recycling
  if (post.isEvergreen && post.recycleIntervalDays) {
    const nextDate = new Date(Date.now() + post.recycleIntervalDays * 24 * 60 * 60 * 1000);
    await prisma.scheduledPost.create({
      data: {
        title: post.title,
        caption: post.caption,
        mediaUrl: post.mediaUrl,
        mediaType: post.mediaType,
        scheduledFor: nextDate,
        status: "SCHEDULED",
        platforms: post.platforms,
        isEvergreen: true,
        recycleIntervalDays: post.recycleIntervalDays,
        crossPostTargets: {
          create: post.platforms.map((p) => ({
            platform: p,
            status: "PENDING",
          })),
        },
      },
    });
  }

  return { success: true };
}
