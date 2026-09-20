"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface ChannelInfo {
  id: string;
  name: string;
  handle: string;
  icon: string;
  isConnected: boolean;
  followers?: number;
}

function ChannelsContent() {
  const searchParams = useSearchParams();
  const [channels, setChannels] = useState<ChannelInfo[]>([
    { id: "FACEBOOK", name: "Facebook Page", handle: "Not Connected", icon: "🔵", isConnected: false },
    { id: "INSTAGRAM", name: "Instagram", handle: "Not Connected", icon: "📸", isConnected: false },
    { id: "YOUTUBE", name: "YouTube Shorts", handle: "Not Connected", icon: "🔴", isConnected: false },
    { id: "TIKTOK", name: "TikTok", handle: "Not Connected", icon: "🎵", isConnected: false },
    { id: "TWITTER", name: "Twitter / X", handle: "Not Connected", icon: "⚫", isConnected: false },
    { id: "LINKEDIN", name: "LinkedIn", handle: "Not Connected", icon: "💼", isConnected: false },
  ]);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showMetaHelp, setShowMetaHelp] = useState(false);
  const [fbPageId, setFbPageId] = useState("");
  const [fbPageToken, setFbPageToken] = useState("");
  const [fbPageName, setFbPageName] = useState("V3NJA Official Facebook Page");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  useEffect(() => {
    fetchChannels();

    const status = searchParams.get("status");
    const err = searchParams.get("error");
    const info = searchParams.get("info");
    const channel = searchParams.get("channel");

    if (status === "success") {
      setStatusMsg({
        type: "success",
        text: `🎉 ${channel ? channel.toUpperCase() : "Channel"} OAuth Login successful! Account connected and active.`,
      });
    } else if (err) {
      setStatusMsg({
        type: "error",
        text: `OAuth Error: ${decodeURIComponent(err)}`,
      });
    } else if (info) {
      setStatusMsg({
        type: "info",
        text: decodeURIComponent(info),
      });
    }
  }, [searchParams]);

  const fetchChannels = async () => {
    try {
      const res = await fetch("/api/channels");
      const data = await res.json();
      if (data.channels) {
        setChannels(data.channels);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleManualFacebookConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbPageId || !fbPageToken) {
      setStatusMsg({ type: "error", text: "Please provide both Page ID and Page Access Token." });
      return;
    }

    setIsLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/channels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: "FACEBOOK",
          pageId: fbPageId,
          token: fbPageToken,
          pageName: fbPageName,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", text: "Facebook Page successfully connected to live engine!" });
        setActiveModal(null);
        fetchChannels();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to connect Facebook Page" });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🔗</span>
            <span>6-Network Social Channel Hub</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            1-Click OAuth login for Facebook, Instagram, YouTube, TikTok, X &amp; LinkedIn — just like Buffer &amp; Nuelink.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMetaHelp(!showMetaHelp)}
            className="v3nja-btn-secondary px-3.5 py-2 text-xs flex items-center gap-2 text-cyan-400 border-cyan-500/30"
          >
            <span>💡</span>
            <span>Meta App Guide</span>
          </button>
          <button
            onClick={fetchChannels}
            className="v3nja-btn-secondary px-3.5 py-2 text-xs flex items-center gap-2"
          >
            <span>🔄</span>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Meta App Domain Helper Box */}
      {showMetaHelp && (
        <div className="nuelink-card p-5 space-y-4 border-cyan-500/40 bg-cyan-500/[0.03]">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>🔵</span>
              <span>How to fix &quot;Can&apos;t load URL / App Domain&quot; in Meta Dashboard (60 Seconds)</span>
            </div>
            <button onClick={() => setShowMetaHelp(false)} className="text-zinc-400 hover:text-white text-xs">✕ Close</button>
          </div>

          <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/10 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-zinc-300">1. Open Your Meta App Settings:</div>
              <a
                href="https://developers.facebook.com/apps/4125567664406392/settings/basic/"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline inline-block font-mono"
              >
                https://developers.facebook.com/apps/4125567664406392/settings/basic/ ↗
              </a>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-zinc-300">2. In &quot;App Domains&quot;, add this domain:</div>
              <div className="flex items-center gap-2">
                <code className="bg-zinc-800 text-amber-400 px-2.5 py-1 rounded font-mono text-xs select-all">
                  v3nja-omnichannel.vercel.app
                </code>
                <button
                  onClick={() => copyToClipboard("v3nja-omnichannel.vercel.app", "domain")}
                  className="px-2 py-1 bg-white/[0.08] hover:bg-white/[0.15] text-zinc-200 rounded text-[10px] font-bold"
                >
                  {copiedText === "domain" ? "✓ Copied!" : "Copy Domain"}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-zinc-300">3. In &quot;Valid OAuth Redirect URIs&quot; (under Facebook Login ➔ Settings), add:</div>
              <div className="flex items-center gap-2">
                <code className="bg-zinc-800 text-amber-400 px-2.5 py-1 rounded font-mono text-xs select-all break-all">
                  https://v3nja-omnichannel.vercel.app/api/auth/facebook/callback
                </code>
                <button
                  onClick={() => copyToClipboard("https://v3nja-omnichannel.vercel.app/api/auth/facebook/callback", "uri")}
                  className="px-2 py-1 bg-white/[0.08] hover:bg-white/[0.15] text-zinc-200 rounded text-[10px] font-bold shrink-0"
                >
                  {copiedText === "uri" ? "✓ Copied!" : "Copy URI"}
                </button>
              </div>
            </div>

            <div className="text-zinc-400 pt-1">
              4. Click <strong className="text-white">Save Changes</strong> at the bottom of Meta Dashboard. Then click the 1-click button below again!
            </div>
          </div>
        </div>
      )}

      {/* Status Notification */}
      {statusMsg && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center justify-between shadow-lg ${
            statusMsg.type === "success"
              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
              : statusMsg.type === "info"
              ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-400"
              : "bg-rose-500/15 border border-rose-500/30 text-rose-400"
          }`}
        >
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 6-Network 1-Click Social OAuth Connect Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Facebook Page */}
        <div className="nuelink-card p-5 space-y-4 flex flex-col justify-between border-blue-500/20 hover:border-blue-500/40">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-lg font-bold shadow-md shadow-blue-500/20">
                  f
                </div>
                <div>
                  <div className="text-sm font-black text-white">Facebook Page</div>
                  <div className="text-[11px] text-zinc-400">
                    {channels.find((c) => c.id === "FACEBOOK")?.isConnected ? "Connected & Active" : "Comment DMs & Reels"}
                  </div>
                </div>
              </div>

              <span
                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                  channels.find((c) => c.id === "FACEBOOK")?.isConnected
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                ● {channels.find((c) => c.id === "FACEBOOK")?.isConnected ? "CONNECTED" : "DISCONNECTED"}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Auto-comment replies, page follow gating &amp; Messenger VIP smart link cards.
            </p>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
            <a
              href="/api/auth/facebook/login"
              className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/20"
            >
              <span>🔵</span>
              <span>1-Click Connect Facebook</span>
            </a>
            <button
              onClick={() => setActiveModal("FACEBOOK")}
              className="w-full text-center text-[10px] text-zinc-500 hover:text-zinc-300 font-medium"
            >
              or paste Page Token manually ➔
            </button>
          </div>
        </div>

        {/* 2. Instagram */}
        <div className="nuelink-card p-5 space-y-4 flex flex-col justify-between border-rose-500/20 hover:border-rose-500/40">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-md shadow-rose-500/20">
                  📸
                </div>
                <div>
                  <div className="text-sm font-black text-white">Instagram</div>
                  <div className="text-[11px] text-zinc-400">@v3nja2.0</div>
                </div>
              </div>

              <span
                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                  channels.find((c) => c.id === "INSTAGRAM")?.isConnected
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                ● {channels.find((c) => c.id === "INSTAGRAM")?.isConnected ? "CONNECTED" : "READY VIA META"}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Publish reels and music clips directly to your Instagram profile.
            </p>
          </div>

          <div className="pt-2 border-t border-white/[0.06]">
            <a
              href="/api/auth/facebook/login"
              className="w-full bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 hover:opacity-90 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-rose-500/20"
            >
              <span>📸</span>
              <span>1-Click Connect Instagram</span>
            </a>
          </div>
        </div>

        {/* 3. YouTube Shorts */}
        <div className="nuelink-card p-5 space-y-4 flex flex-col justify-between border-red-500/20 hover:border-red-500/40">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white text-lg font-bold shadow-md shadow-red-500/20">
                  ▶
                </div>
                <div>
                  <div className="text-sm font-black text-white">YouTube Shorts</div>
                  <div className="text-[11px] text-zinc-400">V3NJA Official</div>
                </div>
              </div>

              <span
                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                  channels.find((c) => c.id === "YOUTUBE")?.isConnected
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                ● {channels.find((c) => c.id === "YOUTUBE")?.isConnected ? "CONNECTED" : "OAUTH READY"}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Upload vertical 1080x1920 HD shorts with automated tags and links.
            </p>
          </div>

          <div className="pt-2 border-t border-white/[0.06]">
            <a
              href="/api/auth/youtube/login"
              className="w-full bg-[#CC0000] hover:bg-[#b30000] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-red-500/20"
            >
              <span>🔴</span>
              <span>Sign in with YouTube</span>
            </a>
          </div>
        </div>

        {/* 4. TikTok */}
        <div className="nuelink-card p-5 space-y-4 flex flex-col justify-between border-cyan-500/20 hover:border-cyan-500/40">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-black border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-lg font-bold shadow-md shadow-cyan-500/20">
                  🎵
                </div>
                <div>
                  <div className="text-sm font-black text-white">TikTok</div>
                  <div className="text-[11px] text-zinc-400">@v3nja_official</div>
                </div>
              </div>

              <span
                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                  channels.find((c) => c.id === "TIKTOK")?.isConnected
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                ● {channels.find((c) => c.id === "TIKTOK")?.isConnected ? "CONNECTED" : "OAUTH READY"}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Auto-post viral music clips with #fyp #afrobeats trending hashtags.
            </p>
          </div>

          <div className="pt-2 border-t border-white/[0.06]">
            <a
              href="/api/auth/tiktok/login"
              className="w-full bg-gradient-to-r from-cyan-600 to-rose-600 hover:opacity-90 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
            >
              <span>🎵</span>
              <span>1-Click Connect TikTok</span>
            </a>
          </div>
        </div>

        {/* 5. Twitter / X */}
        <div className="nuelink-card p-5 space-y-4 flex flex-col justify-between border-white/10 hover:border-white/20">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-black border border-white/20 flex items-center justify-center text-white text-base font-black">
                  𝕏
                </div>
                <div>
                  <div className="text-sm font-black text-white">Twitter / X</div>
                  <div className="text-[11px] text-zinc-400">@v3nja_official</div>
                </div>
              </div>

              <span
                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                  channels.find((c) => c.id === "TWITTER")?.isConnected
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                ● {channels.find((c) => c.id === "TWITTER")?.isConnected ? "CONNECTED" : "OAUTH READY"}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Broadcast concise 280-character teasers and smart release links.
            </p>
          </div>

          <div className="pt-2 border-t border-white/[0.06]">
            <a
              href="/api/auth/twitter/login"
              className="w-full bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <span>⚫</span>
              <span>Authorize with Twitter / X</span>
            </a>
          </div>
        </div>

        {/* 6. LinkedIn */}
        <div className="nuelink-card p-5 space-y-4 flex flex-col justify-between border-blue-400/20 hover:border-blue-400/40">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white text-base font-black shadow-md shadow-blue-500/20">
                  in
                </div>
                <div>
                  <div className="text-sm font-black text-white">LinkedIn</div>
                  <div className="text-[11px] text-zinc-400">V3NJA Official</div>
                </div>
              </div>

              <span
                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                  channels.find((c) => c.id === "LINKEDIN")?.isConnected
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                ● {channels.find((c) => c.id === "LINKEDIN")?.isConnected ? "CONNECTED" : "OAUTH READY"}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Share music industry announcements, press releases &amp; career milestones.
            </p>
          </div>

          <div className="pt-2 border-t border-white/[0.06]">
            <a
              href="/api/auth/linkedin/login"
              className="w-full bg-[#0A66C2] hover:bg-[#095196] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/20"
            >
              <span>💼</span>
              <span>1-Click Connect LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Manual Facebook Token Fallback Modal */}
      {activeModal === "FACEBOOK" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="nuelink-card bg-[#121218] max-w-lg w-full p-6 space-y-5 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <span>🔵</span>
                <span>Manual Facebook Page Connection</span>
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualFacebookConnect} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Facebook Page Name:
                </label>
                <input
                  type="text"
                  value={fbPageName}
                  onChange={(e) => setFbPageName(e.target.value)}
                  placeholder="e.g. V3NJA Official Page"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Facebook Page ID:
                </label>
                <input
                  type="text"
                  value={fbPageId}
                  onChange={(e) => setFbPageId(e.target.value)}
                  placeholder="e.g. 100092837482910"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Page Access Token (`EAA...`):
                </label>
                <textarea
                  rows={3}
                  value={fbPageToken}
                  onChange={(e) => setFbPageToken(e.target.value)}
                  placeholder="Paste your Page Access Token..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="v3nja-btn-secondary px-4 py-2 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="v3nja-btn-primary px-5 py-2 text-xs uppercase tracking-wider font-extrabold"
                >
                  {isLoading ? "Connecting..." : "Save Connection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ChannelsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-zinc-400">Loading 6-network channels...</div>}>
      <ChannelsContent />
    </Suspense>
  );
}
