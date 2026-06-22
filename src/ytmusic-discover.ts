/* eslint-disable @typescript-eslint/no-explicit-any --
   InnerTube /browse returns deeply-nested, undocumented, shape-shifting JSON
   (musicCarouselShelfRenderer, musicTwoRowItemRenderer, … dozens of renderer
   variants). We navigate it defensively with optional chaining + runtime
   guards; modelling every variant as a static type would be inaccurate and far
   more fragile than the guards already here. `any` is the correct tool at this
   untyped third-party boundary. */
/**
 * YouTube Music discovery via InnerTube /browse.
 *
 * Same key/client/context as the search module — see ytmusic-innertube.ts.
 * These browseIds are well-known across the ytmusicapi community and surface
 * the same shelves the YT Music web home page uses:
 *
 *   FEmusic_home              — the personalized-looking home feed
 *   FEmusic_charts            — global / regional charts
 *   FEmusic_new_releases      — new-release albums shelf
 *   FEmusic_explore           — moods & genres, new releases, charts
 *
 * Charts and new-releases are stable across regions; home varies. We only
 * pull the shelves we can parse and downcast everything to the same
 * {tracks, albums, artists} shape the rest of the music UI already speaks.
 */

const INNERTUBE_KEY = "AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30";
const INNERTUBE_URL = `https://music.youtube.com/youtubei/v1/browse?key=${INNERTUBE_KEY}&prettyPrint=false`;

const CLIENT_CONTEXT = {
  client: {
    clientName: "WEB_REMIX",
    clientVersion: "1.20240101.01.00",
    hl: "en",
    gl: "US",
  },
};

export type DiscoverTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  thumbnail: string;
};

export type DiscoverAlbum = {
  id: string;
  title: string;
  artist: string;
  year: string;
  thumbnail: string;
};

export type DiscoverArtist = {
  id: string;
  name: string;
  subscribers: string;
  thumbnail: string;
};

export type DiscoverPlaylist = {
  /** YT Music playlist browse ID — `VL<PL…>` or similar. */
  id: string;
  title: string;
  subtitle: string; // "X songs" or curator name, render as-is
  thumbnail: string;
};

export type DiscoverPayload = {
  tracks: DiscoverTrack[];
  albums: DiscoverAlbum[];
  artists: DiscoverArtist[];
  playlists: DiscoverPlaylist[];
};

