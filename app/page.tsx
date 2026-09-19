"use client";

import Link from "next/link";

export default function DashboardPage() {
  const channelStats = [
    { name: "Facebook Page", handle: "V3NJA Official Page", icon: "🔵", status: "Active", postsCount: 18, color: "border-blue-500/30" },
    { name: "Instagram", handle: "@v3nja2.0", icon: "📸", status: "Active", postsCount: 24, color: "border-rose-500/30" },
    { name: "YouTube", handle: "V3NJA Shorts", icon: "🔴", status: "Active", postsCount: 12, color: "border-red-500/30" },
    { name: "Twitter / X", handle: "@v3nja_official", icon: "⚫", status: "Active", postsCount: 30, color: "border-zinc-700" },
  ];

  const upcomingQueue = [
    {
      id: "q1",
      title: "WAYULOMI Official Visual Teaser",
      time: "Tomorrow at 18:00 CAT",
      platforms: ["🔵 FB", "📸 IG", "🔴 YT", "⚫ X"],
      status: "QUEUED",
      link: "https://v3nja-official.web.app/wayulomi",
    },
    {
      id: "q2",
      title: "NJALA Club & Radio Release Clip",
      time: "Wednesday at 19:30 CAT",
      platforms: ["🔵 FB", "📸 IG", "🔴 YT"],
      status: "QUEUED",
      link: "https://v3nja-official.web.app/njala",
    },
    {
      id: "q3",
      title: "ZANGA Studio Performance Reel",
      time: "Friday at 20:00 CAT",
      platforms: ["🔵 FB", "📸 IG", "⚫ X"],
      status: "QUEUED",
      link: "https://v3nja-official.web.app/zanga",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🎛️</span>
            <span>Omnichannel Publishing Hub</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Cross-post music drops, schedule 30-day queues, and automate Facebook comment DMs for $0/month.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/composer"
            className="v3nja-btn-primary px-4 py-2.5 text-xs uppercase tracking-wider font-extrabold flex items-center gap-1.5"
          >
            <span>⚡</span>
            <span>Create Cross-Post</span>
          </Link>
          <Link
            href="/calendar"
            className="v3nja-btn-secondary px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>📅</span>
            <span>30-Day Queue</span>
          </Link>
        </div>
      </div>

      {/* 4 Connected Channel Status Cards (Buffer / Nuelink style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {channelStats.map((ch) => (
          <div key={ch.name} className={`nuelink-card p-4 space-y-3 ${ch.color}`}>
            <div className="flex items-center justify-between">
              <span className="text-xl">{ch.icon}</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                ● {ch.status}
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">{ch.name}</div>
              <div className="text-xs text-zinc-400">{ch.handle}</div>
            </div>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
              <span>Published Drops:</span>
              <span className="font-bold text-white">{ch.postsCount}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Scheduled Queue & Quick Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upcoming Scheduled Drops (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Upcoming Queue
            </h2>
            <Link href="/calendar" className="text-xs text-amber-400 hover:underline font-bold">
              View Calendar →
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingQueue.map((item) => (
              <div
                key={item.id}
                className="nuelink-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-all"
              >
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">{item.title}</div>
                  <div className="text-xs text-amber-400 font-semibold">🕒 {item.time}</div>
                  <div className="flex items-center gap-1.5 pt-1">
                    {item.platforms.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded font-medium text-zinc-300"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2">
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                    {item.status}
                  </span>
                  <Link
                    href="/composer"
                    className="text-xs text-zinc-400 hover:text-white font-medium"
                  >
                    Edit ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Subsystems (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Automation Modules
            </h2>
            <span className="text-[10px] text-zinc-500">4 Systems Active</span>
          </div>

          <div className="space-y-3">
            <Link
              href="/facebook-automations"
              className="nuelink-card p-4 block hover:border-cyan-500/40 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span>🔵</span>
                  <span>Facebook Page DM Automations</span>
                </span>
                <span className="text-xs text-cyan-400">→</span>
              </div>
              <p className="text-xs text-zinc-400">
                Auto-reply to FB video comments and deliver Messenger VIP smart link cards.
              </p>
            </Link>

            <Link
              href="/evergreen"
              className="nuelink-card p-4 block hover:border-emerald-500/40 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span>♻️</span>
                  <span>Evergreen Music Recycler</span>
                </span>
                <span className="text-xs text-emerald-400">→</span>
              </div>
              <p className="text-xs text-zinc-400">
                Keep WAYULOMI, NJALA, ZANGA &amp; MIRAKO circulating on autopilot every 14–30 days.
              </p>
            </Link>

            <Link
              href="/media"
              className="nuelink-card p-4 block hover:border-amber-500/40 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span>🎬</span>
                  <span>Media &amp; Reel Asset Vault</span>
                </span>
                <span className="text-xs text-amber-400">→</span>
              </div>
              <p className="text-xs text-zinc-400">
                Upload and store high-res reels, teaser snippets, and cover artworks.
              </p>
            </Link>

            <Link
              href="/logs"
              className="nuelink-card p-4 block hover:border-purple-500/40 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span>📡</span>
                  <span>Live Activity Stream</span>
                </span>
                <span className="text-xs text-purple-400">→</span>
              </div>
              <p className="text-xs text-zinc-400">
                Real-time delivery logs of all cross-posts, comments, and Messenger cards.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
