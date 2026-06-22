/* eslint-disable @typescript-eslint/no-explicit-any --
   Parses yt-dlp's `getInfoAsync` output, which is loosely-typed, version-drifting
   JSON (formats, thumbnails, …). We read it defensively with guards; `any` is the
   correct tool at this untyped CLI boundary. */
/**
 * Shared yt-dlp YouTube resolver.
 *
 * Extracted from /api/videos/stream so the trailers service can pre-resolve the
 * same way the on-demand stream route does. Picks the best playable video (and,
 * when separated, audio) stream the client can actually decode, builds the
 * switchable quality ladder, and reports the signed-URL expiry parsed from the
 * googlevideo `expire` param (≈6h) so callers can schedule renewals.
 */

import { YtDlp } from "ytdlp-nodejs";

const ytdlp = new YtDlp();

// YouTube client selection — leave at yt-dlp's built-in default (currently
// `android_vr`). Both `web` and `tv` clients trigger "Sign in to confirm
// you're not a bot" from this server's IP, and yt-dlp aborts the chain on
// first failure rather than falling through to the next client.
const YT_EXTRACTOR_ARGS: { youtube?: string[] } | undefined = undefined;

export type QualityOption = {
  height: number;
  vcodec: string;
  videoUrl: string;
  audioUrl?: string;
  bitrate?: number;
  label: string; // e.g. "1080p", "1440p"
};

export type ResolvedStream = {
  url: string;
  audioUrl?: string;
  title: string;
  thumbnail: string;
  quality: string;
  qualities: QualityOption[];
  /** Signed-URL expiry (unix ms) parsed from the googlevideo `expire` param. */
  urlExpiry: number | null;
};

export function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = input.match(re);
    if (m) return m[1];
  }
  return null;
}

/** googlevideo URLs carry `&expire=<unix seconds>`. Returns ms, or null. */
export function parseStreamExpiry(url: string | undefined): number | null {
  if (!url) return null;
  const m = url.match(/[?&]expire=(\d{9,11})/);
  if (!m) return null;
  const secs = parseInt(m[1]!, 10);
  return Number.isFinite(secs) ? secs * 1000 : null;
}

type Fmt = {
  url?: string;
  protocol?: string;
  vcodec?: string;
  acodec?: string;
  height?: number;
  abr?: number;
  ext?: string;
};

// Decode/playback compatibility ranking. Browsers always know H.264 in MP4,
// usually know VP9 in WebM, and may or may not know AV1. Ordered most→least
// compatible so the picker prefers the format least likely to deliver a black
// screen on a random browser.
const VIDEO_CODEC_RANK: Array<(c: string) => boolean> = [
  (c) => /^(avc1|h264|h\.264)/.test(c), // H.264 (universal)
  (c) => /^vp0?9/.test(c),               // VP9 (broad)
  (c) => /^vp0?8/.test(c),               // VP8 (broad)
  (c) => /^(av01|av1)/.test(c),          // AV1 (modern only)
];
const AUDIO_CODEC_RANK: Array<(c: string) => boolean> = [
  (c) => c.startsWith("mp4a") || c === "aac",
  (c) => c === "opus",
  (c) => c === "vorbis",
];

function codecRank(codec: string | undefined, ranks: Array<(c: string) => boolean>): number {
  if (!codec) return ranks.length;
  const lc = codec.toLowerCase();
  for (let i = 0; i < ranks.length; i++) {
    if (ranks[i](lc)) return i;
  }
  return ranks.length;
}

function sortFormats(formats: Fmt[], kind: "video" | "audio"): Fmt[] {
  return [...formats].sort((a, b) => {
    if (kind === "video") {
      const heightDiff = (b.height ?? 0) - (a.height ?? 0);
      if (heightDiff !== 0) return heightDiff;
      return codecRank(a.vcodec, VIDEO_CODEC_RANK) - codecRank(b.vcodec, VIDEO_CODEC_RANK);
    }
    const abrDiff = (b.abr ?? 0) - (a.abr ?? 0);
    if (abrDiff !== 0) return abrDiff;
    return codecRank(a.acodec, AUDIO_CODEC_RANK) - codecRank(b.acodec, AUDIO_CODEC_RANK);
  });
}

const MAX_PREFERRED_HEIGHT = 1080;

function matchesCodec(vcodec: string | undefined, ranks: Array<(c: string) => boolean>, tier: number): boolean {
  if (!vcodec) return false;
  return ranks[tier](vcodec.toLowerCase());
}