async function callBrowse(browseId: string, params?: string): Promise<any> {
  const res = await fetch(INNERTUBE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      context: CLIENT_CONTEXT,
      browseId,
      ...(params ? { params } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`YT Music browse ${browseId} → ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

// YT Music's carousel/chart shelves hand back tiny thumbnails (artists come
// back at =w120-h120, some shelves at =s88). The size is encoded in the URL's
// trailing `=…` token, so we rewrite w/h/s up to a card-friendly minimum
// instead of letting the UI upscale a 120px image. URLs without a size token
// (e.g. i.ytimg `…/hqdefault.jpg`) and already-larger ones are left untouched.
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

function bestThumbnailFromList(list: any[]): string {
  if (!Array.isArray(list) || list.length === 0) return "";
  return upscaleThumb(list[list.length - 1]?.url ?? list[0]?.url ?? "");
}

function bestThumbnail(obj: any): string {
  // Carousel/grid items wrap thumbnails in a few different shapes depending
  // on the renderer; check the ones we've seen in the wild.
  const lists = [
    obj?.thumbnailRenderer?.musicThumbnailRenderer?.thumbnail?.thumbnails,
    obj?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails,
    obj?.thumbnail?.thumbnails,
  ];
  for (const list of lists) {
    if (Array.isArray(list) && list.length > 0) {
      return bestThumbnailFromList(list);
    }
  }
  return "";
}

function runsText(runs: any[] | undefined): string {
  if (!Array.isArray(runs)) return "";
  return runs.map((r) => r?.text ?? "").join("");
}

function durationStringToSeconds(input: string): number {
  const parts = input.split(":").map((p) => parseInt(p, 10));
  if (parts.some((n) => Number.isNaN(n))) return 0;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

// Walk the response tree and find every section (musicCarouselShelf,
// musicShelf, musicCardShelf, etc.). Each "shelf" is one rail on the home
// page; we pick items out of all shelves and tag by destination type.
function extractAllShelves(payload: any): any[] {
  const shelves: any[] = [];
  // Some browse responses use single-column, others tabbed.
  const tabs: any[] =
    payload?.contents?.singleColumnBrowseResultsRenderer?.tabs ??
    payload?.contents?.twoColumnBrowseResultsRenderer?.tabs ??
    [];
  for (const tab of tabs) {
    const sections: any[] =
      tab?.tabRenderer?.content?.sectionListRenderer?.contents ?? [];
    for (const s of sections) {
      if (s.musicCarouselShelfRenderer) shelves.push(s.musicCarouselShelfRenderer);
      if (s.musicShelfRenderer) shelves.push(s.musicShelfRenderer);
      if (s.musicCardShelfRenderer) shelves.push(s.musicCardShelfRenderer);
    }
  }
  return shelves;
}

function shelfItems(shelf: any): any[] {
  return shelf?.contents ?? [];
}

// YT Music wraps each card in one of three renderers depending on the shelf
// layout: `musicTwoRowItemRenderer` (the squared cards used by carousels of
// albums/artists/videos), `musicResponsiveListItemRenderer` (the row layout
// used by Trending and Top Artists shelves), and the rarer
// `musicTwoRowItemRenderer` variants. The two layouts put their click target
// in different places — tworow has a top-level navigationEndpoint while row
// items either expose `playlistItemData.videoId` for tracks or hide the
// endpoint inside `flexColumns[0].text.runs[0].navigationEndpoint`. We probe
// each location so the same parser handles both shapes.
function readResponsiveTitle(row: any): {
  text: string;
  videoId: string | null;
  browseId: string | null;
} {
  const fc =
    row?.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer;
  const runs = fc?.text?.runs ?? [];
  const text = runs.map((r: any) => r?.text ?? "").join("");
  let videoId: string | null = null;
  let browseId: string | null = null;
  for (const r of runs) {
    const ne = r?.navigationEndpoint;
    if (ne?.watchEndpoint?.videoId) {
      videoId = ne.watchEndpoint.videoId;
      break;
    }
    if (ne?.browseEndpoint?.browseId) {
      browseId = ne.browseEndpoint.browseId;
      break;
    }
  }
  return { text, videoId, browseId };
}

function readResponsiveSubtitleParts(row: any): string[] {
  const fc =
    row?.flexColumns?.[1]?.musicResponsiveListItemFlexColumnRenderer;
  const runs = fc?.text?.runs ?? [];
  return runs
    .map((r: any) => r?.text ?? "")
    .filter((s: string) => s && s !== " • " && s !== ", ");
}

function classifyItem(item: any): {
  kind: "track" | "album" | "artist" | "playlist" | null;
  data: any;
} {
  const tworow = item?.musicTwoRowItemRenderer;
  if (tworow) {
    const watch = tworow?.navigationEndpoint?.watchEndpoint;
    const browse = tworow?.navigationEndpoint?.browseEndpoint;
    if (watch?.videoId)
      return { kind: "track", data: { node: tworow, layout: "tworow", watch } };
    if (browse?.browseId?.startsWith("MPREb_"))
      return { kind: "album", data: { node: tworow, layout: "tworow", browse } };
    if (browse?.browseId?.startsWith("UC"))
      return { kind: "artist", data: { node: tworow, layout: "tworow", browse } };
    if (
      browse?.browseId?.startsWith("VL") ||
      browse?.browseId?.startsWith("OLAK") ||
      browse?.browseId?.startsWith("FEmusic_detail")
    )
      return { kind: "playlist", data: { node: tworow, layout: "tworow", browse } };
    return { kind: null, data: null };
  }

  const row = item?.musicResponsiveListItemRenderer;
  if (row) {
    // Track first: row items frequently carry the videoId on `playlistItemData`
    // or in the first flex column's first run. Trending shelves on FEmusic_*
    // browse responses use this layout exclusively.
    const playlistVideoId = row?.playlistItemData?.videoId;
    const titleInfo = readResponsiveTitle(row);
    const videoId = playlistVideoId || titleInfo.videoId;
    if (videoId && videoId.length === 11) {
      return {
        kind: "track",
        data: { node: row, layout: "row", watch: { videoId }, titleInfo },
      };
    }

    // Artists / albums / playlists carry their browseId on the row's top-level
    // navigationEndpoint, not in the flexColumns.
    const topNav = row?.navigationEndpoint;
    const browseId =
      topNav?.browseEndpoint?.browseId || titleInfo.browseId || null;
    if (browseId) {
      const browse = { browseId };
      if (browseId.startsWith("MPREb_"))
        return { kind: "album", data: { node: row, layout: "row", browse, titleInfo } };
      if (browseId.startsWith("UC"))
        return { kind: "artist", data: { node: row, layout: "row", browse, titleInfo } };
      if (
        browseId.startsWith("VL") ||
        browseId.startsWith("OLAK") ||
        browseId.startsWith("FEmusic_detail")
      )
        return { kind: "playlist", data: { node: row, layout: "row", browse, titleInfo } };
    }
  }

  return { kind: null, data: null };
}

function pickPlaylist(node: any, browse: any, titleInfo?: any): DiscoverPlaylist | null {
  if (!browse?.browseId) return null;
  let title = "";
  let subtitle = "";
  if (titleInfo) {
    title = titleInfo.text || "";
    const parts = readResponsiveSubtitleParts(node);
    subtitle = parts.join(" ").replace(/^Playlist\s*•?\s*/i, "");
  } else {
    title = runsText(node?.title?.runs);
    const subtitleRuns = node?.subtitle?.runs ?? [];
    subtitle = runsText(subtitleRuns).replace(/^Playlist\s*•?\s*/i, "");
  }
  if (!title) return null;
  return {
    id: browse.browseId,
    title,
    subtitle,
    thumbnail: bestThumbnail(node),
  };
}

function pickTrack(node: any, watch: any, titleInfo?: any): DiscoverTrack | null {
  if (!watch?.videoId || watch.videoId.length !== 11) return null;
  let title = "";
  let parts: string[] = [];
  if (titleInfo) {
    title = titleInfo.text || "";
    parts = readResponsiveSubtitleParts(node);
  } else {
    title = runsText(node?.title?.runs);
    const subtitleRuns = node?.subtitle?.runs ?? [];
    parts = subtitleRuns
      .map((r: any) => r?.text ?? "")
      .filter((s: string) => s && s !== " • " && s !== ", ");
  }
  const artist = parts[0] ?? "";
  let album = "";
  let duration = 0;
  const last = parts[parts.length - 1];
  if (last && /^\d+:\d{2}(?::\d{2})?$/.test(last)) {
    duration = durationStringToSeconds(last);
    album = parts.slice(1, -1).join(" ");
  } else {
    album = parts.slice(1).join(" ");
  }
  if (!title) return null;
  return {
    id: watch.videoId,
    title,
    artist,
    album,
    duration,
    thumbnail: bestThumbnail(node) || `https://i.ytimg.com/vi/${watch.videoId}/hqdefault.jpg`,
  };
}

function pickAlbum(node: any, browse: any, titleInfo?: any): DiscoverAlbum | null {
  if (!browse?.browseId) return null;
  let title = "";
  let parts: string[] = [];
  if (titleInfo) {
    title = titleInfo.text || "";
    parts = readResponsiveSubtitleParts(node).filter(
      (s) => s !== "Album" && s !== "Single" && s !== "EP",
    );
  } else {
    title = runsText(node?.title?.runs);
    const subtitleRuns = node?.subtitle?.runs ?? [];
    parts = subtitleRuns
      .map((r: any) => r?.text ?? "")
      .filter((s: string) => s && s !== " • " && s !== "Album" && s !== "Single" && s !== "EP");
  }
  const artist = parts[0] ?? "";
  const year = parts.find((p: string) => /^\d{4}$/.test(p)) ?? "";
  if (!title) return null;
  return {
    id: browse.browseId,
    title,
    artist,
    year,
    thumbnail: bestThumbnail(node),
  };
}

function pickArtist(node: any, browse: any, titleInfo?: any): DiscoverArtist | null {
  if (!browse?.browseId) return null;
  let name = "";
  let subscribers = "";
  if (titleInfo) {
    name = titleInfo.text || "";
    const parts = readResponsiveSubtitleParts(node);
    subscribers = parts.join(" ");
  } else {
    name = runsText(node?.title?.runs);
    const subtitleRuns = node?.subtitle?.runs ?? [];
    subscribers = runsText(subtitleRuns);
  }
  if (!name) return null;
  return {
    id: browse.browseId,
    name,
    subscribers,
    thumbnail: bestThumbnail(node),
  };
}

async function browseDiscover(browseId: string): Promise<DiscoverPayload> {
  const data = await callBrowse(browseId);
  const shelves = extractAllShelves(data);
  const tracks: DiscoverTrack[] = [];
  const albums: DiscoverAlbum[] = [];
  const artists: DiscoverArtist[] = [];
  const playlists: DiscoverPlaylist[] = [];
  const seenTracks = new Set<string>();
  const seenAlbums = new Set<string>();
  const seenArtists = new Set<string>();
  const seenPlaylists = new Set<string>();

  for (const shelf of shelves) {
    for (const it of shelfItems(shelf)) {
      const { kind, data: payload } = classifyItem(it);
      if (kind === "track") {
        const t = pickTrack(payload.node, payload.watch, payload.titleInfo);
        if (t && !seenTracks.has(t.id)) {
          seenTracks.add(t.id);
          tracks.push(t);
        }
      } else if (kind === "album") {
        const a = pickAlbum(payload.node, payload.browse, payload.titleInfo);
        if (a && !seenAlbums.has(a.id)) {
          seenAlbums.add(a.id);
          albums.push(a);
        }
      } else if (kind === "artist") {
        const a = pickArtist(payload.node, payload.browse, payload.titleInfo);
        if (a && !seenArtists.has(a.id)) {
          seenArtists.add(a.id);
          artists.push(a);
        }
      } else if (kind === "playlist") {
        const p = pickPlaylist(payload.node, payload.browse, payload.titleInfo);
        if (p && !seenPlaylists.has(p.id)) {
          seenPlaylists.add(p.id);
          playlists.push(p);
        }
      }
    }
  }
  return { tracks, albums, artists, playlists };
}

// In-memory cache for discover responses. Trending/charts don't change by
// the minute, and the per-process cache keeps us under YT Music's rate
// limits when many users open the music tab at once.
const DISCOVER_CACHE_TTL_MS = 60 * 60 * 1000; // 1h
type CacheEntry = { value: DiscoverPayload; expiresAt: number };
const discoverCache = new Map<string, CacheEntry>();

async function cachedBrowse(browseId: string): Promise<DiscoverPayload> {
  const now = Date.now();
  const cached = discoverCache.get(browseId);
  if (cached && cached.expiresAt > now) return cached.value;
  const value = await browseDiscover(browseId).catch(() => ({
    tracks: [],
    albums: [],
    artists: [],
    playlists: [],
  }));
  discoverCache.set(browseId, { value, expiresAt: now + DISCOVER_CACHE_TTL_MS });
  return value;
}

export async function fetchTrendingTracks(limit = 30): Promise<DiscoverTrack[]> {
  // Charts has dedicated track shelves; explore as a fallback in regions
  // where charts returns empty.
  const [charts, explore] = await Promise.all([
    cachedBrowse("FEmusic_charts"),
    cachedBrowse("FEmusic_explore"),
  ]);
  const merged = [...charts.tracks, ...explore.tracks];
  const seen = new Set<string>();
  const out: DiscoverTrack[] = [];
  for (const t of merged) {
    if (seen.has(t.id)) continue;
    seen.add(t.id);
    out.push(t);
    if (out.length >= limit) break;
  }
  return out;
}

export async function fetchNewReleases(limit = 24): Promise<DiscoverAlbum[]> {
  const data = await cachedBrowse("FEmusic_new_releases");
  return data.albums.slice(0, limit);
}

export async function fetchTopArtists(limit = 20): Promise<DiscoverArtist[]> {
  const data = await cachedBrowse("FEmusic_charts");
  return data.artists.slice(0, limit);
}

// Popular albums — pulled from the new-releases page and the explore page.
// Charts doesn't have an "albums" shelf on its own; combining both gives
// a stable popular-this-week list across regions.
export async function fetchPopularAlbums(limit = 24): Promise<DiscoverAlbum[]> {
  const [explore, newReleases] = await Promise.all([
    cachedBrowse("FEmusic_explore"),
    cachedBrowse("FEmusic_new_releases"),
  ]);
  const merged = [...explore.albums, ...newReleases.albums];
  const seen = new Set<string>();
  const out: DiscoverAlbum[] = [];
  for (const a of merged) {
    if (seen.has(a.id)) continue;
    seen.add(a.id);
    out.push(a);
    if (out.length >= limit) break;
  }
  return out;
}

// Popular artists — charts + explore. Same dedupe pattern as albums.
export async function fetchPopularArtists(limit = 24): Promise<DiscoverArtist[]> {
  const [charts, explore] = await Promise.all([
    cachedBrowse("FEmusic_charts"),
    cachedBrowse("FEmusic_explore"),
  ]);
  const merged = [...charts.artists, ...explore.artists];
  const seen = new Set<string>();
  const out: DiscoverArtist[] = [];
  for (const a of merged) {
    if (seen.has(a.id)) continue;
    seen.add(a.id);
    out.push(a);
    if (out.length >= limit) break;
  }
  return out;
}

// Mood & genre playlists — `FEmusic_moods_and_genres` returns a page of
// mood/genre tiles, each of which opens its own page of curated playlists.
// We expose the *tiles* themselves as a rail (cheaper than fanning out
// to each tile's contents); tapping one on the client opens its page.
export async function fetchMoodPlaylists(limit = 16): Promise<DiscoverPlaylist[]> {
  const data = await cachedBrowse("FEmusic_moods_and_genres");
  return data.playlists.slice(0, limit);
}

// Community playlists — charts + explore expose a "Featured playlists"
// shelf (curator-made, e.g. "Today's Hits", "Throwback Thursday"). These
// are normal VL… browseIds you can open like any other playlist.
export async function fetchCommunityPlaylists(
  limit = 16,
): Promise<DiscoverPlaylist[]> {
  const [charts, explore] = await Promise.all([
    cachedBrowse("FEmusic_charts"),
    cachedBrowse("FEmusic_explore"),
  ]);
  const merged = [...charts.playlists, ...explore.playlists];
  const seen = new Set<string>();
  const out: DiscoverPlaylist[] = [];
  for (const p of merged) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    out.push(p);
    if (out.length >= limit) break;
  }
  return out;
}

