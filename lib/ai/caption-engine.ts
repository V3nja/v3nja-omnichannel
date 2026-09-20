export interface HashtagCategory {
  name: string;
  tags: string[];
}

export const HASHTAG_VAULT: Record<string, string[]> = {
  viral: [
    "#fyp", "#viral", "#trending", "#reels", "#foryou", "#explorepage", "#viralvideo", "#musicvideo", "#audioviral"
  ],
  afrobeats: [
    "#afrobeats", "#amapiano", "#afropop", "#malawimusic", "#africanmusic", "#naijamusic", "#afrodance", "#afrosounds", "#afrofusion"
  ],
  release: [
    "#newmusicalert", "#nowstreaming", "#outnow", "#newsingle", "#spotifymusic", "#applemusic", "#audiomack", "#musicrelease", "#hitmusic"
  ],
  studio: [
    "#studioflow", "#behindthescenes", "#producerlife", "#indieartist", "#makingof", "#freestyle", "#vocalist", "#musicianlife"
  ],
  club: [
    "#clubbanger", "#partyanthem", "#djmix", "#dancemusic", "#bassboosted", "#nightlife", "#soundtrack", "#festivalvibes"
  ]
};

export interface AICaptionRequest {
  topic: string;
  songTitle?: string;
  smartLink?: string;
  style: "viral" | "release" | "story" | "punchy" | "business";
  genre?: string;
  includeHashtags?: boolean;
}

export interface GeneratedCaptions {
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  twitter: string;
  linkedin: string;
  seoKeywords: string[];
  recommendedHashtags: string[];
}

export function generateAICaptions(req: AICaptionRequest): GeneratedCaptions {
  const song = req.songTitle?.trim() || "NEW TRACK";
  const link = req.smartLink?.trim() || `https://v3nja-official.web.app/${song.toLowerCase().replace(/\s+/g, "")}`;
  const topic = req.topic?.trim() || "New music drop & visuals";

  const hashtags = [
    "#V3NJA",
    `#${song.replace(/\s+/g, "")}`,
    "#Afrobeats",
    "#NewMusic",
    "#fyp",
    "#ViralReels",
    "#TrendingAudio",
  ];

  const seoKeywords = [
    `${song} official music video`,
    `${song} v3nja audio stream`,
    `afrobeats new music 2026`,
    `v3nja discography`,
    `trending tiktok music sound`,
    `african pop club banger`,
  ];

  let facebook = "";
  let instagram = "";
  let youtube = "";
  let tiktok = "";
  let twitter = "";
  let linkedin = "";

  switch (req.style) {
    case "viral":
      facebook = `🔥 This sound is taking over! "${song}" is finally live.\n\nDrop "${song.toUpperCase()}" in the comments below and I'll send the VIP high-speed stream link straight to your inbox! 🎧\n\nStream & Watch: ${link}\n\n${hashtags.join(" ")}`;
      instagram = `Wait for the beat drop on this one 🤯 "${song}" out now everywhere!\n\nComment "${song.toUpperCase()}" for the instant VIP stream link in your DMs 🚀\n\nSound tag: V3NJA • ${song}\n\n${hashtags.slice(0, 8).join(" ")}`;
      youtube = `${song} (Official Music Video Short) | V3NJA #Shorts #Trending #NewMusic`;
      tiktok = `Use this sound & let me see your videos 🔥 "${song}" out on all streaming platforms! 🚀 #fyp #afrobeats #trending #v3nja #${song.toLowerCase().replace(/\s+/g, "")}`;
      twitter = `Run up the streams on "${song}"! Out worldwide on all major platforms 🔥🎵\n\nStream here: ${link} #V3NJA #${song.replace(/\s+/g, "")}`;
      linkedin = `Excited to release our new music visualizer and production project "${song}". Stream the official track and explore our distribution catalog: ${link} #MusicIndustry #AfroFusion #NewRelease`;
      break;

    case "release":
      facebook = `🚨 OFFICIAL RELEASE: "${song}" is officially out now worldwide on all major streaming platforms!\n\nComment "${song.toUpperCase()}" to get the instant stream link in your Messenger inbox 🎵\n\n🎧 Stream & Watch: ${link}\n\n${hashtags.join(" ")}`;
      instagram = `OFFICIAL RELEASE 🎬 "${song}" is out now on Spotify, Apple Music, YouTube & AudioMack!\n\nTap the link in bio or comment "${song.toUpperCase()}" for direct access 🚀\n\n${hashtags.join(" ")}`;
      youtube = `${song} - V3NJA (Official Single & Visualizer) #Shorts #V3NJA #NewMusic`;
      tiktok = `"${song}" is OUT NOW! Add it to your favorites & use the audio 🔥 #newmusicalert #fyp #afrobeats #v3nja`;
      twitter = `"${song}" is OUT NOW on all DSPs worldwide! Stream the official release: ${link} 🚀🔥 #V3NJA #${song.replace(/\s+/g, "")}`;
      linkedin = `Proud to announce the global release of "${song}" across all digital streaming platforms. Full visualizer & stream portal available here: ${link} #MusicBusiness #ReleaseAnnouncement`;
      break;

    case "story":
      facebook = `Made this record straight from the heart. "${song}" tells a real story that everyone can relate to.\n\nListen to the full track now: ${link}\n\nDrop your favorite lyric in the comments! 👇\n\n${hashtags.join(" ")}`;
      instagram = `Every lyric in "${song}" comes from a real experience. Thank you for all the love and support on this journey 🙏✨\n\nFull visual & stream link in bio or comment "${song.toUpperCase()}" for direct access.\n\n${hashtags.join(" ")}`;
      youtube = `Behind the music of ${song} | V3NJA #Shorts #StoryTime #Music`;
      tiktok = `The story behind this track is crazy... "${song}" out now on all platforms! 🎧 #storytime #musician #fyp #v3nja`;
      twitter = `Put my soul into this one. "${song}" out now everywhere: ${link} 🙏✨ #V3NJA #${song.replace(/\s+/g, "")}`;
      linkedin = `Artistic storytelling and cross-cultural music creation in our latest release "${song}". Explore the production: ${link} #MusicProduction #CreativeDirection`;
      break;

    case "punchy":
    default:
      facebook = `"${song}" out now! Stream it on all platforms: ${link} 🔥🎧 Comment "${song.toUpperCase()}" for the VIP link!`;
      instagram = `"${song}" is live! Link in bio or comment "${song.toUpperCase()}" 🚀🔥\n\n${hashtags.slice(0, 6).join(" ")}`;
      youtube = `${song} (Official Clip) - V3NJA #Shorts #V3NJA`;
      tiktok = `"${song}" is out now 🔥 Use this sound! #fyp #v3nja #afrobeats`;
      twitter = `"${song}" out now! Stream: ${link} 🔥 #V3NJA`;
      linkedin = `Latest release "${song}" available on global DSPs: ${link} #MusicRelease #V3NJA`;
      break;
  }

  return {
    facebook,
    instagram,
    youtube,
    tiktok,
    twitter,
    linkedin,
    seoKeywords,
    recommendedHashtags: hashtags,
  };
}
