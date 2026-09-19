import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "V3NJA · Omnichannel Social Management & Automation Suite",
  description:
    "Buffer & Nuelink-style multi-platform social publisher, reel scheduler, and Facebook Page Messenger DM automation engine for V3NJA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full bg-[#09090b]">
      <body className={`${inter.className} h-full text-zinc-100 flex flex-col md:flex-row overflow-hidden`}>
        {/* Left Sidebar (Buffer / Nuelink Style) */}
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

            {/* Connected Channels List */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-2">
                Connected Channels (4)
              </div>
              <div className="space-y-1 bg-white/[0.02] p-2 rounded-xl border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-white/[0.04] text-zinc-200 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>Facebook Page</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">Connected</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 px-2 rounded-lg text-zinc-300 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>@v3nja2.0 (IG)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">Connected</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 px-2 rounded-lg text-zinc-300 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>YouTube Shorts</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">Connected</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 px-2 rounded-lg text-zinc-300 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                    <span>X (Twitter)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">Connected</span>
                </div>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-2 mb-1">
                Workspace
              </div>
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <span className="text-sm">🎛️</span>
                <span>Dashboard Hub</span>
              </Link>
              <Link
                href="/composer"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20"
              >
                <span className="text-sm">⚡</span>
                <span>Cross-Post Composer</span>
              </Link>
              <Link
                href="/calendar"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <span className="text-sm">📅</span>
                <span>Content Calendar</span>
              </Link>
              <Link
                href="/media"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <span className="text-sm">🎬</span>
                <span>Media &amp; Reel Assets</span>
              </Link>
              <Link
                href="/facebook-automations"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-cyan-400 hover:bg-cyan-500/10 transition-colors"
              >
                <span className="text-sm">🔵</span>
                <span>FB Page Automations</span>
              </Link>
              <Link
                href="/evergreen"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-colors"
              >
                <span className="text-sm">♻️</span>
                <span>Evergreen Recycler</span>
              </Link>
              <Link
                href="/logs"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <span className="text-sm">📡</span>
                <span>Publishing &amp; DM Logs</span>
              </Link>
            </nav>
          </div>

          {/* Bottom Free Tier Status */}
          <div className="p-4 border-t border-white/[0.08] bg-black/30 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Meta API v25.0
              </span>
              <span className="font-bold text-emerald-400">$0 / mo</span>
            </div>
            <div className="text-[10px] text-zinc-500">
              Smart Links ➔ <span className="text-cyan-400 font-mono">v3nja-official.web.app</span>
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
