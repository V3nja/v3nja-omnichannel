"use client";

import { useState } from "react";

export default function FacebookAutomationsPage() {
  const [activeTab, setActiveTab] = useState<string>("WAYULOMI");
  const [simComment, setSimComment] = useState("WAYULOMI is fire! Send link 🔥");
  const [simUser, setSimUser] = useState("Malawi Music Fan");
  const [isPageFollower, setIsPageFollower] = useState(false);
  const [simOutput, setSimOutput] = useState<any>(null);

  const campaigns = [
    {
      id: "fb_auto_1",
      name: "WAYULOMI (Facebook Drop)",
      keywords: ["WAYULOMI", "WAYU", "LOMI", "SONG"],
      link: "https://v3nja-official.web.app/wayulomi",
      buttonLabel: "Stream WAYULOMI 🎵",
      publicReplies: [
        "Thank you so much for the love! Sent the VIP link to your Messenger ❤️",
        "Appreciate the support! Check your Messenger for the official stream link ✨",
        "Much love! The private link is waiting in your inbox 🎶",
      ],
      messengerMessage:
        "✨ V3NJA WRLD · WAYULOMI 🎵\n\nThank you for supporting my music! Stream and watch WAYULOMI on Spotify, Apple Music & YouTube. Much love! ✨",
      followPrompt: "✨ V3NJA WRLD · WAYULOMI\n\nThank you for the love! Follow V3NJA and tap below to get your official VIP link ❤️",
    },
    {
      id: "fb_auto_2",
      name: "NJALA (Visuals & Single)",
      keywords: ["NJALA", "STREAM NJALA", "WATCH NJALA", "DROP"],
      link: "https://v3nja-official.web.app/njala",
      buttonLabel: "Stream NJALA 🎬",
      publicReplies: [
        "Thank you for the support! The official link for NJALA is now in your Messenger ❤️",
        "Appreciate you! Check your Messenger for the music and visuals ✨",
      ],
      messengerMessage:
        "✨ V3NJA WRLD · NJALA 🎬\n\nThank you for the incredible love! Watch the official visuals and stream NJALA everywhere. Peace & light! ✨",
      followPrompt: "✨ V3NJA WRLD · NJALA\n\nThank you for the love! Follow V3NJA and tap below to unlock the official NJALA link ✨",
    },
    {
      id: "fb_auto_3",
      name: "ZANGA (Club Anthem)",
      keywords: ["ZANGA", "STREAM ZANGA", "CLUB", "BANGER"],
      link: "https://v3nja-official.web.app/zanga",
      buttonLabel: "Listen to ZANGA 🔥",
      publicReplies: [
        "Thank you for the love! Sent you the official link to ZANGA in your Messenger ❤️",
        "Much love! The official stream link for ZANGA is now in your inbox 🎶",
      ],
      messengerMessage:
        "✨ V3NJA WRLD · ZANGA ⚡\n\nThank you for the support on ZANGA! Stream on all major platforms and turn up the volume! Gratitude ✨",
      followPrompt: "✨ V3NJA WRLD · ZANGA\n\nThank you for the energy! Follow V3NJA and tap below to receive the official ZANGA stream link ✨",
    },
    {
      id: "fb_auto_4",
      name: "MIRAKO (Afro Fusion)",
      keywords: ["MIRAKO", "MIRACLE", "VIBE", "WAVE"],
      link: "https://v3nja-official.web.app/mirako",
      buttonLabel: "Stream MIRAKO 🌊",
      publicReplies: [
        "Thank you for the love! Sent the official MIRAKO link to your Messenger ❤️",
        "Appreciate the support! Check your inbox for the stream link ✨",
      ],
      messengerMessage:
        "✨ V3NJA WRLD · MIRAKO 🌊\n\nThank you deeply for connecting with MIRAKO! Stream on Spotify, Apple Music & more. Much appreciation ✨",
      followPrompt: "✨ V3NJA WRLD · MIRAKO\n\nThank you for the love! Follow V3NJA and tap below to unlock the MIRAKO link ✨",
    },
    {
      id: "fb_auto_5",
      name: "V3NJA WRLD Official Merch",
      keywords: ["MERCH", "VIP", "HOODIE", "SHOP", "TEE"],
      link: "https://v3nja-official.web.app/merch",
      buttonLabel: "Visit Merch Store 🛍️",
      publicReplies: [
        "Thank you for wanting to represent the brand! Sent the VIP shop link to your Messenger ❤️",
      ],
      messengerMessage:
        "✨ V3NJA WRLD · Official Merch 🛍️\n\nThank you for representing V3NJA WRLD! Shop the official apparel collection. Wear it with pride! ✨",
      followPrompt: "✨ V3NJA WRLD · Official Merch\n\nThank you for supporting the movement! Follow V3NJA and tap below to open the official store ✨",
    },
    {
      id: "fb_auto_6",
      name: "All Music Discography Portal",
      keywords: ["MUSIC", "LINK", "TRACK", "DISCOGRAPHY", "ALL SONGS"],
      link: "https://v3nja-official.web.app/",
      buttonLabel: "Explore All Music 🌐",
      publicReplies: [
        "Thank you for listening! I just sent the complete music portal link to your Messenger ❤️",
      ],
      messengerMessage:
        "✨ V3NJA WRLD · Music Portal 🌐\n\nThank you for your love and interest! Access the complete music catalog, singles, and visuals. Endless blessings ✨",
      followPrompt: "✨ V3NJA WRLD · Music Portal\n\nThank you for the support! Follow V3NJA and tap below to explore all music releases ✨",
    },
  ];

  const currentCamp = campaigns.find((c) => c.name.includes(activeTab)) || campaigns[0];

  const runSimulation = () => {
    const isMatch = currentCamp.keywords.some((kw) =>
      simComment.toUpperCase().includes(kw.toUpperCase())
    );

    if (!isMatch) {
      setSimOutput({ matched: false });
      return;
    }

    const publicReply =
      currentCamp.publicReplies[
        Math.floor(Math.random() * currentCamp.publicReplies.length)
      ];

    setSimOutput({
      matched: true,
      publicReply: `@${simUser} ${publicReply}`,
      isFollowGated: !isPageFollower,
      promptText: currentCamp.followPrompt,
      revealMessage: currentCamp.messengerMessage,
      buttonLabel: currentCamp.buttonLabel,
      link: currentCamp.link,
    });
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <span>🔵</span>
            <span>Facebook Page Comment-to-Messenger DM Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Turn Facebook post &amp; video comments into private Messenger DMs with anti-spam replies, Page Follow Gates &amp; Smart Links.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400">
            Page: V3NJA Official
          </span>
        </div>
      </div>

      {/* Campaign Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {campaigns.map((c) => {
          const isSelected = activeTab === c.name.split(" ")[0];
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveTab(c.name.split(" ")[0]);
                setSimComment(`${c.keywords[0]} is fire! 🔥`);
                setSimOutput(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                isSelected
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-black border-cyan-400 shadow-cyan-glow"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white"
              }`}
            >
              🎵 {c.name}
            </button>
          );
        })}
      </div>

      {/* Grid: Campaign Settings Left & Live Simulator Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Campaign Config Cards */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card folder-tab-cyan rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h2 className="text-sm font-black text-white">{currentCamp.name}</h2>
              <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            {/* Keyword Triggers */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-400">Comment Trigger Keywords:</label>
              <div className="flex flex-wrap gap-1.5">
                {currentCamp.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-amber-400 font-mono"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Smart Link */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-400">Official Smart Link Delivered:</label>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-400">
                {currentCamp.link}
              </div>
            </div>

            {/* Anti-Spam Public Reply Pool */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-400">
                Anti-Spam Public Comment Reply Pool ({currentCamp.publicReplies.length} Variations):
              </label>
              <div className="space-y-1.5">
                {currentCamp.publicReplies.map((reply, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-300"
                  >
                    &ldquo;{reply}&rdquo;
                  </div>
                ))}
              </div>
            </div>

            {/* Page Follow Gate Setting */}
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🔒</span>
                  <span>Facebook Page Follow &amp; Like Gate</span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  Prompts users to follow the Page before unlocking the VIP stream link.
                </div>
              </div>
              <span className="text-xs font-extrabold text-blue-400">ENABLED</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Facebook Simulator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-2xl p-5 space-y-4 shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-300 pb-2 border-b border-white/[0.08]">
              Facebook Comment &amp; Messenger Simulator
            </h3>

            {/* Inbound Simulator Controls */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Commenter Name:</label>
                <input
                  type="text"
                  value={simUser}
                  onChange={(e) => setSimUser(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#121218] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Inbound Facebook Comment:</label>
                <input
                  type="text"
                  value={simComment}
                  onChange={(e) => setSimComment(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#121218] border border-white/10 text-white"
                />
              </div>

              {/* Follow Status Toggle */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-xs font-bold text-zinc-300">Likes &amp; Follows Page?</span>
                <button
                  type="button"
                  onClick={() => setIsPageFollower(!isPageFollower)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    isPageFollower
                      ? "bg-emerald-500 text-black shadow-md"
                      : "bg-white/[0.06] text-zinc-400"
                  }`}
                >
                  {isPageFollower ? "✓ Follows Page" : "✗ Not Following Yet"}
                </button>
              </div>

              <button
                type="button"
                onClick={runSimulation}
                className="v3nja-gold-button w-full py-3 text-xs uppercase cursor-pointer"
              >
                ⚡ Test Automation Response
              </button>
            </div>

            {/* Output Display */}
            {simOutput && (
              <div className="space-y-3 pt-3 border-t border-white/[0.08]">
                {simOutput.matched ? (
                  <>
                    {/* Public Reply Card */}
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs space-y-1">
                      <div className="text-[10px] font-bold text-blue-400">🔵 Public Comment Reply (Posted):</div>
                      <div className="text-zinc-200">{simOutput.publicReply}</div>
                    </div>

                    {/* Messenger DM Card */}
                    <div className="p-3.5 rounded-xl bg-[#0c0c12] border border-white/15 space-y-2.5">
                      <div className="flex items-center justify-between text-[10px] text-zinc-400">
                        <span className="font-bold text-white flex items-center gap-1">
                          <span>⚡</span>
                          <span>Messenger Direct Message</span>
                        </span>
                        <span className="text-emerald-400 font-bold">● Sent</span>
                      </div>

                      {simOutput.isFollowGated ? (
                        <div className="space-y-2">
                          <div className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
                            {simOutput.promptText}
                          </div>
                          <div className="space-y-1.5">
                            <button
                              type="button"
                              className="w-full py-2 text-xs font-bold rounded-xl border border-blue-500/40 bg-blue-500/15 text-blue-300"
                            >
                              Follow V3NJA ↗
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setIsPageFollower(true);
                                setSimOutput({ ...simOutput, isFollowGated: false });
                              }}
                              className="v3nja-gold-button w-full py-2 text-xs uppercase"
                            >
                              I Follow V3NJA ✅
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
                            {simOutput.revealMessage}
                          </div>
                          <a
                            href={simOutput.link}
                            target="_blank"
                            rel="noreferrer"
                            className="v3nja-gold-button block text-center w-full py-2 text-xs uppercase"
                          >
                            {simOutput.buttonLabel}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="p-3 text-xs text-zinc-500 text-center">
                    No matching keyword in comment.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
