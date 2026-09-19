"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [channelCounts, setChannelCounts] = useState({ connected: 0, total: 4 });

  useEffect(() => {
    fetch("/api/channels")
      .then((res) => res.json())
      .then((data) => {
        if (data.channels) {
          const connected = data.channels.filter((c: any) => c.isConnected).length;
          setChannelCounts({ connected, total: data.channels.length });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <html lang="en" className="dark h-full bg-[#09090b]">
      <body className="h-full text-zinc-100 flex flex-col md:flex-row overflow-hidden antialiased">
        {/* Left Sidebar (Buffer / Verlynk Style) */}
        <aside className="w-full md:w-64 lg:w-72 bg-[#0d0d12] border-b md:border-b-0 md:border-r border-white/[0.08] flex flex-col justify-between shrink-0 z-40">
          {/* Brand & Channels */}
          <div className="p-4 sm:p-5 space-y-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-black text-black text-lg shadow-md shadow-amber-500/20">
                  V3
                </div>
                <div>
                  <div className="font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                    V3NJA STUDIO
                    <span className="text-[9px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded font-bold">
                      PRO
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-500 font-medium">Omnichannel Suite</div>
                </div>
              </Link>
            </div>

            {/* Quick Action Compose Button */}
            <Link
              href="/composer"
              className="v3nja-btn-primary w-full py-2.5 px-4 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-extrabold"
            >
              <span className="text-base leading-none">⚡</span>
              <span>New Cross-Post</span>
            </Link>

            {/* Connected Channels Summary */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-2">
                <span>Channels</span>
                <span className="text-amber-400">{channelCounts.connected} / {channelCounts.total} Connected</span>
              </div>
              <Link
                href="/channels"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] text-xs font-semibold text-zinc-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">🔗</span>
                  <span>Connect / Manage Accounts</span>
                </div>
                <span className="text-[10px] text-amber-400 font-bold">Configure →</span>
              </Link>
            </div>

            {/* Main Navigation */}
            <nav className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-2 mb-1">
                Workspace
              </div>
              <Link
                href="/"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  pathname === "/"
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <span className="text-sm">🎛️</span>
                <span>Dashboard Hub</span>
              </Link>
              <Link
                href="/composer"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  pathname === "/composer"
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <span className="text-sm">⚡</span>
                <span>Cross-Post Composer</span>
              </Link>
              <Link
                href="/calendar"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  pathname === "/calendar"
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <span className="text-sm">📅</span>
                <span>Content Calendar</span>
              </Link>
              <Link
                href="/media"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  pathname === "/media"
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <span className="text-sm">🎬</span>
                <span>Media &amp; Reel Assets</span>
              </Link>
              <Link
                href="/facebook-automations"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  pathname === "/facebook-automations"
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <span className="text-sm">🔵</span>
                <span>FB Page Automations</span>
              </Link>
              <Link
                href="/evergreen"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  pathname === "/evergreen"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <span className="text-sm">♻️</span>
                <span>Evergreen Recycler</span>
              </Link>
              <Link
                href="/logs"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  pathname === "/logs"
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <span className="text-sm">📡</span>
                <span>Publishing Logs</span>
              </Link>
            </nav>
          </div>

          {/* Bottom Info */}
          <div className="p-4 border-t border-white/[0.08] bg-black/30 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Meta API v25.0
              </span>
              <span className="font-bold text-emerald-400">$0 / mo</span>
            </div>
            <div className="text-[10px] text-zinc-500">
              Destination ➔ <span className="text-cyan-400 font-mono">v3nja-official.web.app</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#09090c] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
