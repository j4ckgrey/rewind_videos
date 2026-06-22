/* eslint-disable @typescript-eslint/no-explicit-any --
   Walks deeply-nested, undocumented InnerTube JSON (and yt-dlp's loosely-typed
   output) with optional chaining + runtime guards; static types for every
   renderer variant would be inaccurate and more fragile. `any` is the correct
   tool at this untyped third-party boundary. */
/**
 * YouTube Music helpers shared by /api/music/* routes.
 *
 * - Search runs through InnerTube (`music.youtube.com/youtubei/v1/search`)
 *   for sub-second responses with full metadata. See ytmusic-innertube.ts.
 * - Stream resolution still uses yt-dlp because InnerTube doesn't expose
 *   the signed media URLs.
 */

import { YtDlp } from "ytdlp-nodejs";
import {
  searchAlbumsInnerTube as searchAlbumsInner,
  searchArtists as searchArtistsInner,
  searchSongs as searchSongsInner,
} from "./ytmusic-innertube";

export const ytdlp = new YtDlp();

export type MusicTrackHit = {
  id: string; // 11-char video ID
  title: string;
  artist: string;
  thumbnail: string;
  duration: number; // seconds
  url: string;
};

export type MusicAlbumHit = {
  id: string; // browse ID (MPREb_...)
  title: string;
  artist: string;
  year?: string;
  thumbnail: string;
  trackCount: number;
  url: string;
};

type Fmt = {
  url?: string;
  protocol?: string;
  vcodec?: string;
  acodec?: string;
  abr?: number;
  tbr?: number;
  asr?: number;
  audio_channels?: number;
  ext?: string;
  container?: string;
  format_note?: string;
  format_id?: string;
};

// Most → least browser-compatible audio codecs. Matches the rules already
// applied to videos so the music player doesn't ship a stream that decodes
// silently on Safari.
const AUDIO_CODEC_RANK: Array<(c: string) => boolean> = [
  (c) => c.startsWith("mp4a") || c === "aac",
  (c) => c === "opus",
  (c) => c === "vorbis",
  (c) => c === "mp3",
];

function codecRank(codec: string | undefined): number {
  if (!codec) return AUDIO_CODEC_RANK.length;
  const lc = codec.toLowerCase();
  for (let i = 0; i < AUDIO_CODEC_RANK.length; i++) {
    if (AUDIO_CODEC_RANK[i](lc)) return i;
  }
  return AUDIO_CODEC_RANK.length;
}

function pickBestAudio(formats: Fmt[]): Fmt | null {
  const audio = formats.filter(
    (f) =>
      !!f.url &&
      !f.protocol?.includes("m3u8") &&
      f.acodec &&
      f.acodec !== "none" &&
      (!f.vcodec || f.vcodec === "none"),
  );
  if (audio.length === 0) return null;
  return [...audio].sort((a, b) => {
    const abrDiff = (b.abr ?? b.tbr ?? 0) - (a.abr ?? a.tbr ?? 0);
    if (abrDiff !== 0) return abrDiff;
    return codecRank(a.acodec) - codecRank(b.acodec);
  })[0];
}

function normalizeCodec(codec: string | undefined): string | undefined {
  if (!codec) return undefined;
  if (codec.startsWith("mp4a")) return "aac";
  return codec;
}

function container(f: Fmt): string | undefined {
  const raw = f.container ?? f.ext;
  switch (raw) {
    case "m4a":
    case "mp4":
      return "mp4";
    case "opus":
    case "webm":
      return "webm";
    default:
      return raw ?? undefined;
  }
}

export function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
    /music\.youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = input.match(re);
    if (m) return m[1];
  }
  return null;
}

export type ResolvedStream = {
  url: string;
  title: string;
  // YT Music tracks expose artist/album/track separately — promote them so
  // the player can show "Artist · Track" instead of the raw video title.
  artist: string | null;
  album: string | null;
  track: string | null;
  duration: number | null;
  bitrate: number | null;
  codec: string | null;
  container: string | null;
  channels: number | null;
  sampleRate: number | null;
  thumbnail: string | null;
};

export async function resolveAudioStream(
  videoId: string,
): Promise<ResolvedStream | null> {
  // Try music.youtube.com first — for tracks that exist on YT Music it
  // surfaces canonical artist/album/track fields more reliably. But on some
  // server IPs the YT Music watch URL trips YouTube's "confirm you're not a
  // bot" check (the music page is policed harder than the plain video page),
  // which left music dead while trailers/videos kept working. So if the YT
  // Music URL yields no audio, fall back to the SAME www.youtube.com path the
  // (working) trailer/video resolver uses. Missing canonical fields are fine —
  // the caller already has artist/album from the InnerTube search result.
  let info = (await ytdlp
    .getInfoAsync(`https://music.youtube.com/watch?v=${videoId}`)
    .catch(() => null)) as any;
  let best = pickBestAudio((info?.formats ?? []) as Fmt[]);
  if (!best?.url) {
    // Don't swallow this one — if www.youtube.com also fails, let it throw so
    // the /api/music/stream route logs the real yt-dlp error (e.g. the bot
    // check) for diagnosis.
    info = (await ytdlp.getInfoAsync(
      `https://www.youtube.com/watch?v=${videoId}`,
    )) as any;
    best = pickBestAudio((info?.formats ?? []) as Fmt[]);
  }
  if (!best?.url) return null;

  return {
    url: best.url,
    title: info?.title ?? "",
    artist: info?.artist ?? info?.uploader ?? null,
    album: info?.album ?? null,
    track: info?.track ?? null,
    duration: typeof info?.duration === "number" ? info.duration : null,
    bitrate: best.abr
      ? Math.round(best.abr * 1000)
      : best.tbr
        ? Math.round(best.tbr * 1000)
        : null,
    codec: normalizeCodec(best.acodec) ?? null,
    container: container(best) ?? null,
    channels: typeof best.audio_channels === "number" ? best.audio_channels : null,
    sampleRate: typeof best.asr === "number" ? best.asr : null,
    thumbnail: bestThumbnail(info),
  };
}

