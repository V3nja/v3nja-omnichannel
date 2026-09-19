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
    { id: "TWITTER", name: "Twitter / X", handle: "Not Connected", icon: "⚫", isConnected: false },
  ]);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [fbPageId, setFbPageId] = useState("");
  const [fbPageToken, setFbPageToken] = useState("");
  const [fbPageName, setFbPageName] = useState("V3NJA Official Facebook Page");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  useEffect(() => {
    fetchChannels();

    // Check OAuth return params
    const status = searchParams.get("status");
    const err = searchParams.get("error");
    const info = searchParams.get("info");

    if (status === "success") {
      setStatusMsg({
        type: "success",
        text: "🎉 Meta OAuth Login successful! Your Facebook Page & automations are now connected and active.",
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
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🔗</span>
            <span>Social Channel Connections</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            1-Click OAuth login for Facebook, Instagram, YouTube &amp; X — just like Buffer &amp; Nuelink.
          </p>
        </div>

        <button
          onClick={fetchChannels}
          className="v3nja-btn-secondary px-3.5 py-2 text-xs flex items-center gap-2 self-start"
        >
          <span>🔄</span>
          <span>Refresh Live Status</span>
        </button>
      </div>

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

      {/* 1-Click Social OAuth Connect Grid (Buffer / Nuelink Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Facebook Page */}
        <div className="nuelink-card p-6 space-y-5 flex flex-col justify-between border-blue-500/20 hover:border-blue-500/40">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-blue-500/20">
                  f
                </div>
                <div>
                  <div className="text-sm font-black text-white">Facebook Page</div>
                  <div className="text-xs text-zinc-400">
                    {channels.find((c) => c.id === "FACEBOOK")?.isConnected ? "Connected & Active" : "Comment-to-DM Engine & Reels"}
                  </div>
                </div>
              </div>

              <span
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                  channels.find((c) => c.id === "FACEBOOK")?.isConnected
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                ● {channels.find((c) => c.id === "FACEBOOK")?.isConnected ? "CONNECTED" : "DISCONNECTED"}
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Enables auto-comment replies, page follow gating, and Messenger VIP smart link cards.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-white/[0.06]">
            <a
              href="/api/auth/facebook/login"
              className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
            >
              <span>🔵</span>
              <span>1-Click Connect with Facebook / Meta</span>
            </a>
            <button
              onClick={() => setActiveModal("FACEBOOK")}
              className="w-full text-center text-[11px] text-zinc-500 hover:text-zinc-300 font-medium py-1"
            >
              or paste Page Token manually ➔
            </button>
          </div>
        </div>

        {/* 2. Instagram */}
        <div className="nuelink-card p-6 space-y-5 flex flex-col justify-between border-rose-500/20 hover:border-rose-500/40">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-rose-500/20">
                  📸
                </div>
                <div>
                  <div className="text-sm font-black text-white">Instagram Account</div>
                  <div className="text-xs text-zinc-400">@v3nja2.0 (Reels Cross-Poster)</div>
                </div>
              </div>

              <span
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                  channels.find((c) => c.id === "INSTAGRAM")?.isConnected
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                ● {channels.find((c) => c.id === "INSTAGRAM")?.isConnected ? "CONNECTED" : "READY VIA META"}
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Publish reels and clips directly to your Instagram profile alongside Facebook and YouTube.
            </p>
          </div>

          <div className="pt-3 border-t border-white/[0.06]">
            <a
              href="/api/auth/facebook/login"
              className="w-full bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 hover:opacity-90 text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-500/20"
            >
              <span>📸</span>
              <span>1-Click Connect Instagram via Meta</span>
            </a>
          </div>
        </div>

        {/* 3. YouTube Shorts */}
        <div className="nuelink-card p-6 space-y-5 flex flex-col justify-between border-red-500/20 hover:border-red-500/40">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-red-500/20">
                  ▶
                </div>
                <div>
                  <div className="text-sm font-black text-white">YouTube Shorts</div>
                  <div className="text-xs text-zinc-400">V3NJA Official Channel</div>
                </div>
              </div>

              <span
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                  channels.find((c) => c.id === "YOUTUBE")?.isConnected
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                ● {channels.find((c) => c.id === "YOUTUBE")?.isConnected ? "CONNECTED" : "DISCONNECTED"}
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Upload 1080x1920 HD vertical music shorts automatically with tailored tags.
            </p>
          </div>

          <div className="pt-3 border-t border-white/[0.06]">
            <a
              href="/api/auth/youtube/login"
              className="w-full bg-[#CC0000] hover:bg-[#b30000] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/20"
            >
              <span>🔴</span>
              <span>Sign in with Google / YouTube</span>
            </a>
          </div>
        </div>

        {/* 4. Twitter / X */}
        <div className="nuelink-card p-6 space-y-5 flex flex-col justify-between border-white/10 hover:border-white/20">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black border border-white/20 flex items-center justify-center text-white text-base font-black">
                  𝕏
                </div>
                <div>
                  <div className="text-sm font-black text-white">Twitter / X</div>
                  <div className="text-xs text-zinc-400">@v3nja_official</div>
                </div>
              </div>

              <span
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                  channels.find((c) => c.id === "TWITTER")?.isConnected
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                ● {channels.find((c) => c.id === "TWITTER")?.isConnected ? "CONNECTED" : "DISCONNECTED"}
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Broadcast concise 280-character teasers and smart links to your X followers.
            </p>
          </div>

          <div className="pt-3 border-t border-white/[0.06]">
            <a
              href="/api/auth/twitter/login"
              className="w-full bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <span>⚫</span>
              <span>Authorize with Twitter / X</span>
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
    <Suspense fallback={<div className="p-8 text-center text-xs text-zinc-400">Loading channels...</div>}>
      <ChannelsContent />
    </Suspense>
  );
}
