import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "V3NJA OMNICHANNEL · Facebook Automation & Multi-Platform Scheduler",
  description: "Enterprise multi-platform social media auto-scheduler, cross-poster, and Facebook Page comment-to-Messenger DM automation suite.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#08080a] text-zinc-100 antialiased selection:bg-amber-500 selection:text-black">
        {/* Top Glow Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-amber-500 to-rose-500" />

        {/* Global Navigation Header */}
        <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0c0c10]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 font-black text-black shadow-gold-glow">
                  V3
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black tracking-tight text-white sm:text-base">
                      V3NJA OMNICHANNEL
                    </span>
                    <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-extrabold text-amber-400 border border-amber-500/30">
                      STUDIO PRO
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    FB Page DM Automation &amp; Multi-Platform Scheduler
                  </div>
                </div>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-zinc-300">
                <Link
                  href="/"
                  className="rounded-lg px-3 py-1.5 hover:bg-white/[0.06] hover:text-white transition-colors"
                >
                  Command Hub
                </Link>
                <Link
                  href="/composer"
                  className="rounded-lg px-3 py-1.5 hover:bg-white/[0.06] hover:text-white transition-colors text-amber-400"
                >
                  ⚡ Cross-Post Composer
                </Link>
                <Link
                  href="/calendar"
                  className="rounded-lg px-3 py-1.5 hover:bg-white/[0.06] hover:text-white transition-colors"
                >
                  📅 30-Day Calendar
                </Link>
                <Link
                  href="/facebook-automations"
                  className="rounded-lg px-3 py-1.5 hover:bg-white/[0.06] hover:text-white transition-colors text-cyan-400"
                >
                  🔵 FB Page Automations
                </Link>
                <Link
                  href="/evergreen"
                  className="rounded-lg px-3 py-1.5 hover:bg-white/[0.06] hover:text-white transition-colors text-emerald-400"
                >
                  ♻️ Evergreen Recycler
                </Link>
                <Link
                  href="/logs"
                  className="rounded-lg px-3 py-1.5 hover:bg-white/[0.06] hover:text-white transition-colors"
                >
                  📡 Live Logs
                </Link>
              </nav>
            </div>

            {/* Right Status */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Meta API v25.0 Active</span>
              </div>

              <Link
                href="/composer"
                className="v3nja-gold-button px-3.5 py-1.5 text-xs uppercase tracking-wider"
              >
                + New Cross-Post
              </Link>
            </div>
          </div>
        </header>

        {/* Main Workspace Body */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
