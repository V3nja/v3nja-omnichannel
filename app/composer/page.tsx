"use client";

import { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";

interface ChannelConfig {
  id: "FACEBOOK" | "INSTAGRAM" | "YOUTUBE" | "TIKTOK" | "TWITTER" | "LINKEDIN";
  name: string;
  icon: string;
  color: string;
  enabled: boolean;
  charLimit: number;
}

export default function ComposerPage() {
  // 6 Networks
  const [channels, setChannels] = useState<ChannelConfig[]>([
    { id: "FACEBOOK", name: "Facebook Page", icon: "🔵", color: "text-blue-400", enabled: true, charLimit: 5000 },
    { id: "INSTAGRAM", name: "Instagram (@v3nja2.0)", icon: "📸", color: "text-rose-400", enabled: true, charLimit: 2200 },
    { id: "YOUTUBE", name: "YouTube Shorts", icon: "🔴", color: "text-red-400", enabled: true, charLimit: 100 },
    { id: "TIKTOK", name: "TikTok", icon: "🎵", color: "text-cyan-400", enabled: true, charLimit: 2200 },
    { id: "TWITTER", name: "Twitter / X", icon: "⚫", color: "text-zinc-300", enabled: true, charLimit: 280 },
    { id: "LINKEDIN", name: "LinkedIn", icon: "💼", color: "text-blue-500", enabled: true, charLimit: 3000 },
  ]);

  const [activeTab, setActiveTab] = useState<string>("ALL");

  // Captions tailored per network
  const [baseCaption, setBaseCaption] = useState<string>(
    "WAYULOMI is out now! Stream the official single & visualizer on all major music platforms 🔥🎧"
  );
  const [captions, setCaptions] = useState<Record<string, string>>({
    FACEBOOK: "WAYULOMI is out now! Watch the official visualizer and stream on your favorite platform. Drop 'WAYULOMI' in the comments for instant VIP access! 🔥\n\nhttps://v3nja-official.web.app/wayulomi #V3NJA #Wayulomi #AfroFusion",
    INSTAGRAM: "WAYULOMI official music clip 🎬 Stream now via link in bio or tap below! Comment 'WAYULOMI' to get the direct VIP stream link sent to your DMs 🚀\n\n#V3NJA #WAYULOMI #MalawiMusic #Afrobeats #NewMusic2026",
    YOUTUBE: "WAYULOMI (Official Clip) - V3NJA #Shorts #V3NJA #AfroMusic",
    TIKTOK: "WAYULOMI is finally here 🔥 Use this sound & tag me! Full track out on all platforms 🚀 #fyp #afrobeats #v3nja #malawitiktok #newmusic",
    TWITTER: "WAYULOMI official visuals out now worldwide! Stream here: https://v3nja-official.web.app/wayulomi 🔥🎵 #V3NJA #Wayulomi",
    LINKEDIN: "Excited to announce the official release of our latest production 'WAYULOMI' across worldwide distribution channels. Explore the visualizer and discography here: https://v3nja-official.web.app/wayulomi #MusicBusiness #AfroFusion #ReleaseDay",
  });

  // Media
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<"video" | "image">("video");
  const [mediaInfo, setMediaInfo] = useState<{ name: string; size: string; resolution: string }>({
    name: "wayulomi-official-reel.mp4",
    size: "14.2 MB",
    resolution: "1080x1920 (9:16 Vertical Reel)",
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scheduling
  const [scheduleDate, setScheduleDate] = useState("2026-09-20");
  const [scheduleTime, setScheduleTime] = useState("18:00");
  const [isEvergreen, setIsEvergreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const smartLinks = [
    { label: "WAYULOMI", url: "https://v3nja-official.web.app/wayulomi" },
    { label: "NJALA", url: "https://v3nja-official.web.app/njala" },
    { label: "ZANGA", url: "https://v3nja-official.web.app/zanga" },
    { label: "MIRAKO", url: "https://v3nja-official.web.app/mirako" },
    { label: "MERCH", url: "https://v3nja-official.web.app/merch" },
    { label: "ALL MUSIC", url: "https://v3nja-official.web.app/" },
  ];

  const toggleChannel = (id: string) => {
    setChannels(
      channels.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMediaFile(file);
    const isVid = file.type.startsWith("video");
    setMediaType(isVid ? "video" : "image");
    setMediaInfo({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      resolution: isVid ? "1080x1920 (9:16 Vertical Reel)" : "1080x1080 (1:1 Square)",
    });
  };

  const insertLink = (url: string) => {
    if (activeTab === "ALL") {
      setBaseCaption((prev) => `${prev}\n\n${url}`);
      setCaptions((prev) => ({
        FACEBOOK: `${prev.FACEBOOK}\n\n${url}`,
        INSTAGRAM: `${prev.INSTAGRAM}\n\n${url}`,
        YOUTUBE: prev.YOUTUBE,
        TIKTOK: prev.TIKTOK,
        TWITTER: `${prev.TWITTER}\n\n${url}`,
        LINKEDIN: `${prev.LINKEDIN}\n\n${url}`,
      }));
    } else {
      setCaptions((prev) => ({
        ...prev,
        [activeTab]: `${prev[activeTab] || ""}\n\n${url}`,
      }));
    }
  };

  const handleAISpin = () => {
    setCaptions({
      FACEBOOK: `⚡ NEW MUSIC ALERT: WAYULOMI official stream is live! Comment "WAYULOMI" below and I'll send the VIP high-speed stream link straight to your inbox! 🎧\n\nhttps://v3nja-official.web.app/wayulomi #V3NJA #MalawiVibes`,
      INSTAGRAM: `Dropping the official WAYULOMI visual 🔥 Tap the link or comment "WAYULOMI" for direct VIP access 🚀 Produced for the culture.\n\n#V3NJA #WAYULOMI #AfroTech #Visualizer`,
      YOUTUBE: `WAYULOMI (Official Music Video Short) | V3NJA #Shorts #Trending`,
      TIKTOK: `WAYULOMI sound is live! Let me see your videos 🔥 #fyp #v3nja #afrobeats #trending #viral`,
      TWITTER: `WAYULOMI out on all platforms. Run up the streams: https://v3nja-official.web.app/wayulomi 🚀 #V3NJA`,
      LINKEDIN: `Pleased to share our newest music release and visual project 'WAYULOMI'. Streaming now across global DSPs: https://v3nja-official.web.app/wayulomi #V3NJA #MusicProduction`,
    });
    setToastMessage("✨ AI generated 6 custom platform-tailored captions!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePublish = (immediate: boolean) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage(
        immediate
          ? `🚀 Broadcast dispatched to ${channels.filter((c) => c.enabled).length} active channels!`
          : `📅 Post scheduled for ${scheduleDate} at ${scheduleTime} CAT!`
      );
      setTimeout(() => setToastMessage(null), 4000);
    }, 1000);
  };

  const currentCaption = activeTab === "ALL" ? baseCaption : captions[activeTab] || "";
  const activeChannelConfig = channels.find((c) => c.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-black font-extrabold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>⚡</span>
            <span>6-Network Cross-Post &amp; Reel Composer</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Craft 1 post, upload your video, and publish simultaneously to Facebook, Instagram, YouTube, TikTok, X &amp; LinkedIn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAISpin}
            className="v3nja-btn-secondary px-3.5 py-2 text-xs flex items-center gap-2 text-amber-400"
          >
            <span>✨</span>
            <span>AI Spin 6 Captions</span>
          </button>
          <Link
            href="/calendar"
            className="v3nja-btn-secondary px-3.5 py-2 text-xs flex items-center gap-1.5"
          >
            <span>📅</span>
            <span>Queue</span>
          </Link>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. 6-Channel Selector */}
          <div className="nuelink-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300">Publish To:</span>
              <span className="text-[11px] text-zinc-500">
                {channels.filter((c) => c.enabled).length} of 6 networks active
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => toggleChannel(ch.id)}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-bold transition-all ${
                    ch.enabled
                      ? "bg-white/[0.06] border-white/20 text-white shadow-sm"
                      : "bg-white/[0.01] border-white/[0.04] text-zinc-500 opacity-60 hover:opacity-100"
                  }`}
                >
                  <span className="text-sm">{ch.icon}</span>
                  <span className="truncate">{ch.name.split(" ")[0]}</span>
                  {ch.enabled && <span className="text-[10px] text-emerald-400 ml-auto">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Media Upload Dropzone */}
          <div className="nuelink-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <span>🎬</span>
                <span>Upload Video Reel, Short, or Photo</span>
              </span>
              <span className="text-[10px] font-semibold text-zinc-400">
                MP4, MOV, JPG, PNG (9:16 vertical optimized)
              </span>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  setMediaFile(file);
                  const isVid = file.type.startsWith("video");
                  setMediaType(isVid ? "video" : "image");
                  setMediaInfo({
                    name: file.name,
                    size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                    resolution: isVid ? "1080x1920 (9:16 Vertical Reel)" : "1080x1080 (1:1 Square)",
                  });
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging ? "dropzone-active border-amber-400" : "border-white/10 hover:border-amber-400/50 bg-black/20"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl">
                  {mediaType === "video" ? "🎥" : "📁"}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    Drag and drop your reel, short, or visualizer here
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    or click to browse from device
                  </div>
                </div>
              </div>
            </div>

            {mediaInfo && (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{mediaType === "video" ? "🎬" : "🖼️"}</span>
                  <div>
                    <div className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                      {mediaInfo.name}
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      {mediaInfo.size} • {mediaInfo.resolution}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-amber-400 hover:underline font-semibold"
                >
                  Change
                </button>
              </div>
            )}
          </div>

          {/* 3. Captions & Per-Channel Customization */}
          <div className="nuelink-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("ALL")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    activeTab === "ALL"
                      ? "bg-amber-500 text-black"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  All Channels
                </button>
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setActiveTab(ch.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                      activeTab === ch.id
                        ? "bg-white/[0.12] text-white border border-white/20"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{ch.icon}</span>
                    <span>{ch.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>

              <span className="text-[11px] text-zinc-500 font-mono">
                {currentCaption.length} / {activeChannelConfig?.charLimit || 5000}
              </span>
            </div>

            <textarea
              rows={5}
              value={currentCaption}
              onChange={(e) => {
                const val = e.target.value;
                if (activeTab === "ALL") {
                  setBaseCaption(val);
                  setCaptions({
                    FACEBOOK: val,
                    INSTAGRAM: val,
                    YOUTUBE: val.slice(0, 100),
                    TIKTOK: val.slice(0, 2200),
                    TWITTER: val.slice(0, 280),
                    LINKEDIN: val.slice(0, 3000),
                  });
                } else {
                  setCaptions({ ...captions, [activeTab]: val });
                }
              }}
              placeholder="Write your post caption, lyrics teaser, or drop announcement..."
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
            />

            {/* Smart Links */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Insert Official Smart Links:
                </span>
                <span className="text-[10px] text-cyan-400 font-mono">https://v3nja-official.web.app/</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {smartLinks.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => insertLink(link.url)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 text-[11px] font-bold transition-all"
                  >
                    + {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Scheduling & Publishing Actions */}
          <div className="nuelink-card p-5 space-y-4">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>🕒</span>
              <span>Schedule Timing &amp; Evergreen Mode</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                  Publish Date:
                </label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                  Peak Time (CAT):
                </label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div>
                <div className="text-xs font-bold text-white">Evergreen Auto-Recycler</div>
                <div className="text-[10px] text-zinc-400">
                  Automatically re-circulate this post across all 6 channels every 14 days.
                </div>
              </div>
              <input
                type="checkbox"
                checked={isEvergreen}
                onChange={(e) => setIsEvergreen(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handlePublish(false)}
                className="v3nja-btn-primary flex-1 py-3 text-xs uppercase tracking-wider font-black flex items-center justify-center gap-2"
              >
                <span>📅</span>
                <span>{isSubmitting ? "Queueing..." : "Schedule to 30-Day Queue"}</span>
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handlePublish(true)}
                className="v3nja-btn-secondary px-5 py-3 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
              >
                <span>⚡</span>
                <span>Post Now (6 Channels)</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Mobile Preview Feed (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Live Feed Device Preview
            </span>
            <span className="text-[11px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              {activeTab === "ALL" ? "All 6 Networks" : activeTab}
            </span>
          </div>

          <div className="w-full max-w-sm mx-auto bg-black border-4 border-zinc-800 rounded-[32px] p-3.5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-white/[0.08] text-[10px] text-zinc-400">
              <span>9:41</span>
              <div className="w-16 h-3 bg-zinc-800 rounded-full mx-auto"></div>
              <span>5G 100%</span>
            </div>

            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-bold text-black text-xs">
                  V3
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>V3NJA Official</span>
                    <span className="text-cyan-400 text-[10px]">✓</span>
                  </div>
                  <div className="text-[10px] text-zinc-500">Just now • 🎵 WAYULOMI</div>
                </div>
              </div>
              <span className="text-zinc-500 text-sm">•••</span>
            </div>

            <div className="w-full aspect-[9/16] bg-zinc-900 rounded-2xl overflow-hidden relative border border-white/10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 pointer-events-none"></div>

              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl shadow-lg mb-2">
                  ▶
                </div>
                <div className="text-xs font-black text-white">{mediaInfo.name}</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">{mediaInfo.resolution}</div>
              </div>

              <div className="absolute bottom-3 left-3 right-3 z-20 space-y-1 text-left">
                <div className="text-xs font-bold text-white drop-shadow">@v3nja2.0</div>
                <div className="text-[11px] text-zinc-200 line-clamp-2 leading-tight drop-shadow">
                  {currentCaption}
                </div>
                <div className="text-[9px] text-amber-400 font-mono pt-1">
                  🔗 https://v3nja-official.web.app/wayulomi
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 pt-1 text-xs text-zinc-300">
              <div className="flex items-center gap-4">
                <span>❤️ 2.4k</span>
                <span>💬 482</span>
                <span>↗️ Share</span>
              </div>
              <span className="text-amber-400 font-bold text-[11px]">Stream 🎵</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
