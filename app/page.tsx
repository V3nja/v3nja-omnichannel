"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ChannelInfo {
  id: string;
  name: string;
  handle: string;
  icon: string;
  isConnected: boolean;
  followers?: number;
}

interface ScheduledPostItem {
  id: string;
  title: string;
  caption: string;
  scheduledFor: string;
  status: string;
  platforms: string[];
}

export default function DashboardPage() {
  const [channels, setChannels] = useState<ChannelInfo[]>([]);
  const [posts, setPosts] = useState<ScheduledPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRealData() {
      try {
        const [channelsRes, postsRes] = await Promise.all([
          fetch("/api/channels"),
          fetch("/api/scheduler/posts"),
        ]);
        const channelsData = await channelsRes.json();
        const postsData = await postsRes.json();

        if (channelsData.channels) setChannels(channelsData.channels);
        if (postsData.posts) setPosts(postsData.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadRealData();
  }, []);

  const connectedCount = channels.filter((c) => c.isConnected).length;

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
            Real-time management for multi-network cross-posts and Facebook Page Messenger automations.
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
            href="/channels"
            className="v3nja-btn-secondary px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>🔗</span>
            <span>Connect Channels</span>
          </Link>
        </div>
      </div>

      {/* Real Channels Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {channels.length > 0 ? (
          channels.map((ch) => (
            <div
              key={ch.id}
              className={`nuelink-card p-4 space-y-3 ${
                ch.isConnected ? "border-emerald-500/30 bg-emerald-500/[0.02]" : "border-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{ch.icon}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    ch.isConnected
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : "text-zinc-500 bg-zinc-800 border-zinc-700"
                  }`}
                >
                  ● {ch.isConnected ? "CONNECTED" : "DISCONNECTED"}
                </span>
              </div>
              <div>
                <div className="text-sm font-bold text-white">{ch.name}</div>
                <div className="text-xs text-zinc-400 truncate">{ch.handle}</div>
              </div>
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                <span>Status:</span>
                <Link
                  href="/channels"
                  className={`text-xs font-bold ${
                    ch.isConnected ? "text-emerald-400 hover:underline" : "text-amber-400 hover:underline"
                  }`}
                >
                  {ch.isConnected ? "Manage ↗" : "Connect ➔"}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 p-6 nuelink-card text-center text-xs text-zinc-400">
            Loading real channel states...
          </div>
        )}
      </div>

      {/* Real Queue & Subsystems */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Real Scheduled Posts Queue */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Live Scheduled Queue ({posts.length})
            </h2>
            <Link href="/calendar" className="text-xs text-amber-400 hover:underline font-bold">
              View Full Calendar →
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="space-y-3">
              {posts.map((item) => (
                <div
                  key={item.id}
                  className="nuelink-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">{item.title}</div>
                    <div className="text-xs text-amber-400 font-semibold">
                      🕒 Scheduled for {new Date(item.scheduledFor).toLocaleString()}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full self-start sm:self-center">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="nuelink-card p-8 text-center space-y-3 border-dashed">
              <div className="text-3xl">📅</div>
              <div className="text-sm font-bold text-white">No Scheduled Posts in Queue</div>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Your queue is currently empty. Use the Cross-Post Composer to schedule your first music drop or reel.
              </p>
              <Link
                href="/composer"
                className="v3nja-btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-extrabold mt-2"
              >
                <span>⚡</span>
                <span>Create Your First Drop</span>
              </Link>
            </div>
          )}
        </div>

        {/* Right: Quick Real Links */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Active Engines
            </h2>
            <span className="text-[10px] text-zinc-500">Live Meta Graph v25.0</span>
          </div>

          <div className="space-y-3">
            <Link
              href="/facebook-automations"
              className="nuelink-card p-4 block hover:border-cyan-500/40 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span>🔵</span>
                  <span>Facebook Comment-to-DM Engine</span>
                </span>
                <span className="text-xs text-cyan-400">→</span>
              </div>
              <p className="text-xs text-zinc-400">
                Real-time keyword triggers for WAYULOMI, NJALA, ZANGA, MIRAKO &amp; Merch.
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
                6 catalog releases configured to auto-recycle every 14–30 days.
              </p>
            </Link>

            <Link
              href="/logs"
              className="nuelink-card p-4 block hover:border-purple-500/40 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span>📡</span>
                  <span>Live Delivery Logs</span>
                </span>
                <span className="text-xs text-purple-400">→</span>
              </div>
              <p className="text-xs text-zinc-400">
                View real audit logs of comment replies, Messenger DMs, and broadcasts.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
