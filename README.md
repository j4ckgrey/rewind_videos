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
(e.g. `https://github.com/j4ckgrey/rewind_videos/blob/main/manifest.json`), and press **Install**. The
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

## Consuming it

- **In-process (current):** rewind_server source-imports modules granularly via
  the `@conduit/*` path alias (tsconfig `paths` + Next `experimental.externalDir`)
  from its thin `src/app/api/videos/*` and `src/app/api/music/*` route shells.
  Trailer orchestration (`lib/trailers.ts`) stays in rewind_server (it reads the
  server's own trailers table + catalogs) but delegates the YouTube resolve to
  `@conduit/ytdlpStream`. Everything is gated on the `addon_videos_installed`
  flag, so no yt-dlp runs until this addon is installed. The Docker build context
  must include this dir; for dev, `rewind_videos/node_modules` is symlinked to
  rewind_server's install.
- **Standalone (Phase 5):** wrap the modules in a small HTTP service and run as
  its own container.

## The yt-dlp binary

`rewind.install.provisions: ["yt-dlp-binary"]` declares that installing this
addon provisions the yt-dlp binary on the server. (In-process today the binary
still rides in the rewind_server Dockerfile; the provisioning hook takes it over
when The Conduit goes standalone.)

## Develop

```sh
npm install
npm run typecheck
```
# rewind_videos
