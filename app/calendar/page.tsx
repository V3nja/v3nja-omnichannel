"use client";

import { useState } from "react";
import Link from "next/link";

interface ScheduledItem {
  id: string;
  day: number;
  time: string;
  title: string;
  platforms: string[];
  type: "REEL" | "VIDEO" | "IMAGE";
  isEvergreen?: boolean;
}

export default function CalendarPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("ALL");
  const [activeItem, setActiveItem] = useState<ScheduledItem | null>(null);

  // 30-Day Scheduled Items Mockup Matrix
  const initialItems: ScheduledItem[] = [
    { id: "1", day: 1, time: "18:00", title: "WAYULOMI Official Visuals", platforms: ["FACEBOOK", "INSTAGRAM", "YOUTUBE_SHORTS", "TWITTER_X"], type: "REEL", isEvergreen: true },
    { id: "2", day: 3, time: "12:30", title: "NJALA Spotify Stream Push", platforms: ["FACEBOOK", "INSTAGRAM", "TWITTER_X"], type: "VIDEO" },
    { id: "3", day: 6, time: "20:00", title: "ZANGA Viral Reel Clip", platforms: ["FACEBOOK", "INSTAGRAM", "YOUTUBE_SHORTS"], type: "REEL" },
    { id: "4", day: 8, time: "15:00", title: "V3NJA WRLD Merch Drop 2026", platforms: ["FACEBOOK", "INSTAGRAM"], type: "IMAGE" },
    { id: "5", day: 11, time: "19:00", title: "MIRAKO Afro Fusion Acoustic", platforms: ["FACEBOOK", "INSTAGRAM", "YOUTUBE_SHORTS"], type: "REEL", isEvergreen: true },
    { id: "6", day: 14, time: "17:30", title: "WAYULOMI Dance Challenge Recap", platforms: ["FACEBOOK", "INSTAGRAM", "YOUTUBE_SHORTS", "TWITTER_X"], type: "REEL" },
    { id: "7", day: 17, time: "13:00", title: "All Music Portal Discography Drop", platforms: ["FACEBOOK", "TWITTER_X"], type: "IMAGE" },
    { id: "8", day: 20, time: "18:30", title: "NJALA Behind The Scenes Clip", platforms: ["FACEBOOK", "INSTAGRAM", "YOUTUBE_SHORTS"], type: "REEL" },
    { id: "9", day: 23, time: "21:00", title: "ZANGA Weekend Club Anthem Push", platforms: ["FACEBOOK", "INSTAGRAM", "TWITTER_X"], type: "REEL", isEvergreen: true },
    { id: "10", day: 26, time: "16:00", title: "VIP Fan Club Community Shoutout", platforms: ["FACEBOOK", "INSTAGRAM"], type: "IMAGE" },
    { id: "11", day: 29, time: "18:00", title: "WAYULOMI Milestone Celebration Reel", platforms: ["FACEBOOK", "INSTAGRAM", "YOUTUBE_SHORTS", "TWITTER_X"], type: "REEL" },
  ];

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const filteredItems = initialItems.filter((item) => {
    if (selectedPlatform === "ALL") return true;
    return item.platforms.includes(selectedPlatform);
  });

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            30-Day Multi-Platform Visual Calendar
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Automated schedule matrix for cross-posting reels, singles, and visual drops across Facebook, Instagram, YouTube Shorts &amp; X.
          </p>
        </div>

        {/* Platform Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "ALL", label: "All Networks" },
            { id: "FACEBOOK", label: "🔵 Facebook" },
            { id: "INSTAGRAM", label: "📸 Instagram" },
            { id: "YOUTUBE_SHORTS", label: "🔴 Shorts" },
            { id: "TWITTER_X", label: "⚫ X" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedPlatform(btn.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                selectedPlatform === btn.id
                  ? "bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/20"
                  : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
              }`}
            >
              {btn.label}
            </button>
          ))}

          <Link
            href="/composer"
            className="v3nja-gold-button px-4 py-2 text-xs uppercase tracking-wider ml-2"
          >
            + Add Drop
          </Link>
        </div>
      </div>

      {/* 30-Day Calendar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {days.map((day) => {
          const dayItems = filteredItems.filter((item) => item.day === day);
          const isToday = day === 1;

          return (
            <div
              key={day}
              className={`glass-card rounded-2xl p-3 min-h-[140px] flex flex-col justify-between transition-all ${
                isToday ? "border-amber-500/50 shadow-gold-glow bg-amber-500/[0.03]" : ""
              }`}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-black ${
                    isToday ? "text-amber-400 font-extrabold" : "text-zinc-400"
                  }`}
                >
                  Day {day} {isToday && "(Today)"}
                </span>
                {dayItems.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </div>

              {/* Items in this Day */}
              <div className="space-y-1.5 my-2">
                {dayItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className="w-full text-left p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-bold text-zinc-200 transition-all hover:scale-[1.02] block space-y-1"
                  >
                    <div className="flex items-center justify-between text-[9px] text-amber-400 font-mono">
                      <span>🕒 {item.time}</span>
                      {item.isEvergreen && <span title="Evergreen Recycled">♻️</span>}
                    </div>
                    <div className="line-clamp-2 leading-tight text-white">{item.title}</div>
                    <div className="flex items-center gap-1 pt-0.5">
                      {item.platforms.map((p) => (
                        <span
                          key={p}
                          className="text-[8px] px-1 py-0.2 rounded bg-black/40 text-zinc-300 font-bold"
                        >
                          {p === "FACEBOOK"
                            ? "FB"
                            : p === "INSTAGRAM"
                            ? "IG"
                            : p === "YOUTUBE_SHORTS"
                            ? "YT"
                            : "X"}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              {/* Day Footer Add Button */}
              <Link
                href={`/composer?day=${day}`}
                className="text-[10px] text-zinc-500 hover:text-amber-400 font-bold text-center py-1 block rounded-lg hover:bg-white/[0.03] transition-colors"
              >
                + Schedule
              </Link>
            </div>
          );
        })}
      </div>

      {/* Selected Item Modal Detail Preview */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl max-w-lg w-full p-6 space-y-5 border-amber-500/40 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎬</span>
                <span className="text-xs font-black uppercase text-amber-400">
                  Scheduled Drop Inspector
                </span>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="text-xs font-bold text-zinc-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-base font-black text-white">{activeItem.title}</h3>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Scheduled for Day {activeItem.day} at {activeItem.time}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-bold text-zinc-300">Target Broadcasting Networks:</div>
                <div className="flex flex-wrap gap-2">
                  {activeItem.platforms.map((p) => (
                    <span
                      key={p}
                      className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300"
                    >
                      ✓ {p}
                    </span>
                  ))}
                </div>
              </div>

              {activeItem.isEvergreen && (
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 flex items-center gap-2">
                  <span>♻️</span>
                  <span>Evergreen Recycler Active · Auto-reposts every 14 days</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  alert("Broadcast triggered live!");
                  setActiveItem(null);
                }}
                className="v3nja-gold-button px-4 py-2 text-xs uppercase"
              >
                ⚡ Broadcast Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
