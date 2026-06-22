/* eslint-disable @typescript-eslint/no-explicit-any --
   InnerTube search responses are deeply-nested, undocumented, shape-shifting
   JSON. We navigate them defensively with optional chaining + runtime guards;
   modelling every renderer variant as a static type would be inaccurate and far
   more fragile. `any` is the correct tool at this untyped third-party boundary. */
/**
 * YouTube Music InnerTube search client.
 *
 * Talks to `music.youtube.com/youtubei/v1/search` directly — the same
 * endpoint the YT Music web UI uses. Sub-second responses with full
 * structured metadata (title, artist, album, duration, thumbnail), versus
 * 10-20 seconds for yt-dlp + per-entry resolution.
 *
 * The public API key, the `WEB_REMIX` client name, and the protobuf-encoded
 * `params` filters are stable and documented across the YT Music
 * reverse-engineering community (ytmusicapi, sigma67/ytmusicapi, etc.).
 */

const INNERTUBE_KEY = "a";
const INNERTUBE_URL = `https://music.youtube.com/youtubei/v1/search?key=${INNERTUBE_KEY}&prettyPrint=false`;

const CLIENT_CONTEXT = {
  client: {
    clientName: "WEB_REMIX",
    clientVersion: "1.20240101.01.00",
    hl: "en",
    gl: "US",
  },
};

// Filter params that scope the search to one of YT Music's result tabs.
const FILTERS = {
  songs: "EgWKAQIIAWoKEAoQAxAEEAkQBQ%3D%3D",
  albums: "EgWKAQIYAWoKEAoQAxAEEAkQBQ%3D%3D",
  artists: "EgWKAQIgAWoKEAoQAxAEEAkQBQ%3D%3D",
} as const;

export type SongHit = {
  id: string; // YouTube video ID (11 chars)
  title: string;
  artist: string;
  album: string;
  duration: number; // seconds
  thumbnail: string;
};

export type AlbumHit = {
  id: string; // browse ID (MPREb_...)
  title: string;
  artist: string;
  year: string;
  thumbnail: string;
};

export type ArtistHit = {
  id: string; // browse ID (UC...)
  name: string;
  subscribers: string; // "86.5M monthly audience" / "123 subscribers" — display as-is
  thumbnail: string;
};

