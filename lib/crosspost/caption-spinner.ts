/**
 * AI Multi-Platform Caption & Hashtag Optimization Engine
 */

export interface PlatformCaptions {
  facebook: string;
  instagram: string;
  youtubeShorts: string;
  twitterX: string;
}

export function generatePlatformCaptions(
  baseCaption: string,
  smartLink: string = "https://v3nja-official.web.app/",
  trackName: string = "V3NJA Drop"
): PlatformCaptions {
  const cleanBase = baseCaption.trim();

  // Facebook Page Format
  const facebook = `${cleanBase}\n\n🎧 Stream & Watch ${trackName} now:\n${smartLink}\n\nDrop a comment with your favorite part and I'll send you VIP access in Messenger! ✨`;

  // Instagram Reels Format (@v3nja2.0)
  const instagram = `${cleanBase}\n.\n.\nComment "${trackName.toUpperCase()}" below to receive the official VIP stream link directly in your DM! 🚀\n.\n#V3NJAWRLD #V3NJA #NewMusic #AfroBeats #AfricanMusic #HipHop #ViralReels #SpotifyPlaylist`;

  // YouTube Shorts Format
  const youtubeShorts = `${cleanBase} | Official Short #Shorts #NewMusic #V3NJA\n\nFull visual & audio stream:\n${smartLink}`;

  // Twitter / X Format (Strict 280 char limit)
  let twitterX = `${cleanBase}\n\nStream ${trackName} on all platforms 👇\n${smartLink} #V3NJAWRLD`;
  if (twitterX.length > 275) {
    twitterX = `${cleanBase.slice(0, 180)}...\n\nStream now: ${smartLink}`;
  }

  return {
    facebook,
    instagram,
    youtubeShorts,
    twitterX,
  };
}
