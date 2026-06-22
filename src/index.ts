/**
 * The Conduit — public API (namespaced).
 *
 * The five modules export some overlapping names (`ytdlp`, `extractYouTubeId`,
 * `ResolvedStream`), so they're exposed as namespaces here rather than a flat
 * barrel. rewind_server imports the modules granularly via `@conduit/<module>`;
 * this index is the clean entry point for standalone use.
 */
export * as ytdlpStream from "@conduit/ytdlpStream";
export * as ytdlpVideos from "@conduit/ytdlpVideos";
export * as ytmusic from "@conduit/ytmusic";
export * as ytmusicDiscover from "@conduit/ytmusic-discover";
export * as ytmusicInnertube from "@conduit/ytmusic-innertube";
