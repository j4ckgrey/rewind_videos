/* eslint-disable @typescript-eslint/no-explicit-any --
   Maps yt-dlp's loosely-typed, version-drifting entry JSON into our metadata
   shapes. `any` is the correct tool at this untyped CLI boundary. */
import { YtDlp } from "ytdlp-nodejs";

/** Shared yt-dlp instance for the Videos endpoints. */
export const ytdlp = new YtDlp();

/** youtubetab `approximate_date` backfills an approximate upload time into
 *  `timestamp` on flat-playlist entries (search results + channel uploads),
 *  without per-video extraction. Pass to getInfoAsync as options. */
export const APPROX_DATE_OPTS = {
  extractorArgs: { youtubetab: ["approximate_date"] },
} as Record<string, unknown>;

/** YouTube search "type = Channel" filter (the `sp` param). */
export const CHANNEL_SEARCH_SP = "EgIQAg%3D%3D";

// ─── field formatters ────────────────────────────────────────────────────────

/** "YYYYMMDD" (yt-dlp upload_date) → ISO "YYYY-MM-DD". */
export function formatYtdlpDate(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(raw);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : undefined;
}

/** epoch seconds (yt-dlp timestamp) → ISO "YYYY-MM-DD". */
export function isoDateFromEpoch(raw: unknown): string | undefined {
  const secs = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(secs) || secs <= 0) return undefined;
  const d = new Date(secs * 1000);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

/** duration seconds → "M:SS" / "H:MM:SS"; undefined for live/zero/invalid. */
export function formatSeconds(raw: unknown): string | undefined {
  const secs = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(secs) || secs <= 0) return undefined;
  const total = Math.round(secs);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

function httpsThumb(url: unknown): string | undefined {
  if (typeof url !== "string" || !url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

// ─── meta builders ───────────────────────────────────────────────────────────

/** A flat yt-dlp video entry (search result or channel upload) → the meta the
 *  Videos client renders. `releaseInfo` is the publish date (ISO); `runtime` is
 *  the duration badge. */
export function entryToVideoMeta(entry: any) {
  const thumbnail: string =
    entry.thumbnail && String(entry.thumbnail).startsWith("http")
      ? entry.thumbnail
      : `https://i.ytimg.com/vi/${entry.id}/hqdefault.jpg`;

  const releaseInfo =
    isoDateFromEpoch(entry.timestamp) ?? formatYtdlpDate(entry.upload_date);
  const runtime = formatSeconds(entry.duration);
  const channelName: string | undefined = entry.uploader || entry.channel;
  const channelUrl: string | undefined =
    entry.uploader_url || entry.channel_url;

  return {
    id: `yt_id:${entry.id}`,
    type: "video",
    name: entry.title,
    description: entry.description || "",
    poster: thumbnail,
    posterShape: "landscape",
    releaseInfo,
    runtime,
    links: [
      ...(channelName
        ? [
            {
              name: channelName,
              category: "Directors",
              url: channelUrl || `https://www.youtube.com/watch?v=${entry.id}`,
            },
          ]
        : []),
      {
        name: "YouTube",
        category: "stream",
        url: `https://www.youtube.com/watch?v=${entry.id}`,
      },
    ],
  };
}

export interface ChannelResult {
  id: string; // channel id, "UC…"
  name: string;
  avatar?: string;
  subscribers: number | null;
  verified: boolean;
  description: string;
  url: string;
}

/** A flat yt-dlp channel entry (from a `sp=channels` search) → channel card. */
export function entryToChannelMeta(entry: any): ChannelResult {
  const thumbs = Array.isArray(entry.thumbnails) ? entry.thumbnails : [];
  const avatar = httpsThumb(thumbs.length ? thumbs[thumbs.length - 1].url : "");
  return {
    id: entry.channel_id || entry.id,
    name: entry.channel || entry.title || "",
    avatar,
    subscribers:
      typeof entry.channel_follower_count === "number"
        ? entry.channel_follower_count
        : null,
    verified: !!entry.channel_is_verified,
    description: entry.description || "",
    url: entry.channel_url || entry.url || "",
  };
}
