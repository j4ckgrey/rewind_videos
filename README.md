# The Conduit — Rewind Addon (yt-dlp)

The Conduit is the **online video** integration for Rewind, powered by
[yt-dlp](https://github.com/yt-dlp/yt-dlp). It is shipped **separately from the
core Rewind server** because pulling streams from YouTube is the operator's
choice — the server itself ships with no yt-dlp code or binary.

When installed, The Conduit activates:

- **Homepage trailers** (TMDB / Trakt rows resolved to playable YouTube URLs);
- the **Videos library** (YouTube search, channels, playback);
- **YouTube Music** (discovery, search, radio, playback/scrobble).

It also provisions the **yt-dlp binary** on the server (install hook
`yt-dlp-binary`).

> **Local libraries are unaffected.** You can still create a local `videos` or
> `music` library and play files from disk or Google Drive without this addon —
> those are scanned + served natively (ffprobe + metadata providers). The
> Conduit only adds the *online* yt-dlp-sourced features.

## Installing

In the Rewind dashboard go to **Integrations → Addons**, paste the manifest URL
(e.g. `https://raw.githubusercontent.com/j4ckgrey/rewind_videos/main/manifest.json`), and press **Install**. The
trailer row, Videos library, and YT Music light up on clients on next refresh.

## Layout

```
rewind_videos/
  manifest.json          Rewind addon manifest (the install URL points at this)
  src/
    index.ts             namespaced public API
    ytdlpStream.ts       YouTube video/audio resolver (quality ladder, expiry)
    ytdlpVideos.ts       Videos library: search / channel listing
    ytmusic.ts           YouTube Music search / album / audio resolve
    ytmusic-innertube.ts InnerTube search (songs / artists / albums)
    ytmusic-discover.ts  charts / radio / playlists discovery
```

Every module is self-contained — it imports only `ytdlp-nodejs` and Node
builtins, nothing from rewind_server. That's why The Conduit needs no host seam
(unlike The Forge): the YouTube-extraction code is pure.

## How it's consumed (runtime plugin — NOT part of the server build)

The server ships clean and runs without this addon. `src/plugin.ts` exports
`register()` returning the namespaces the server's thin `api/videos/*` +
`api/music/*` route shells call; trailer orchestration (`lib/trailers.ts`) stays
in the server but delegates the YouTube resolve to the loaded Conduit. Install
flow: `npm run build` → publish `dist/index.mjs` → paste this repo's
`manifest.json` URL in **Integrations → Addons** → the server downloads the
bundle into `data/addons/videos/index.mjs` and loads it. Everything is gated on
`addon_videos_installed`, so no yt-dlp runs until installed.

## The yt-dlp binary

`ytdlp-nodejs` ships a native binary, so the build keeps it **external** to the
bundle (`--external:ytdlp-nodejs`). The addon's install provisions the binary
(manifest `rewind.install.provisions: ["yt-dlp-binary"]`); the runtime
`ytdlp-nodejs` package must be present next to the bundle in
`data/addons/videos/node_modules/`. (This provisioning step is the one piece that
still needs finishing — see the server's addonRuntime download flow.)

## Develop

```sh
npm install
npm run typecheck
npm run build      # → dist/index.mjs
```