// Mood/genre tile list — pulled directly from FEmusic_moods_and_genres.
// Each tile has a name ("Pop", "Electronic", "Workout"...) and a `params`
// payload that scopes a subsequent FEmusic_moods_and_genres_category browse
// to that mood's playlists. We expose just the names + params so the client
// can present them as a chip rail.
export type GenreTile = { name: string; browseId: string; params: string };

export async function fetchGenreTiles(): Promise<GenreTile[]> {
  // Cache lifetime here is the same as DISCOVER_CACHE_TTL_MS — the tiles
  // change rarely (region-level updates, not day-by-day).
  const now = Date.now();
  const cached = genreTilesCache;
  if (cached && cached.expiresAt > now) return cached.value;

  const data = await callBrowse("FEmusic_moods_and_genres").catch(() => null);
  if (!data) {
    const empty = { value: [] as GenreTile[], expiresAt: now + DISCOVER_CACHE_TTL_MS };
    genreTilesCache = empty;
    return [];
  }
  const tiles: GenreTile[] = [];
  const seen = new Set<string>();
  const sections: any[] =
    data?.contents?.singleColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer
      ?.content?.sectionListRenderer?.contents ?? [];
  for (const s of sections) {
    const items: any[] = s?.gridRenderer?.items ?? [];
    for (const it of items) {
      const r = it?.musicNavigationButtonRenderer;
      if (!r) continue;
      const name = runsText(r?.buttonText?.runs) || r?.buttonText?.simpleText;
      const browse = r?.clickCommand?.browseEndpoint;
      const browseId = browse?.browseId;
      const params = browse?.params;
      if (!name || !browseId || !params) continue;
      // Every mood/genre tile shares browseId="FEmusic_moods_and_genres_category"
      // — they differ only by `params`. Dedupe on the (id, params) pair so we
      // don't collapse 30 tiles into the first one we see.
      const key = `${browseId}:${params}`;
      if (seen.has(key)) continue;
      seen.add(key);
      tiles.push({ name, browseId, params });
    }
  }
  genreTilesCache = { value: tiles, expiresAt: now + DISCOVER_CACHE_TTL_MS };
  return tiles;
}

