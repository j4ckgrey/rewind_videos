/**
 * Bundle the Conduit plugin into a single self-contained ESM file.
 *
 * Unlike Forge/Vault, this bundles `ytdlp-nodejs` IN (not external) so the addon
 * is self-contained in the data volume. ytdlp-nodejs computes its binary dir from
 * `__dirname` (CJS) — which ESM doesn't define — so we inject a `__dirname` shim
 * via the banner. At runtime the bundle lives at data/addons/videos/index.mjs, so
 * its `__dirname` is data/addons/videos, and ytdlp-nodejs's default BIN_DIR
 * becomes data/addons/videos/bin — exactly where the install hook drops the
 * yt-dlp binary. No code change to the `new YtDlp()` call sites needed.
 */
import { build } from "esbuild";

await build({
  entryPoints: ["src/plugin.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node22",
  outfile: "dist/index.mjs",
  tsconfig: "tsconfig.json",
  banner: {
    js:
      "import{fileURLToPath as __forge_f}from'node:url';import{dirname as __forge_d}from'node:path';" +
      "const __filename=__forge_f(import.meta.url);const __dirname=__forge_d(__filename);",
  },
});

console.log("built dist/index.mjs");
