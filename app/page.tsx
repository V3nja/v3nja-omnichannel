"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CommandHubPage() {
  const [stats, setStats] = useState({
    scheduledPosts: 12,
    crosspostNetworks: 4,
    fbCommentsHandled: 48,
    messengerDmsSent: 48,
  });

  const upcomingPosts = [
    {
      id: "post_1",
      title: "WAYULOMI Official Visuals & Reel Clip",
      scheduledFor: "Today · 6:00 PM",
      platforms: ["FACEBOOK", "INSTAGRAM", "YOUTUBE_SHORTS", "TWITTER_X"],
      type: "REEL",
      status: "READY",
    },
    {
      id: "post_2",
      title: "NJALA Single Drop & Streaming Reminder",
      scheduledFor: "Tomorrow · 12:30 PM",
      platforms: ["FACEBOOK", "INSTAGRAM", "TWITTER_X"],
      type: "VIDEO",
      status: "SCHEDULED",
    },
    {
      id: "post_3",
      title: "ZANGA Viral Dance Challenge Announcement",
      scheduledFor: "Sep 22 · 8:00 PM",
      platforms: ["FACEBOOK", "INSTAGRAM", "YOUTUBE_SHORTS"],
      type: "REEL",
      status: "SCHEDULED",
    },
    {
      id: "post_4",
      title: "V3NJA WRLD VIP Merch Drop 2026 Collection",
      scheduledFor: "Sep 24 · 3:00 PM",
      platforms: ["FACEBOOK", "INSTAGRAM", "TWITTER_X"],
      type: "IMAGE",
      status: "SCHEDULED",
    },
  ];

  const recentLogs = [
    {
      id: "log_1",
      time: "2 mins ago",
      platform: "FACEBOOK",
      type: "FB_COMMENT_REPLY",
      user: "TNM Music Fan",
      details: 'Comment "WAYULOMI" on Reel -> Messenger VIP Card delivered with stream button',
      status: "SENT",
    },
    {
      id: "log_2",
      time: "15 mins ago",
      platform: "INSTAGRAM",
      type: "CROSSPOST_BROADCAST",
      user: "@v3nja2.0",
      details: 'Published "MIRAKO Afro Fusion Visual" across Instagram Reels & Facebook Page',
      status: "SENT",
    },
    {
      id: "log_3",
      time: "1 hour ago",
      platform: "FACEBOOK",
      type: "MESSENGER_DM",
      user: "Airtel Music Lover",
      details: 'Sent official NJALA smart link (https://v3nja-official.web.app/njala) via Messenger Card',
      status: "SENT",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              V3NJA OMNICHANNEL SUITE
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Command &amp; Auto-Crosspost Hub
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Automate Facebook Page comment-to-Messenger DMs, schedule multi-network reels across FB, IG, YouTube Shorts &amp; X for days in advance with zero monthly fees.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/composer"
            className="v3nja-gold-button px-5 py-3 text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <span>⚡ Create New Cross-Post</span>
          </Link>
          <Link
            href="/calendar"
            className="glass-card px-4 py-3 text-xs font-bold text-zinc-300 hover:text-white rounded-xl"
          >
            📅 View 30-Day Queue
          </Link>
        </div>
      </div>

      {/* 4 Executive Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card folder-tab-cyan rounded-2xl p-5 space-y-2">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400">
            Scheduled Queue
          </div>
          <div className="text-3xl font-black text-white">{stats.scheduledPosts}</div>
          <div className="text-xs text-zinc-400">Posts scheduled for next 30 days</div>
        </div>

        <div className="glass-card folder-tab-gold rounded-2xl p-5 space-y-2">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
            Active Networks
          </div>
          <div className="text-3xl font-black text-white">{stats.crosspostNetworks}</div>
          <div className="text-xs text-zinc-400">FB Page, IG (@v3nja2.0), YouTube, X</div>
        </div>

        <div className="glass-card folder-tab-emerald rounded-2xl p-5 space-y-2">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
            FB Comments Handled
          </div>
          <div className="text-3xl font-black text-white">{stats.fbCommentsHandled}</div>
          <div className="text-xs text-zinc-400">Auto anti-spam replies sent</div>
        </div>

        <div className="glass-card folder-tab-purple rounded-2xl p-5 space-y-2">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-purple-400">
            Messenger DMs Sent
          </div>
          <div className="text-3xl font-black text-white">{stats.messengerDmsSent}</div>
          <div className="text-xs text-zinc-400">VIP smart link cards delivered</div>
        </div>
      </div>

      {/* 4 Signature Liquid Glass Folder Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">
            Core Omnichannel Modules
          </h2>
          <span className="text-[11px] text-zinc-500">All 4 Systems Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Module 1: FB Page DM Automation */}
          <Link
            href="/facebook-automations"
            className="glass-card folder-tab-cyan rounded-2xl p-5 space-y-4 hover:scale-[1.02] transition-transform block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🔵</span>
              <span className="text-[10px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                META GRAPH v25.0
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                Facebook Page DM Automation
              </h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                Convert Facebook post &amp; reel comments into instant Messenger DMs with smart links &amp; anti-spam replies.
              </p>
            </div>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-cyan-400">
              <span>Manage 6 Campaigns</span>
              <span>→</span>
            </div>
          </Link>

          {/* Module 2: Cross-Post Composer */}
          <Link
            href="/composer"
            className="glass-card folder-tab-gold rounded-2xl p-5 space-y-4 hover:scale-[1.02] transition-transform block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">⚡</span>
              <span className="text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                MULTI-NETWORK
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                Multi-Platform Cross-Poster
              </h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                Upload 1 reel or clip and publish simultaneously to FB Page, Instagram, YouTube Shorts, and X with custom captions.
              </p>
            </div>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-amber-400">
              <span>Open Composer</span>
              <span>→</span>
            </div>
          </Link>

          {/* Module 3: 30-Day Calendar */}
          <Link
            href="/calendar"
            className="glass-card folder-tab-emerald rounded-2xl p-5 space-y-4 hover:scale-[1.02] transition-transform block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">📅</span>
              <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                AUTO-QUEUE
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                30-Day Visual Calendar
              </h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                Schedule your entire month of music drops, visuals, and reel teasers at peak audience listening hours.
              </p>
            </div>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>View Calendar</span>
              <span>→</span>
            </div>
          </Link>

          {/* Module 4: Evergreen Recycler */}
          <Link
            href="/evergreen"
            className="glass-card folder-tab-purple rounded-2xl p-5 space-y-4 hover:scale-[1.02] transition-transform block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">♻️</span>
              <span className="text-[10px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full">
                AUTONOMOUS
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                Evergreen Music Recycler
              </h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                Automatically recycle top singles (WAYULOMI, NJALA, ZANGA, MIRAKO) every 14–30 days on autopilot.
              </p>
            </div>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-purple-400">
              <span>Configure Recycler</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Grid: Upcoming Scheduled Drops & Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Upcoming Drops (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">
              Upcoming Scheduled Cross-Posts
            </h2>
            <Link href="/calendar" className="text-xs font-bold text-amber-400 hover:underline">
              Full Schedule →
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingPosts.map((post) => (
              <div
                key={post.id}
                className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{post.title}</span>
                    <span className="text-[10px] font-extrabold bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                      {post.type}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400 flex items-center gap-2">
                    <span>🕒 {post.scheduledFor}</span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    {post.platforms.map((p) => (
                      <span
                        key={p}
                        className="text-[9px] font-bold bg-white/[0.05] text-zinc-300 px-2 py-0.5 rounded border border-white/10"
                      >
                        {p === "FACEBOOK"
                          ? "🔵 FB"
                          : p === "INSTAGRAM"
                          ? "📸 IG"
                          : p === "YOUTUBE_SHORTS"
                          ? "🔴 Shorts"
                          : "⚫ X"}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    ● {post.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Activity Stream (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">
              Live Activity Stream
            </h2>
            <Link href="/logs" className="text-xs font-bold text-amber-400 hover:underline">
              View All Logs →
            </Link>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-zinc-400">
                  <span className="font-bold text-white">
                    {log.platform === "FACEBOOK" ? "🔵 Facebook Page" : "📸 Instagram (@v3nja2.0)"}
                  </span>
                  <span>{log.time}</span>
                </div>
                <div className="text-xs text-zinc-300 font-medium leading-relaxed">
                  {log.details}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-zinc-400">Trigger: {log.user}</span>
                  <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded">
                    ✓ {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