let genreTilesCache: { value: GenreTile[]; expiresAt: number } | null = null;

// Fetch the playlists / tracks / artists for one specific genre tile.
// FEmusic_moods_and_genres_category accepts the same browseId/params combo
// the tile clicks send. Returns the same DiscoverPayload shape as the home
// rails so we can plug it straight into the response.
export async function fetchGenreContent(
  browseId: string,
  params: string,
): Promise<DiscoverPayload> {
  const cacheKey = `genre:${browseId}:${params}`;
  const now = Date.now();
  const cached = discoverCache.get(cacheKey);
  if (cached && cached.expiresAt > now) return cached.value;

  const data = await callBrowse(browseId, params).catch(() => null);
  if (!data) {
    const empty = {
      tracks: [] as DiscoverTrack[],
      albums: [] as DiscoverAlbum[],
      artists: [] as DiscoverArtist[],
      playlists: [] as DiscoverPlaylist[],
    };
    discoverCache.set(cacheKey, { value: empty, expiresAt: now + DISCOVER_CACHE_TTL_MS });
    return empty;
  }
  const shelves = extractAllShelves(data);
  const tracks: DiscoverTrack[] = [];
  const albums: DiscoverAlbum[] = [];
  const artists: DiscoverArtist[] = [];
  const playlists: DiscoverPlaylist[] = [];
  const seenTracks = new Set<string>();
  const seenAlbums = new Set<string>();
  const seenArtists = new Set<string>();
  const seenPlaylists = new Set<string>();
  for (const shelf of shelves) {
    for (const it of shelfItems(shelf)) {
      const { kind, data: payload } = classifyItem(it);
      if (kind === "track") {
        const t = pickTrack(payload.node, payload.watch, payload.titleInfo);
        if (t && !seenTracks.has(t.id)) {
          seenTracks.add(t.id);
          tracks.push(t);
        }
      } else if (kind === "album") {
        const a = pickAlbum(payload.node, payload.browse, payload.titleInfo);
        if (a && !seenAlbums.has(a.id)) {
          seenAlbums.add(a.id);
          albums.push(a);
        }
      } else if (kind === "artist") {
        const a = pickArtist(payload.node, payload.browse, payload.titleInfo);
        if (a && !seenArtists.has(a.id)) {
          seenArtists.add(a.id);
          artists.push(a);
        }
      } else if (kind === "playlist") {
        const p = pickPlaylist(payload.node, payload.browse, payload.titleInfo);
        if (p && !seenPlaylists.has(p.id)) {
          seenPlaylists.add(p.id);
          playlists.push(p);
        }
      }
    }
  }
  const out = { tracks, albums, artists, playlists };
  discoverCache.set(cacheKey, { value: out, expiresAt: now + DISCOVER_CACHE_TTL_MS });
  return out;
}

