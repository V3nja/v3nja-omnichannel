"use client";

import { useState } from "react";
import { generatePlatformCaptions, PlatformCaptions } from "@/lib/crosspost/caption-spinner";

export default function ComposerPage() {
  const [title, setTitle] = useState("WAYULOMI Official Visuals & Drop");
  const [caption, setCaption] = useState(
    "WAYULOMI is out now everywhere! The vibrations are unmatched. Stream on Spotify, Apple Music & YouTube. Tag a friend who needs this energy today! 🔥🌍"
  );
  const [smartLink, setSmartLink] = useState("https://v3nja-official.web.app/wayulomi");
  const [mediaType, setMediaType] = useState<"VIDEO" | "REEL" | "IMAGE">("REEL");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "FACEBOOK",
    "INSTAGRAM",
    "YOUTUBE_SHORTS",
    "TWITTER_X",
  ]);
  const [scheduleDate, setScheduleDate] = useState("2026-09-20T18:00");
  const [isEvergreen, setIsEvergreen] = useState(false);
  const [recycleDays, setRecycleDays] = useState(14);
  const [previewTab, setPreviewTab] = useState<"FACEBOOK" | "INSTAGRAM" | "YOUTUBE_SHORTS" | "TWITTER_X">(
    "FACEBOOK"
  );
  const [publishing, setPublishing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const trackPresets = [
    { name: "WAYULOMI", link: "https://v3nja-official.web.app/wayulomi", defaultCaption: "WAYULOMI is out now everywhere! Stream on Spotify, Apple Music & YouTube. Let me know your favorite bar in the comments! 🔥" },
    { name: "NJALA", link: "https://v3nja-official.web.app/njala", defaultCaption: "NJALA official music video & single is live! Run the numbers up and share the vibe. Much love! 🎬🎶" },
    { name: "ZANGA", link: "https://v3nja-official.web.app/zanga", defaultCaption: "ZANGA energy is taking over! Turn up the volume and dance. Available on all platforms now! ⚡🔥" },
    { name: "MIRAKO", link: "https://v3nja-official.web.app/mirako", defaultCaption: "MIRAKO afro fusion vibrations straight from the heart. Stream & vibe with us today! 🌊✨" },
    { name: "MERCH STORE", link: "https://v3nja-official.web.app/merch", defaultCaption: "V3NJA WRLD Official Merch & Apparel Collection 2026 is here! Premium quality, worldwide delivery. 🛍️👑" },
    { name: "ALL MUSIC PORTAL", link: "https://v3nja-official.web.app/", defaultCaption: "Explore the complete V3NJA WRLD music catalog, visuals, and discography in one place! 🌐🎵" },
  ];

  const generatedCaptions: PlatformCaptions = generatePlatformCaptions(caption, smartLink, title);

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleSelectPreset = (preset: (typeof trackPresets)[0]) => {
    setTitle(`${preset.name} Official Drop`);
    setSmartLink(preset.link);
    setCaption(preset.defaultCaption);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishing(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/scheduler/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          caption,
          mediaType,
          mediaUrl: "https://v3nja-official.web.app/assets/video_preview.mp4",
          scheduledFor: new Date(scheduleDate).toISOString(),
          platforms: selectedPlatforms,
          isEvergreen,
          recycleIntervalDays: recycleDays,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg("🎉 Successfully Scheduled across all selected platforms!");
      }
    } catch (err: any) {
      alert("Error scheduling post: " + err.message);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Multi-Platform Cross-Post Composer
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Draft once and broadcast simultaneously to Facebook Page, Instagram Reels (@v3nja2.0), YouTube Shorts, and X with auto-formatted captions &amp; hashtags.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-sm flex items-center justify-between">
          <span>{successMsg}</span>
          <a href="/calendar" className="underline text-xs">
            View on Calendar →
          </a>
        </div>
      )}

      {/* Grid: Editor Left (7 Cols) & Mobile Preview Right (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Composer Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-6">
            {/* Track / Single Quick Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Quick Single / Preset Auto-Fill:
              </label>
              <div className="flex flex-wrap gap-2">
                {trackPresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-amber-500/50 hover:bg-amber-500/10 text-zinc-300 hover:text-white text-xs font-bold transition-all"
                  >
                    🎵 {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Networks Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Publish To Networks (Simultaneous Broadcast):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "FACEBOOK", label: "🔵 Facebook Page", color: "border-blue-500/40 bg-blue-500/10 text-blue-300" },
                  { id: "INSTAGRAM", label: "📸 Instagram Reels", color: "border-rose-500/40 bg-rose-500/10 text-rose-300" },
                  { id: "YOUTUBE_SHORTS", label: "🔴 YouTube Shorts", color: "border-red-500/40 bg-red-500/10 text-red-300" },
                  { id: "TWITTER_X", label: "⚫ Twitter / X", color: "border-zinc-500/40 bg-zinc-500/10 text-zinc-200" },
                ].map((net) => {
                  const isSelected = selectedPlatforms.includes(net.id);
                  return (
                    <button
                      key={net.id}
                      type="button"
                      onClick={() => togglePlatform(net.id)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? `${net.color} shadow-md`
                          : "border-white/10 bg-white/[0.02] text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <span>{isSelected ? "✓" : "+"}</span>
                      <span>{net.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Post Title */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Drop / Post Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#121218] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Smart Link Destination */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Official Smart Link Destination (Zero Markup):
              </label>
              <input
                type="url"
                value={smartLink}
                onChange={(e) => setSmartLink(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#121218] border border-white/10 text-amber-400 font-mono text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Caption Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-zinc-300">Base Caption &amp; Story Hook:</label>
                <span className="text-[10px] text-zinc-500">{caption.length} characters</span>
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
                rows={4}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#121218] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            {/* Media Format & Date Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Media Format:</label>
                <select
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#121218] border border-white/10 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="REEL">🎬 Short Reel (9:16 Vertical)</option>
                  <option value="VIDEO">🎥 Music Video (16:9 Landscape)</option>
                  <option value="IMAGE">🖼️ Single Cover / Photo (1:1)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Schedule Date &amp; Time:</label>
                <input
                  type="datetime-local"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#121218] border border-white/10 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Evergreen Auto-Recycler Toggle */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>♻️</span>
                  <span>Enable Evergreen Auto-Recycling</span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  Automatically re-post this track every {recycleDays} days to keep streams flowing.
                </div>
              </div>
              <div className="flex items-center gap-3">
                {isEvergreen && (
                  <select
                    value={recycleDays}
                    onChange={(e) => setRecycleDays(Number(e.target.value))}
                    className="text-xs rounded-lg bg-[#181820] border border-white/10 text-amber-400 font-bold px-2 py-1"
                  >
                    <option value={7}>Every 7 Days</option>
                    <option value={14}>Every 14 Days</option>
                    <option value={21}>Every 21 Days</option>
                    <option value={30}>Every 30 Days</option>
                  </select>
                )}
                <input
                  type="checkbox"
                  checked={isEvergreen}
                  onChange={(e) => setIsEvergreen(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={publishing}
              className="v3nja-gold-button w-full py-4 text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
            >
              {publishing ? "Scheduling Post Across 4 Networks..." : `🚀 Schedule Multi-Network Broadcast`}
            </button>
          </form>
        </div>

        {/* Right: Live Interactive Network Previews */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-300">
                Live Network Preview
              </h3>
              <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/10">
                {(["FACEBOOK", "INSTAGRAM", "YOUTUBE_SHORTS", "TWITTER_X"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setPreviewTab(tab)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${
                      previewTab === tab
                        ? "bg-amber-500 text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tab === "FACEBOOK"
                      ? "FB"
                      : tab === "INSTAGRAM"
                      ? "IG"
                      : tab === "YOUTUBE_SHORTS"
                      ? "Shorts"
                      : "X"}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Device Mockup Frame */}
            <div className="rounded-2xl bg-[#0a0a0e] border border-white/15 p-4 space-y-3 shadow-inner">
              {/* Account Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-black text-black text-xs shadow-md">
                    V3
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{previewTab === "FACEBOOK" ? "V3NJA Official" : "@v3nja2.0"}</span>
                      <span className="text-cyan-400 text-[10px]">✓</span>
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      {previewTab === "FACEBOOK"
                        ? "Facebook Page · Sponsored / Post"
                        : previewTab === "INSTAGRAM"
                        ? "Instagram Reel · Audio Original"
                        : previewTab === "YOUTUBE_SHORTS"
                        ? "YouTube Shorts"
                        : "Twitter / X"}
                    </div>
                  </div>
                </div>
                <span className="text-zinc-500 text-xs font-bold">•••</span>
              </div>

              {/* Media Container Mockup */}
              <div className="w-full aspect-[9/12] rounded-xl bg-gradient-to-b from-[#181822] to-[#0c0c12] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent opacity-60" />
                <div className="relative z-10 text-center space-y-2 p-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-xl">
                    🎬
                  </div>
                  <div className="text-xs font-black text-white">{title}</div>
                  <div className="text-[10px] text-zinc-400 font-mono">{mediaType} · 1080x1920 HD</div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold text-amber-400 text-center">
                  Smart Link: {smartLink}
                </div>
              </div>

              {/* Caption Preview tailored to Selected Tab */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto font-sans">
                {previewTab === "FACEBOOK" && generatedCaptions.facebook}
                {previewTab === "INSTAGRAM" && generatedCaptions.instagram}
                {previewTab === "YOUTUBE_SHORTS" && generatedCaptions.youtubeShorts}
                {previewTab === "TWITTER_X" && generatedCaptions.twitterX}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
