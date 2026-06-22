/**
 * Path to the yt-dlp binary, resolved relative to THIS bundle's own location.
 *
 * At runtime the Conduit bundle lives at data/addons/videos/index.mjs, so
 * `new URL("./bin/yt-dlp", import.meta.url)` → data/addons/videos/bin/yt-dlp —
 * exactly where the server's install hook downloads the binary (in the data
 * volume, surviving Docker image updates). We pass this explicitly to every
 * `new YtDlp({ binaryPath })` because ytdlp-nodejs's default lookup walks UP to
 * the nearest package.json, which in the data volume escapes to the server root.
 */
import { fileURLToPath } from "node:url";

export const YTDLP_BINARY_PATH = fileURLToPath(new URL("./bin/yt-dlp", import.meta.url));
