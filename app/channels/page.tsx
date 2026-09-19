"use client";

import { useState, useEffect } from "react";

interface ChannelInfo {
  id: string;
  name: string;
  handle: string;
  icon: string;
  isConnected: boolean;
  followers?: number;
}

export default function ChannelsPage() {
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
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchChannels();
  }, []);

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

  const handleConnectFacebook = async (e: React.FormEvent) => {
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
            <span>Social Channels &amp; Real API Connections</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Connect your authentic social media accounts to enable live comment auto-replies and multi-network cross-posting.
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

      {/* Status Alert */}
      {statusMsg && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center justify-between ${
            statusMsg.type === "success"
              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/15 border border-rose-500/30 text-rose-400"
          }`}
        >
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Channel Connection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {channels.map((ch) => (
          <div
            key={ch.id}
            className={`nuelink-card p-5 space-y-4 flex flex-col justify-between ${
              ch.isConnected ? "border-emerald-500/30 bg-emerald-500/[0.02]" : "border-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{ch.icon}</span>
                <div>
                  <div className="text-sm font-bold text-white">{ch.name}</div>
                  <div className="text-xs text-zinc-400">{ch.handle}</div>
                </div>
              </div>

              <span
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                  ch.isConnected
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                ● {ch.isConnected ? "CONNECTED" : "NOT CONNECTED"}
              </span>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                {ch.isConnected ? "Ready for live broadcasting" : "Setup required to publish"}
              </span>

              {ch.id === "FACEBOOK" ? (
                <button
                  onClick={() => setActiveModal("FACEBOOK")}
                  className={ch.isConnected ? "v3nja-btn-secondary px-3 py-1.5 text-xs font-bold text-amber-400" : "v3nja-btn-primary px-3.5 py-1.5 text-xs font-bold"}
                >
                  {ch.isConnected ? "Configure / Update" : "Connect Facebook"}
                </button>
              ) : ch.id === "INSTAGRAM" ? (
                <a
                  href="https://developers.facebook.com/apps"
                  target="_blank"
                  rel="noreferrer"
                  className={ch.isConnected ? "v3nja-btn-secondary px-3 py-1.5 text-xs font-bold text-emerald-400" : "v3nja-btn-secondary px-3 py-1.5 text-xs font-bold text-zinc-300"}
                >
                  {ch.isConnected ? "Instagram Linked" : "Connect Instagram ↗"}
                </a>
              ) : (
                <button
                  onClick={() => alert(`To connect ${ch.name}, add your API credentials in Vercel environment variables or enter them here.`)}
                  className="v3nja-btn-secondary px-3 py-1.5 text-xs font-semibold text-zinc-300"
                >
                  Connect ↗
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Facebook Connection Modal */}
      {activeModal === "FACEBOOK" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="nuelink-card bg-[#121218] max-w-lg w-full p-6 space-y-5 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <span>🔵</span>
                <span>Connect Real Facebook Page</span>
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConnectFacebook} className="space-y-4">
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
                  placeholder="Paste your Page Access Token generated from Meta Graph API Explorer..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
                <span className="text-[10px] text-zinc-500 mt-1 block">
                  Permissions needed: `pages_read_engagement`, `pages_manage_posts`, `pages_messaging`.
                </span>
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
                  {isLoading ? "Connecting..." : "Save & Verify Connection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
