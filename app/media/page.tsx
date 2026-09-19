"use client";

import { useState } from "react";
import Link from "next/link";

interface MediaAsset {
  id: string;
  name: string;
  type: "VIDEO" | "IMAGE";
  duration?: string;
  size: string;
  smartLink: string;
  songTitle: string;
  dateAdded: string;
}

export default function MediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([
    {
      id: "med_1",
      name: "wayulomi-official-reel-clip.mp4",
      type: "VIDEO",
      duration: "0:28",
      size: "18.4 MB",
      songTitle: "WAYULOMI",
      smartLink: "https://v3nja-official.web.app/wayulomi",
      dateAdded: "Yesterday",
    },
    {
      id: "med_2",
      name: "njala-club-anthem-visual.mp4",
      type: "VIDEO",
      duration: "0:30",
      size: "14.2 MB",
      songTitle: "NJALA",
      smartLink: "https://v3nja-official.web.app/njala",
      dateAdded: "3 days ago",
    },
    {
      id: "med_3",
      name: "zanga-studio-banger-teaser.mp4",
      type: "VIDEO",
      duration: "0:24",
      size: "16.1 MB",
      songTitle: "ZANGA",
      smartLink: "https://v3nja-official.web.app/zanga",
      dateAdded: "5 days ago",
    },
    {
      id: "med_4",
      name: "mirako-afro-visualizer-hd.mp4",
      type: "VIDEO",
      duration: "0:32",
      size: "21.0 MB",
      songTitle: "MIRAKO",
      smartLink: "https://v3nja-official.web.app/mirako",
      dateAdded: "1 week ago",
    },
    {
      id: "med_5",
      name: "v3nja-wrld-merch-promo-card.png",
      type: "IMAGE",
      size: "3.2 MB",
      songTitle: "MERCH",
      smartLink: "https://v3nja-official.web.app/merch",
      dateAdded: "2 weeks ago",
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🎬</span>
            <span>Media Library &amp; Video Asset Vault</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Store your official music video cuts, reel teasers, and artworks ready for 1-click cross-posting.
          </p>
        </div>

        <Link
          href="/composer"
          className="v3nja-btn-primary px-4 py-2 text-xs uppercase tracking-wider font-extrabold flex items-center gap-2"
        >
          <span>+ Upload to Composer</span>
        </Link>
      </div>

      {/* Grid of Media Assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="nuelink-card p-4 space-y-3 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            {/* Asset Thumbnail Preview */}
            <div className="w-full aspect-video bg-black/60 rounded-xl relative border border-white/10 flex flex-col items-center justify-center overflow-hidden group">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xl shadow">
                {asset.type === "VIDEO" ? "▶" : "🖼️"}
              </div>
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-zinc-300">
                {asset.type === "VIDEO" ? `🎥 ${asset.duration}` : "IMAGE"}
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-amber-500 text-black text-[10px] font-extrabold">
                {asset.songTitle}
              </div>
            </div>

            {/* Asset Details */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-white truncate">{asset.name}</div>
              <div className="text-[10px] text-zinc-400 flex items-center justify-between">
                <span>{asset.size}</span>
                <span>Added {asset.dateAdded}</span>
              </div>
              <a
                href={asset.smartLink}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-cyan-400 font-mono hover:underline block pt-1 truncate"
              >
                {asset.smartLink} ↗
              </a>
            </div>

            {/* Quick Action */}
            <Link
              href="/composer"
              className="v3nja-btn-secondary w-full py-2 text-center text-xs text-amber-400 font-bold block"
            >
              ⚡ Use in Cross-Post
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