async function callInnerTube(query: string, filter: keyof typeof FILTERS): Promise<any> {
  const res = await fetch(INNERTUBE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      context: CLIENT_CONTEXT,
      query,
      params: FILTERS[filter],
    }),
  });
  if (!res.ok) {
    throw new Error(`YT Music InnerTube ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

function pickShelfItems(payload: any): any[] {
  const sections =
    payload?.contents?.tabbedSearchResultsRenderer?.tabs?.[0]?.tabRenderer?.content
      ?.sectionListRenderer?.contents ?? [];
  const shelf = sections.find((s: any) => s.musicShelfRenderer)?.musicShelfRenderer;
  return shelf?.contents ?? [];
}

function colRuns(item: any, col: number): { text: string; navigationEndpoint?: any }[] {
  return (
    item?.flexColumns?.[col]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs ?? []
  );
}

function colText(item: any, col: number): string {
  return colRuns(item, col)
    .map((r) => r.text || "")
    .join("");
}

// Search shelves return small thumbnails (artists at =w120-h120). The size is
// encoded in the URL's trailing `=…` token; bump w/h/s up to a card-friendly
// minimum so cards aren't upscaling a 120px image. URLs without a size token
// or already-larger ones pass through unchanged.
function upscaleThumb(url: string, size = 540): string {
  if (!url) return url;
  const bump = (n: string) => String(Math.max(parseInt(n, 10) || 0, size));
  return url.replace(/=([a-z0-9-]+)$/i, (_m, params: string) =>
    "=" +
    params
      .replace(/(^|-)w(\d+)/i, (_x, p, n) => `${p}w${bump(n)}`)
      .replace(/(^|-)h(\d+)/i, (_x, p, n) => `${p}h${bump(n)}`)
      .replace(/(^|-)s(\d+)/i, (_x, p, n) => `${p}s${bump(n)}`),
  );
}

function bestThumbnail(item: any): string {
  const list =
    item?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails ?? [];
  // Highest resolution is last in the array.
  return upscaleThumb(list[list.length - 1]?.url ?? list[0]?.url ?? "");
}

function durationStringToSeconds(input: string): number {
  // YT Music renders durations as "m:ss" or "h:mm:ss".
  const parts = input.split(":").map((p) => parseInt(p, 10));
  if (parts.some((n) => Number.isNaN(n))) return 0;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

// ─── Songs ─────────────────────────────────────────────────────────────────

export async function searchSongs(
  query: string,
  limit: number,
): Promise<SongHit[]> {
  const data = await callInnerTube(query, "songs");
  const items = pickShelfItems(data);
  const hits: SongHit[] = [];
  for (const it of items) {
    const r = it.musicResponsiveListItemRenderer;
    if (!r) continue;
    // Songs put the video ID on the title's run navigationEndpoint.
    const titleRun = colRuns(r, 0)[0];
    const videoId = titleRun?.navigationEndpoint?.watchEndpoint?.videoId;
    if (!videoId || videoId.length !== 11) continue;

    const meta = colRuns(r, 1).map((x) => x.text || "");
    // Column 1 is laid out as `Artist | • | Album | • | m:ss` — pull the
    // first non-separator runs by index so we don't fall over on songs
    // missing an album entry.
    const parts = meta.filter((s) => s && s !== " • ");
    const artist = parts[0] ?? "";
    // Last run is the duration when it parses; album is whatever sits
    // between artist and duration.
    let album = "";
    let duration = 0;
    const last = parts[parts.length - 1];
    if (last && /^\d+:\d{2}(?::\d{2})?$/.test(last)) {
      duration = durationStringToSeconds(last);
      album = parts.slice(1, -1).join(" ");
    } else {
      album = parts.slice(1).join(" ");
    }

    hits.push({
      id: videoId,
      title: colText(r, 0),
      artist,
      album,
      duration,
      thumbnail: bestThumbnail(r) || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    });
    if (hits.length >= limit) break;
  }
  return hits;
}

// ─── Albums ────────────────────────────────────────────────────────────────

export async function searchAlbumsInnerTube(
  query: string,
  limit: number,
): Promise<AlbumHit[]> {
  const data = await callInnerTube(query, "albums");
  const items = pickShelfItems(data);
  const hits: AlbumHit[] = [];
  for (const it of items) {
    const r = it.musicResponsiveListItemRenderer;
    if (!r) continue;
    // For albums the browseId lives on the item-level navigationEndpoint.
    const browseId: string | undefined =
      r?.navigationEndpoint?.browseEndpoint?.browseId;
    if (!browseId || !browseId.startsWith("MPREb_")) continue;

    const meta = colRuns(r, 1).map((x) => x.text || "");
    // Layout: `Album | • | Artist | • | Year` — discard the "Album" label
    // and the separators.
    const parts = meta.filter((s) => s && s !== " • " && s !== "Album");
    const artist = parts[0] ?? "";
    const year = parts[1] ?? "";

    hits.push({
      id: browseId,
      title: colText(r, 0),
      artist,
      year,
      thumbnail: bestThumbnail(r),
    });
    if (hits.length >= limit) break;
  }
  return hits;
}

// ─── Artists ───────────────────────────────────────────────────────────────

export async function searchArtists(
  query: string,
  limit: number,
): Promise<ArtistHit[]> {
  const data = await callInnerTube(query, "artists");
  const items = pickShelfItems(data);
  const hits: ArtistHit[] = [];
  for (const it of items) {
    const r = it.musicResponsiveListItemRenderer;
    if (!r) continue;
    const browseId: string | undefined =
      r?.navigationEndpoint?.browseEndpoint?.browseId;
    if (!browseId || !browseId.startsWith("UC")) continue;

    const meta = colRuns(r, 1).map((x) => x.text || "");
    const parts = meta.filter((s) => s && s !== " • " && s !== "Artist");
    const subscribers = parts[0] ?? "";

    hits.push({
      id: browseId,
      name: colText(r, 0),
      subscribers,
      thumbnail: bestThumbnail(r),
    });
    if (hits.length >= limit) break;
  }
  return hits;
}
