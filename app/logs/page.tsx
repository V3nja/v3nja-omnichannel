"use client";

import { useState } from "react";

export default function LogsPage() {
  const [filter, setFilter] = useState<string>("ALL");

  const logs = [
    {
      id: "log_101",
      time: "1 minute ago",
      platform: "FACEBOOK",
      type: "FB_COMMENT_REPLY",
      user: "TNM Music Fan",
      action: 'Comment "WAYULOMI is fire" on Facebook Reel',
      result: "Anti-spam reply posted + Messenger VIP Card delivered (WAYULOMI)",
      status: "SENT",
    },
    {
      id: "log_102",
      time: "8 minutes ago",
      platform: "FACEBOOK",
      type: "MESSENGER_DM",
      user: "Airtel Music Fan",
      action: 'Tapped [ I Follow V3NJA ✅ ] in Messenger',
      result: "Follow verified -> Smart Link (https://v3nja-official.web.app/njala) unlocked",
      status: "SENT",
    },
    {
      id: "log_103",
      time: "24 minutes ago",
      platform: "INSTAGRAM",
      type: "CROSSPOST_BROADCAST",
      user: "@v3nja2.0",
      action: "Multi-network automated broadcast: WAYULOMI Reel Clip",
      result: "Published to Instagram Reels & Facebook Page simultaneously",
      status: "SENT",
    },
    {
      id: "log_104",
      time: "1 hour ago",
      platform: "YOUTUBE",
      type: "CROSSPOST_BROADCAST",
      user: "V3NJA Official",
      action: "Scheduled Drop: ZANGA Visual Clip to YouTube Shorts",
      result: "Uploaded in 1080x1920 HD with #Shorts #V3NJA tags",
      status: "SENT",
    },
    {
      id: "log_105",
      time: "2 hours ago",
      platform: "TWITTER",
      type: "CROSSPOST_BROADCAST",
      user: "@v3nja_official",
      action: "Micro-Broadcast: MIRAKO Single Stream Link",
      result: "248 characters formatted with smart link card preview",
      status: "SENT",
    },
    {
      id: "log_106",
      time: "3 hours ago",
      platform: "FACEBOOK",
      type: "FB_COMMENT_REPLY",
      user: "Blessings M.",
      action: 'Comment "Drop NJALA" on Facebook Post',
      result: "Replied & Sent VIP Link Button to Messenger inbox",
      status: "SENT",
    },
  ];

  const filteredLogs = logs.filter((l) => {
    if (filter === "ALL") return true;
    return l.platform === filter;
  });

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <span>📡</span>
            <span>Real-Time Broadcast &amp; DM Delivery Stream</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Audit trail of all Facebook comment replies, Messenger DM sends, and multi-network cross-posts.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "ALL", label: "All Logs" },
            { id: "FACEBOOK", label: "🔵 Facebook" },
            { id: "INSTAGRAM", label: "📸 Instagram" },
            { id: "YOUTUBE", label: "🔴 YouTube" },
            { id: "TWITTER", label: "⚫ Twitter / X" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                filter === btn.id
                  ? "bg-amber-500 text-black border-amber-400 shadow-md"
                  : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table / Card List */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-bold text-zinc-400">
          <span>EVENT &amp; PLATFORM</span>
          <span>ACTION &amp; RESULT</span>
          <span>STATUS</span>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 sm:w-1/3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${
                      log.platform === "FACEBOOK"
                        ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                        : log.platform === "INSTAGRAM"
                        ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                        : log.platform === "YOUTUBE"
                        ? "bg-red-500/15 text-red-400 border-red-500/30"
                        : "bg-zinc-500/15 text-zinc-300 border-zinc-500/30"
                    }`}
                  >
                    {log.platform}
                  </span>
                  <span className="text-xs font-bold text-white">{log.user}</span>
                </div>
                <div className="text-[11px] text-zinc-500">🕒 {log.time}</div>
              </div>

              <div className="space-y-0.5 sm:w-1/2">
                <div className="text-xs text-zinc-200 font-medium">{log.action}</div>
                <div className="text-[11px] text-zinc-400">{log.result}</div>
              </div>

              <div className="self-start sm:self-center">
                <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  ✓ {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
