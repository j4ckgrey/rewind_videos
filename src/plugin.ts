/**
 * The Conduit — runtime plugin entry.
 *
 * Bundled by `npm run build` into dist/index.mjs and installed by the operator
 * into data/addons/conduit/index.mjs. The server imports it and calls
 * `register(host)` once; the Conduit modules are self-contained (yt-dlp + node),
 * so the host (just a logger) is accepted but unused. `register` returns the
 * namespaces the server's video/music routes call.
 *
 * NOTE: yt-dlp-nodejs ships a native binary it resolves at runtime, so it is left
 * EXTERNAL to the bundle (see the build script). The addon's install provisions
 * the binary on the server (manifest rewind.install.provisions: ["yt-dlp-binary"]).
 */
import * as ytdlpStream from "@conduit/ytdlpStream";
import * as ytdlpVideos from "@conduit/ytdlpVideos";
import * as ytmusic from "@conduit/ytmusic";
import * as ytmusicDiscover from "@conduit/ytmusic-discover";
import * as ytmusicInnertube from "@conduit/ytmusic-innertube";

export const manifest = { id: "rewind.conduit", kind: "videos" as const };

export function register() {
  return { ytdlpStream, ytdlpVideos, ytmusic, ytmusicDiscover, ytmusicInnertube };
}