// Open a YT Music playlist by browseId and return its tracks. Powers the
// "play this playlist" action when the user taps a card in the community/
// mood rails. Uses the same InnerTube `/browse` endpoint as the discovery
// rails, then walks the playlistShelfRenderer for video IDs + metadata.
export async function fetchPlaylistTracks(
  browseId: string,
  limit = 100,
): Promise<{ title: string; thumbnail: string; tracks: DiscoverTrack[] }> {
  const data = await callBrowse(browseId).catch(() => null);
  if (!data) return { title: "", thumbnail: "", tracks: [] };

  // Playlist header → title + cover. Different YT Music payloads put it
  // in slightly different places, so check the most common ones.
  const header =
    data?.header?.musicDetailHeaderRenderer ??
    data?.header?.musicEditablePlaylistDetailHeaderRenderer?.header
      ?.musicDetailHeaderRenderer ??
    data?.header?.musicResponsiveHeaderRenderer ??
    {};
  const title =
    runsText(header?.title?.runs) ||
    header?.title?.simpleText ||
    runsText(data?.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]
      ?.musicResponsiveHeaderRenderer?.title?.runs);
  const thumbnail = bestThumbnail(header);

  // Tracks live in a musicPlaylistShelfRenderer somewhere inside the tab
  // layout — walk the standard tab → sectionList → musicPlaylistShelf path
  // and fall back to extractAllShelves if YT Music changes the structure.
  const tabs: any[] =
    data?.contents?.singleColumnBrowseResultsRenderer?.tabs ??
    data?.contents?.twoColumnBrowseResultsRenderer?.tabs ??
    [];
  let trackItems: any[] = [];
  for (const tab of tabs) {
    const sections: any[] =
      tab?.tabRenderer?.content?.sectionListRenderer?.contents ?? [];
    for (const s of sections) {
      const items = s?.musicPlaylistShelfRenderer?.contents;
      if (Array.isArray(items) && items.length > 0) {
        trackItems = items;
        break;
      }
    }
    if (trackItems.length > 0) break;
  }

  const tracks: DiscoverTrack[] = [];
  const seen = new Set<string>();
  for (const it of trackItems) {
    const r = it?.musicResponsiveListItemRenderer;
    if (!r) continue;
    const titleRun = r?.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer
      ?.text?.runs?.[0];
    const videoId = titleRun?.navigationEndpoint?.watchEndpoint?.videoId;
    if (!videoId || videoId.length !== 11 || seen.has(videoId)) continue;
    seen.add(videoId);
    const trackTitle = runsText(
      r?.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs,
    );
    const subRuns =
      r?.flexColumns?.[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs ??
      [];
    const parts = subRuns
      .map((x: any) => x?.text ?? "")
      .filter((s: string) => s && s !== " • ");
    const artist = parts[0] ?? "";
    const album = parts.slice(1).join(" ");
    const durStr = r?.fixedColumns?.[0]
      ?.musicResponsiveListItemFixedColumnRenderer?.text?.runs?.[0]?.text;
    const duration = durStr ? durationStringToSeconds(durStr) : 0;
    const thumb =
      bestThumbnail(r) || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    tracks.push({
      id: videoId,
      title: trackTitle,
      artist,
      album,
      duration,
      thumbnail: thumb,
    });
    if (tracks.length >= limit) break;
  }

  return { title: title || "", thumbnail, tracks };
}