function pickBestUrl(
  formatsIn: Fmt[],
  allowSeparateAudio: boolean,
): { url: string; audioUrl?: string; quality: string } | null {
  if (!Array.isArray(formatsIn) || formatsIn.length === 0) return null;

  // Strip HLS — <video src> can't play it without hls.js, which the trailer /
  // videos players don't load. Selecting an m3u8 here causes "black screen".
  const formats = formatsIn.filter((f) => !!f.url && !f.protocol?.includes("m3u8"));

  const combined = sortFormats(
    formats.filter((f) => f.vcodec && f.vcodec !== "none" && f.acodec && f.acodec !== "none"),
    "video",
  );
  const videoOnly = sortFormats(
    formats.filter((f) => f.vcodec && f.vcodec !== "none" && (!f.acodec || f.acodec === "none")),
    "video",
  );
  const audioOnly = sortFormats(
    formats.filter((f) => f.acodec && f.acodec !== "none" && (!f.vcodec || f.vcodec === "none")),
    "audio",
  );

  if (allowSeparateAudio && videoOnly.length > 0) {
    for (let tier = 0; tier < VIDEO_CODEC_RANK.length; tier++) {
      const candidate = videoOnly.find(
        (f) => matchesCodec(f.vcodec, VIDEO_CODEC_RANK, tier) && (f.height ?? 0) <= MAX_PREFERRED_HEIGHT,
      );
      if (candidate) {
        return {
          url: candidate.url!,
          audioUrl: audioOnly[0]?.url,
          quality: `${candidate.height ?? "?"}p`,
        };
      }
    }
    const bestVideo = videoOnly[0]!;
    const combinedHeight = combined[0]?.height ?? 0;
    if ((bestVideo.height ?? 0) > combinedHeight) {
      return {
        url: bestVideo.url!,
        audioUrl: audioOnly[0]?.url,
        quality: `${bestVideo.height ?? "?"}p`,
      };
    }
  }

  if (combined.length > 0) {
    return { url: combined[0]!.url!, quality: `${combined[0]!.height ?? "?"}p` };
  }
  if (videoOnly.length > 0) {
    return {
      url: videoOnly[0]!.url!,
      audioUrl: audioOnly[0]?.url,
      quality: `${videoOnly[0]!.height ?? "?"}p`,
    };
  }
  const any = formats.find((f) => f.url);
  return any ? { url: any.url!, quality: "?" } : null;
}

function buildQualityLadder(formatsIn: Fmt[]): QualityOption[] {
  const formats = formatsIn.filter((f) => !!f.url && !f.protocol?.includes("m3u8"));
  const videoOnly = sortFormats(
    formats.filter((f) => f.vcodec && f.vcodec !== "none" && (!f.acodec || f.acodec === "none")),
    "video",
  );
  const audioOnly = sortFormats(
    formats.filter((f) => f.acodec && f.acodec !== "none" && (!f.vcodec || f.vcodec === "none")),
    "audio",
  );
  const audioUrl = audioOnly[0]?.url;

  const seen = new Set<number>();
  const result: QualityOption[] = [];
  for (const f of videoOnly) {
    const h = f.height ?? 0;
    if (!h || seen.has(h)) continue;
    seen.add(h);
    result.push({
      height: h,
      vcodec: (f.vcodec ?? "?").split(".")[0],
      videoUrl: f.url!,
      audioUrl,
      label: `${h}p`,
    });
  }
  return result;
}

/** Resolve a YouTube id to the best playable stream(s) + quality ladder.
 *  Returns null when nothing playable is found. Throws on yt-dlp failure. */
export async function resolveYouTubeStream(
  videoId: string,
  opts: { allowSeparateAudio?: boolean } = {},
): Promise<ResolvedStream | null> {
  const allowSeparateAudio = opts.allowSeparateAudio !== false;

  const info = YT_EXTRACTOR_ARGS
    ? await ytdlp.getInfoAsync(
        `https://www.youtube.com/watch?v=${videoId}`,
        { extractorArgs: YT_EXTRACTOR_ARGS } as Parameters<typeof ytdlp.getInfoAsync>[1] as any,
      )
    : await ytdlp.getInfoAsync(`https://www.youtube.com/watch?v=${videoId}`);

  const formats = ((info as any).formats ?? []) as Fmt[];
  const best = pickBestUrl(formats, allowSeparateAudio);
  if (!best) return null;

  const qualities = allowSeparateAudio ? buildQualityLadder(formats) : [];
  const title = (info as any).title ?? "";
  const rawThumbs: Array<{ url: string; preference?: number }> = (info as any).thumbnails ?? [];
  const thumbnail: string =
    rawThumbs.length > 0
      ? rawThumbs.sort((a, b) => (b.preference ?? 0) - (a.preference ?? 0))[0]!.url
      : ((info as any).thumbnail ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);

  return {
    url: best.url,
    audioUrl: best.audioUrl,
    title,
    thumbnail,
    quality: best.quality,
    qualities,
    urlExpiry: parseStreamExpiry(best.url),
  };
}
