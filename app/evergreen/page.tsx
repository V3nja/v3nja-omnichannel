"use client";

import { useState } from "react";
import Link from "next/link";

interface EvergreenTrack {
  id: string;
  name: string;
  type: "SINGLE" | "VISUAL" | "MERCH" | "CATALOG";
  link: string;
  cadenceDays: number;
  lastRecycled: string;
  nextScheduled: string;
  totalRecycles: number;
  status: "ACTIVE" | "PAUSED";
}

export default function EvergreenPage() {
  const [tracks, setTracks] = useState<EvergreenTrack[]>([
    {
      id: "ev_1",
      name: "WAYULOMI (Official Single & Visuals)",
      type: "SINGLE",
      link: "https://v3nja-official.web.app/wayulomi",
      cadenceDays: 14,
      lastRecycled: "3 days ago",
      nextScheduled: "In 11 days",
      totalRecycles: 8,
      status: "ACTIVE",
    },
    {
      id: "ev_2",
      name: "NJALA (Club & Radio Anthem)",
      type: "SINGLE",
      link: "https://v3nja-official.web.app/njala",
      cadenceDays: 14,
      lastRecycled: "5 days ago",
      nextScheduled: "In 9 days",
      totalRecycles: 6,
      status: "ACTIVE",
    },
    {
      id: "ev_3",
      name: "ZANGA (High Energy Club Banger)",
      type: "SINGLE",
      link: "https://v3nja-official.web.app/zanga",
      cadenceDays: 21,
      lastRecycled: "10 days ago",
      nextScheduled: "In 11 days",
      totalRecycles: 4,
      status: "ACTIVE",
    },
    {
      id: "ev_4",
      name: "MIRAKO (Afro Fusion & Vibes)",
      type: "SINGLE",
      link: "https://v3nja-official.web.app/mirako",
      cadenceDays: 21,
      lastRecycled: "8 days ago",
      nextScheduled: "In 13 days",
      totalRecycles: 5,
      status: "ACTIVE",
    },
    {
      id: "ev_5",
      name: "V3NJA WRLD Official Merch & Apparel",
      type: "MERCH",
      link: "https://v3nja-official.web.app/merch",
      cadenceDays: 30,
      lastRecycled: "12 days ago",
      nextScheduled: "In 18 days",
      totalRecycles: 3,
      status: "ACTIVE",
    },
    {
      id: "ev_6",
      name: "V3NJA Discography & All Music Portal",
      type: "CATALOG",
      link: "https://v3nja-official.web.app/",
      cadenceDays: 30,
      lastRecycled: "15 days ago",
      nextScheduled: "In 15 days",
      totalRecycles: 3,
      status: "ACTIVE",
    },
  ]);

  const toggleTrackStatus = (id: string) => {
    setTracks(
      tracks.map((t) =>
        t.id === id ? { ...t, status: t.status === "ACTIVE" ? "PAUSED" : "ACTIVE" } : t
      )
    );
  };

  const updateCadence = (id: string, days: number) => {
    setTracks(
      tracks.map((t) => (t.id === id ? { ...t, cadenceDays: days } : t))
    );
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <span>♻️</span>
            <span>Evergreen Music &amp; Video Auto-Recycler</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Keep your top music releases flowing across Facebook, Instagram, YouTube Shorts &amp; X forever without manual re-posting.
          </p>
        </div>

        <Link
          href="/composer"
          className="v3nja-gold-button px-4 py-2 text-xs uppercase tracking-wider self-start"
        >
          + Add New Evergreen Release
        </Link>
      </div>

      {/* Overview Info Banner */}
      <div className="glass-card folder-tab-purple rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <span>Autonomous Social Broadcasting Engine</span>
            <span className="text-[10px] font-extrabold text-purple-400 bg-purple-500/15 px-2 py-0.5 rounded-full border border-purple-500/30">
              6 TRACKS ACTIVE
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            When a track reaches its cadence (e.g. every 14 days), the AI re-generates fresh hashtags and broadcasts to all 4 social networks.
          </p>
        </div>
        <div className="text-right sm:border-l border-white/10 sm:pl-6">
          <div className="text-xs text-zinc-500 font-bold">Total Streams Generated</div>
          <div className="text-2xl font-black text-amber-400">29 Recycles</div>
        </div>
      </div>

      {/* Grid of Evergreen Releases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tracks.map((t) => (
          <div
            key={t.id}
            className={`glass-card rounded-2xl p-5 space-y-4 transition-all ${
              t.status === "ACTIVE" ? "border-white/10 hover:border-purple-500/40" : "opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold bg-white/[0.05] text-zinc-300 px-2 py-0.5 rounded border border-white/10">
                {t.type}
              </span>
              <button
                onClick={() => toggleTrackStatus(t.id)}
                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border transition-all ${
                  t.status === "ACTIVE"
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                ● {t.status}
              </button>
            </div>

            <div>
              <h3 className="text-base font-black text-white">{t.name}</h3>
              <a
                href={t.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-cyan-400 font-mono hover:underline block mt-1"
              >
                {t.link} ↗
              </a>
            </div>

            {/* Cadence Selector */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400">Recycle Cadence:</span>
              <select
                value={t.cadenceDays}
                onChange={(e) => updateCadence(t.id, Number(e.target.value))}
                className="text-xs font-bold rounded-lg bg-[#181822] border border-white/10 text-amber-400 px-2.5 py-1 focus:outline-none"
              >
                <option value={7}>Every 7 Days</option>
                <option value={14}>Every 14 Days</option>
                <option value={21}>Every 21 Days</option>
                <option value={30}>Every 30 Days</option>
              </select>
            </div>

            {/* Timeline Stats */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-1 border-t border-white/[0.06]">
              <div>
                <span className="text-zinc-500 block">Last Broadcast:</span>
                <span className="text-zinc-300 font-bold">{t.lastRecycled}</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-500 block">Next Broadcast:</span>
                <span className="text-purple-400 font-bold">{t.nextScheduled}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