// "Related to X" — used to seed the Made-For-You rail from a user's recent
// plays. YT Music's watch endpoint returns a radio playlist for any video;
// we just walk the playlist contents and pull video IDs/titles.
export async function fetchRelatedTracks(
  seedVideoId: string,
  limit = 10,
): Promise<DiscoverTrack[]> {
  const NEXT_URL = `https://music.youtube.com/youtubei/v1/next?key=${INNERTUBE_KEY}&prettyPrint=false`;
  try {
    const res = await fetch(NEXT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        context: CLIENT_CONTEXT,
        videoId: seedVideoId,
        // RDAMVM<videoId> is the canonical "video radio" playlist; YT Music
        // builds the auto-play queue from it.
        playlistId: `RDAMVM${seedVideoId}`,
        params: "wAEB",
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const queue: any[] =
      data?.contents?.singleColumnMusicWatchNextResultsRenderer?.tabbedRenderer
        ?.watchNextTabbedResultsRenderer?.tabs?.[0]?.tabRenderer?.content
        ?.musicQueueRenderer?.content?.playlistPanelRenderer?.contents ?? [];
    const out: DiscoverTrack[] = [];
    const seen = new Set<string>([seedVideoId]);
    for (const it of queue) {
      const r = it?.playlistPanelVideoRenderer;
      if (!r) continue;
      const videoId = r?.navigationEndpoint?.watchEndpoint?.videoId;
      if (!videoId || videoId.length !== 11) continue;
      if (seen.has(videoId)) continue;
      seen.add(videoId);
      const title = runsText(r?.title?.runs);
      const byLineRuns = r?.longBylineText?.runs ?? r?.shortBylineText?.runs ?? [];
      const parts = byLineRuns
        .map((x: any) => x?.text ?? "")
        .filter((s: string) => s && s !== " • ");
      const artist = parts[0] ?? "";
      const album = parts[1] ?? "";
      const duration = durationStringToSeconds(
        runsText(r?.lengthText?.runs) || "",
      );
      const thumbList =
        r?.thumbnail?.thumbnails ?? r?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails;
      out.push({
        id: videoId,
        title,
        artist,
        album,
        duration,
        thumbnail:
          bestThumbnailFromList(thumbList ?? []) ||
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      });
      if (out.length >= limit) break;
    }
    return out;
  } catch {
    return [];
  }
}
