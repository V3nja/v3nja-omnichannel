"use client";

import { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";
import { HASHTAG_VAULT } from "@/lib/ai/caption-engine";

interface ChannelConfig {
  id: "FACEBOOK" | "INSTAGRAM" | "YOUTUBE" | "TIKTOK" | "TWITTER" | "LINKEDIN";
  name: string;
  icon: string;
  color: string;
  enabled: boolean;
  charLimit: number;
}

export default function ComposerPage() {
  // 6 Social Networks
  const [channels, setChannels] = useState<ChannelConfig[]>([
    { id: "FACEBOOK", name: "Facebook Page", icon: "🔵", color: "text-blue-400", enabled: true, charLimit: 5000 },
    { id: "INSTAGRAM", name: "Instagram (@v3nja2.0)", icon: "📸", color: "text-rose-400", enabled: true, charLimit: 2200 },
    { id: "YOUTUBE", name: "YouTube Shorts", icon: "🔴", color: "text-red-400", enabled: true, charLimit: 100 },
    { id: "TIKTOK", name: "TikTok", icon: "🎵", color: "text-cyan-400", enabled: true, charLimit: 2200 },
    { id: "TWITTER", name: "Twitter / X", icon: "⚫", color: "text-zinc-300", enabled: true, charLimit: 280 },
    { id: "LINKEDIN", name: "LinkedIn", icon: "💼", color: "text-blue-500", enabled: true, charLimit: 3000 },
  ]);

  const [activeTab, setActiveTab] = useState<string>("ALL");

  // Dynamic Custom Release Data (Supports ANY song/content)
  const [customSongTitle, setCustomSongTitle] = useState("NEW MUSIC DROP");
  const [customSmartLink, setCustomSmartLink] = useState("https://v3nja-official.web.app/");
  const [aiStyle, setAiStyle] = useState<"viral" | "release" | "story" | "punchy" | "business">("viral");
  const [aiTopic, setAiTopic] = useState("Official music video & stream release");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Captions for all 6 networks
  const [baseCaption, setBaseCaption] = useState<string>(
    "🔥 New music is finally here! Stream the official track & visualizer on all major platforms worldwide 🎧"
  );
  const [captions, setCaptions] = useState<Record<string, string>>({
    FACEBOOK: "🔥 New music is finally here! Stream the official visualizer now. Drop a comment below for instant VIP stream access! 🎵\n\nhttps://v3nja-official.web.app/ #V3NJA #NewMusic #AfroFusion",
    INSTAGRAM: "Wait for the beat drop on this one 🤯 Out now everywhere! Comment for direct VIP access 🚀\n\nhttps://v3nja-official.web.app/ #V3NJA #ViralReels #Afrobeats #NewMusic",
    YOUTUBE: "NEW TRACK (Official Clip) - V3NJA #Shorts #V3NJA #Trending",
    TIKTOK: "Use this sound & tag me! Full track out on all platforms 🔥🚀 #fyp #afrobeats #v3nja #trending #viral",
    TWITTER: "New music out worldwide! Stream the official release here: https://v3nja-official.web.app/ 🔥🎵 #V3NJA",
    LINKEDIN: "Excited to share our newest music production and release. Streaming now across global distribution channels: https://v3nja-official.web.app/ #MusicBusiness #CreativeDirection #V3NJA",
  });

  const [seoTags, setSeoTags] = useState<string[]>([
    "v3nja official audio",
    "afrobeats new music 2026",
    "trending tiktok audio",
    "african pop music",
  ]);

  // Media
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"video" | "image">("video");
  const [mediaInfo, setMediaInfo] = useState<{ name: string; size: string; resolution: string }>({
    name: "official-release-clip.mp4",
    size: "16.4 MB",
    resolution: "1080x1920 (9:16 Vertical Reel / TikTok)",
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scheduling
  const [scheduleDate, setScheduleDate] = useState("2026-09-20");
  const [scheduleTime, setScheduleTime] = useState("18:00");
  const [isEvergreen, setIsEvergreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toggle channel
  const toggleChannel = (id: string) => {
    setChannels(
      channels.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  // Upload file
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMediaFile(file);
    const objectUrl = URL.createObjectURL(file);
    setMediaPreviewUrl(objectUrl);
    const isVid = file.type.startsWith("video");
    setMediaType(isVid ? "video" : "image");
    setMediaInfo({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      resolution: isVid ? "1080x1920 (9:16 Vertical)" : "1080x1080 (1:1 Square)",
    });
  };

  // AI Generation
  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          songTitle: customSongTitle,
          smartLink: customSmartLink,
          topic: aiTopic,
          style: aiStyle,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCaptions({
          FACEBOOK: data.data.facebook,
          INSTAGRAM: data.data.instagram,
          YOUTUBE: data.data.youtube,
          TIKTOK: data.data.tiktok,
          TWITTER: data.data.twitter,
          LINKEDIN: data.data.linkedin,
        });
        setBaseCaption(data.data.instagram);
        setSeoTags(data.data.seoKeywords || []);
        setToastMessage("✨ AI generated 6 platform-tailored captions & hashtags!");
        setTimeout(() => setToastMessage(null), 3500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Add hashtag to active caption
  const addHashtag = (tag: string) => {
    if (activeTab === "ALL") {
      setBaseCaption((prev) => `${prev} ${tag}`);
      setCaptions((prev) => ({
        FACEBOOK: `${prev.FACEBOOK} ${tag}`,
        INSTAGRAM: `${prev.INSTAGRAM} ${tag}`,
        YOUTUBE: `${prev.YOUTUBE} ${tag}`.slice(0, 100),
        TIKTOK: `${prev.TIKTOK} ${tag}`,
        TWITTER: `${prev.TWITTER} ${tag}`.slice(0, 280),
        LINKEDIN: `${prev.LINKEDIN} ${tag}`,
      }));
    } else {
      setCaptions((prev) => ({
        ...prev,
        [activeTab]: `${prev[activeTab] || ""} ${tag}`,
      }));
    }
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
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-black font-extrabold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>⚡</span>
            <span>Universal Cross-Post &amp; AI Viral Studio</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Upload any video or artwork, generate viral SEO captions &amp; hashtags, and publish across 6 networks.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleGenerateAI}
            disabled={isGeneratingAI}
            className="btn-gold px-4 py-2 text-xs uppercase tracking-wider font-extrabold flex items-center gap-1.5"
          >
            <span>✨</span>
            <span>{isGeneratingAI ? "Generating..." : "Generate AI Captions"}</span>
          </button>
          <Link href="/calendar" className="btn-secondary px-4 py-2 text-xs font-semibold">
            📅 View Queue
          </Link>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Inputs & AI Tools (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Channel Selector */}
          <div className="saas-card p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
              <span>Target Channels ({channels.filter((c) => c.enabled).length}/6):</span>
              <button
                type="button"
                onClick={() => setChannels(channels.map((c) => ({ ...c, enabled: true })))}
                className="text-[11px] text-amber-400 hover:underline"
              >
                Select All 6
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => toggleChannel(ch.id)}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-bold transition-all ${
                    ch.enabled
                      ? "bg-white/[0.08] border-white/20 text-white shadow-sm"
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

          {/* 2. Media Uploader (Accepts ANY video/image) */}
          <div className="saas-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <span>🎬</span>
                <span>Upload Any Video, Reel, Short or Photo</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-semibold">
                MP4, MOV, WEBM, JPG, PNG
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
                  const objectUrl = URL.createObjectURL(file);
                  setMediaPreviewUrl(objectUrl);
                  const isVid = file.type.startsWith("video");
                  setMediaType(isVid ? "video" : "image");
                  setMediaInfo({
                    name: file.name,
                    size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                    resolution: isVid ? "1080x1920 (9:16 Vertical)" : "1080x1080 (1:1 Square)",
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
                    Drag &amp; drop any music video, freestyle, teaser, or photo
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Click to browse from your device
                  </div>
                </div>
              </div>
            </div>

            {mediaInfo && (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{mediaType === "video" ? "🎬" : "🖼️"}</span>
                  <div>
                    <div className="text-xs font-bold text-white truncate max-w-[220px] sm:max-w-sm">
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
                  Change File
                </button>
              </div>
            )}
          </div>

          {/* 3. AI Caption, Topic & Custom Smart Link Bar */}
          <div className="saas-card p-5 space-y-4 border-amber-500/20 bg-amber-500/[0.01]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <span>🤖</span>
                <span>AI Viral Caption &amp; SEO Generator</span>
              </span>
              <span className="text-[10px] text-amber-400 font-bold">Auto 6-Network Sync</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                  Song Title / Content Name:
                </label>
                <input
                  type="text"
                  value={customSongTitle}
                  onChange={(e) => setCustomSongTitle(e.target.value)}
                  placeholder="e.g. Unreleased Banger, Studio Freestyle, WAYULOMI"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                  Custom Smart Link / Stream URL:
                </label>
                <input
                  type="text"
                  value={customSmartLink}
                  onChange={(e) => setCustomSmartLink(e.target.value)}
                  placeholder="e.g. https://v3nja-official.web.app/new-release"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-cyan-400 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                  Content Style / Angle:
                </label>
                <select
                  value={aiStyle}
                  onChange={(e) => setAiStyle(e.target.value as any)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
                >
                  <option value="viral">🚀 Viral FYP / TikTok / Reels Hook</option>
                  <option value="release">🎵 Official Release &amp; Stream CTA</option>
                  <option value="story">📖 Storytelling &amp; Lyrics Behind Track</option>
                  <option value="punchy">⚡ Short, Punchy &amp; High Energy</option>
                  <option value="business">💼 Music Industry / LinkedIn / DSP</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                  Topic / Hook Context:
                </label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="e.g. Beat drop teaser, dance challenge, acoustic"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGeneratingAI}
              className="btn-gold w-full py-2.5 text-xs uppercase tracking-wider font-black flex items-center justify-center gap-2"
            >
              <span>✨</span>
              <span>{isGeneratingAI ? "Crafting 6 Custom Captions..." : "Generate Optimized Captions & Hashtags"}</span>
            </button>
          </div>

          {/* 4. Trending Hashtag Vault & SEO Keywords */}
          <div className="saas-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <span>🔥</span>
                <span>Trending Hashtag Vault (1-Click Insert)</span>
              </span>
              <span className="text-[10px] text-zinc-400">Click any tag to add to caption</span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {HASHTAG_VAULT.viral.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addHashtag(tag)}
                    className="px-2 py-0.5 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-[10px] font-bold transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
                {HASHTAG_VAULT.afrobeats.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addHashtag(tag)}
                    className="px-2 py-0.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-[10px] font-bold transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
                {HASHTAG_VAULT.release.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addHashtag(tag)}
                    className="px-2 py-0.5 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* SEO Keywords */}
            {seoTags.length > 0 && (
              <div className="pt-2 border-t border-white/[0.06] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  YouTube &amp; TikTok SEO Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {seoTags.map((kw, i) => (
                    <span key={i} className="text-[10px] bg-white/[0.04] text-zinc-300 px-2 py-0.5 rounded border border-white/[0.08]">
                      🔍 {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 5. Captions Per Channel Editor */}
          <div className="saas-card p-5 space-y-4">
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
              placeholder="Your viral post caption..."
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
            />
          </div>

          {/* 6. Publishing Schedule */}
          <div className="saas-card p-5 space-y-4">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>🕒</span>
              <span>Schedule Timing &amp; Evergreen Circulation</span>
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
                  Automatically re-circulate this release across all 6 channels every 14 days with fresh AI tags.
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
                className="btn-gold flex-1 py-3 text-xs uppercase tracking-wider font-black flex items-center justify-center gap-2"
              >
                <span>📅</span>
                <span>{isSubmitting ? "Queueing..." : "Schedule to 30-Day Queue"}</span>
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handlePublish(true)}
                className="btn-secondary px-5 py-3 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
              >
                <span>⚡</span>
                <span>Post Now (6 Networks)</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Mobile Device Feed Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Live Feed Device Preview
            </span>
            <span className="text-[11px] text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              {activeTab === "ALL" ? "Instagram & TikTok Feed" : activeTab}
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
                  <div className="text-[10px] text-zinc-500">Just now • 🎵 {customSongTitle}</div>
                </div>
              </div>
              <span className="text-zinc-500 text-sm">•••</span>
            </div>

            <div className="w-full aspect-[9/16] bg-zinc-900 rounded-2xl overflow-hidden relative border border-white/10 flex items-center justify-center">
              {mediaPreviewUrl ? (
                mediaType === "video" ? (
                  <video
                    src={mediaPreviewUrl}
                    controls
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={mediaPreviewUrl}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl shadow-lg mb-2">
                    ▶
                  </div>
                  <div className="text-xs font-black text-white">{mediaInfo.name}</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">{mediaInfo.resolution}</div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none"></div>

              <div className="absolute bottom-3 left-3 right-3 z-20 space-y-1 text-left pointer-events-none">
                <div className="text-xs font-bold text-white drop-shadow">@v3nja2.0</div>
                <div className="text-[11px] text-zinc-200 line-clamp-3 leading-tight drop-shadow">
                  {currentCaption}
                </div>
                <div className="text-[9px] text-amber-400 font-mono pt-1">
                  🔗 {customSmartLink}
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