function bestThumbnail(info: any): string | null {
  const thumbnails = Array.isArray(info?.thumbnails) ? info.thumbnails : [];
  if (thumbnails.length > 0) {
    const best = [...thumbnails]
      .filter((t: any) => typeof t?.url === "string" && t.url.length > 0)
      .sort(
        (a: any, b: any) =>
          (b.preference ?? 0) - (a.preference ?? 0) ||
          (b.width ?? 0) - (a.width ?? 0),
      )[0];
    if (best?.url) return best.url;
  }
  return typeof info?.thumbnail === "string" ? info.thumbnail : null;
}

/**
 * Search YouTube Music for tracks via InnerTube.
 *
 * The previous yt-dlp + `--flat-playlist` approach was both slow (~17s for
 * 20 hits) and metadata-poor (titles only, no artist/album/duration).
 * Calling InnerTube directly is sub-second and returns the same rich data
 * the YT Music web UI sees.
 */
export async function searchTracks(
  query: string,
  limit: number,
): Promise<MusicTrackHit[]> {
  const hits = await searchSongsInner(query, limit);
  return hits.map((h) => ({
    id: h.id,
    title: h.title,
    artist: h.artist,
    thumbnail: h.thumbnail || `https://i.ytimg.com/vi/${h.id}/hqdefault.jpg`,
    duration: h.duration,
    url: `https://music.youtube.com/watch?v=${h.id}`,
    album: h.album,
  })) as any;
}

/**
 * Search YouTube Music for albums via InnerTube.
 *
 * Returns album browse-IDs (MPREb_...) with title, artist, year, thumbnail.
 * The full track listing is fetched on demand via /api/music/album.
 */
export async function searchAlbums(
  query: string,
  limit: number,
): Promise<MusicAlbumHit[]> {
  const hits = await searchAlbumsInner(query, limit);
  return hits.map((h) => ({
    id: h.id,
    title: h.title,
    artist: h.artist,
    thumbnail: h.thumbnail,
    trackCount: 0, // not exposed in the search shelf; fetched per-album later
    url: `https://music.youtube.com/browse/${h.id}`,
    year: h.year,
  })) as any;
}

export type MusicArtistHit = {
  id: string; // UC... browse ID
  name: string;
  subscribers: string;
  thumbnail: string;
};

/** Search YouTube Music for artists via InnerTube. */
export async function searchArtists(
  query: string,
  limit: number,
): Promise<MusicArtistHit[]> {
  const hits = await searchArtistsInner(query, limit);
  return hits.map((h) => ({
    id: h.id,
    name: h.name,
    subscribers: h.subscribers,
    thumbnail: h.thumbnail,
  }));
}

export type AlbumDetails = {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  tracks: MusicTrackHit[];
};

export async function fetchAlbum(albumId: string): Promise<AlbumDetails | null> {
  const url = albumId.startsWith("http")
    ? albumId
    : `https://music.youtube.com/browse/${albumId}`;

  const playlist = (await ytdlp.getInfoAsync(url, {
    flatPlaylist: true,
  })) as any;

  if (!playlist) return null;

  const tracks: MusicTrackHit[] = ((playlist.entries ?? []) as any[])
    .filter((e: any) => typeof e?.id === "string" && e.id.length === 11)
    .map((e: any) => ({
      id: e.id,
      title: e.title ?? "",
      artist: e.uploader ?? e.channel ?? playlist.uploader ?? "",
      thumbnail:
        (Array.isArray(e.thumbnails) && e.thumbnails[0]?.url) ||
        e.thumbnail ||
        playlist.thumbnail ||
        "",
      duration: typeof e.duration === "number" ? e.duration : 0,
      url: e.webpage_url ?? `https://www.youtube.com/watch?v=${e.id}`,
    }));

  return {
    id: playlist.id ?? albumId,
    title: playlist.title ?? "",
    artist: playlist.uploader ?? playlist.channel ?? "",
    thumbnail:
      (Array.isArray(playlist.thumbnails) && playlist.thumbnails[0]?.url) ||
      playlist.thumbnail ||
      "",
    tracks,
  };
}
