import{fileURLToPath as __forge_f}from'node:url';import{dirname as __forge_d}from'node:path';const __filename=__forge_f(import.meta.url);const __dirname=__forge_d(__filename);
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/ytdlpStream.ts
var ytdlpStream_exports = {};
__export(ytdlpStream_exports, {
  extractYouTubeId: () => extractYouTubeId,
  parseStreamExpiry: () => parseStreamExpiry,
  resolveYouTubeStream: () => resolveYouTubeStream
});

// node_modules/ytdlp-nodejs/dist/index.mjs
import { fileURLToPath as Pe } from "url";
import ve from "path";
import { spawn as Z, spawnSync as ye } from "child_process";
import * as X from "fs";
import Ye from "path";
import { Blob as qe } from "buffer";
import { PassThrough as Qe } from "stream";
import Q from "path";
import N from "fs";
import * as Se from "https";
import * as _e from "http";
import { URL as oe } from "url";
import * as b from "fs";
import * as ue from "fs";
import * as D from "path";
import * as g from "fs";
import * as T from "path";
import Be from "crypto";
import { EventEmitter as $e } from "node:events";
import pe from "node:fs";
import { spawn as je } from "node:child_process";
import { PassThrough as Me } from "node:stream";
import { spawn as We } from "node:child_process";
import { PassThrough as ze } from "node:stream";
import { spawn as be } from "node:child_process";
var Fe = () => Pe(import.meta.url);
var Ae = () => ve.dirname(Fe());
var h = Ae();
function V(e) {
  let r = [];
  if (e.printHelp && r.push("--help"), e.printVersion && r.push("--version"), e.update && r.push("--update"), e.noUpdate && r.push("--no-update"), e.updateTo && r.push("--update-to", e.updateTo), e.ignoreErrors && r.push("--ignore-errors"), e.noAbortOnError && r.push("--no-abort-on-error"), e.abortOnError && r.push("--abort-on-error"), e.dumpUserAgent && r.push("--dump-user-agent"), e.listExtractors && r.push("--list-extractors"), e.extractorDescriptions && r.push("--extractor-descriptions"), e.useExtractors && e.useExtractors.length > 0 && r.push("--use-extractors", e.useExtractors.join(",")), e.defaultSearch && r.push("--default-search", e.defaultSearch), e.ignoreConfig && r.push("--ignore-config"), e.noConfigLocations && r.push("--no-config-location"), e.configLocations && e.configLocations.length > 0 && r.push("--config-locations", ...e.configLocations), e.pluginDirs && e.pluginDirs.length > 0) for (let s of e.pluginDirs) r.push("--plugin-dirs", s);
  e.noPluginDirs && r.push("--no-plugin-dirs"), e.flatPlaylist && r.push("--flat-playlist"), e.noFlatPlaylist && r.push("--no-flat-playlist"), e.liveFromStart && r.push("--live-from-start"), e.noLiveFromStart && r.push("--no-live-from-start"), e.waitForVideo && r.push("--wait-for-video", e.waitForVideo.toString()), e.noWaitForVideo && r.push("--no-wait-for-video"), e.markWatched && r.push("--mark-watched"), e.noMarkWatched && r.push("--no-mark-watched"), e.color && r.push("--color", e.color), e.compatOptions && e.compatOptions.length > 0 && r.push("--compat-options", e.compatOptions.join(",")), e.aliases && e.aliases.length > 0 && r.push("--alias", ...e.aliases);
  let t = e.jsRuntime ?? "node";
  if (t && r.push("--js-runtime", t), e.proxy && r.push("--proxy", e.proxy), e.socketTimeout && r.push("--socket-timeout", e.socketTimeout.toString()), e.sourceAddress && r.push("--source-address", e.sourceAddress), e.impersonate && e.impersonate.length > 0 && r.push("--impersonate", e.impersonate.join(",")), e.listImpersonateTargets && r.push("--list-impersonate-targets"), e.forceIpv4 && r.push("--force-ipv4"), e.forceIpv6 && r.push("--force-ipv6"), e.enableFileUrls && r.push("--enable-file-urls"), e.geoVerificationProxy && r.push("--geo-verification-proxy", e.geoVerificationProxy), e.xff && r.push("--xff", e.xff), e.playlistItems && r.push("--playlist-items", e.playlistItems), e.minFilesize && r.push("--min-filesize", e.minFilesize), e.maxFilesize && r.push("--max-filesize", e.maxFilesize), e.date && r.push("--date", e.date), e.dateBefore && r.push("--datebefore", e.dateBefore), e.dateAfter && r.push("--dateafter", e.dateAfter), e.matchFilter && r.push("--match-filter", e.matchFilter), e.noMatchFilters && r.push("--no-match-filters"), e.breakMatchFilters && r.push("--break-match-filters", e.breakMatchFilters), e.noBreakMatchFilters && r.push("--no-break-match-filters"), e.noPlaylist && r.push("--no-playlist"), e.yesPlaylist && r.push("--yes-playlist"), e.ageLimit && r.push("--age-limit", e.ageLimit.toString()), e.downloadArchive && r.push("--download-archive", e.downloadArchive), e.noDownloadArchive && r.push("--no-download-archive"), e.maxDownloads && r.push("--max-downloads", e.maxDownloads.toString()), e.breakOnExisting && r.push("--break-on-existing"), e.noBreakOnExisting && r.push("--no-break-on-existing"), e.breakPerInput && r.push("--break-per-input"), e.noBreakPerInput && r.push("--break-per-input"), e.skipPlaylistAfterErrors && r.push("--skip-playlist-after-errors", e.skipPlaylistAfterErrors.toString()), e.concurrentFragments && r.push("--concurrent-fragments", e.concurrentFragments.toString()), e.limitRate && r.push("--limit-rate", e.limitRate), e.throttledRate && r.push("--throttled-rate", e.throttledRate), e.retries && r.push("--retries", e.retries.toString()), e.fileAccessRetries && r.push("--file-access-retries", e.fileAccessRetries.toString()), e.fragmentRetries && r.push("--fragment-retries", e.fragmentRetries.toString()), e.retrySleep && r.push("--retry-sleep", e.retrySleep.toString()), e.retrySleepByType) for (let [s, i] of Object.entries(e.retrySleepByType)) r.push("--retry-sleep", `${s}:${i}`);
  if (e.skipUnavailableFragments && r.push("--skip-unavailable-fragments"), e.abortOnUnavailableFragment && r.push("--abort-on-unavailable-fragment"), e.keepFragments && r.push("--keep-fragments"), e.noKeepFragments && r.push("--no-keep-fragments"), e.bufferSize && r.push("--buffer-size", e.bufferSize), e.resizeBuffer && r.push("--resize-buffer"), e.noResizeBuffer && r.push("--no-resize-buffer"), e.httpChunkSize && r.push("--http-chunk-size", e.httpChunkSize), e.playlistRandom && r.push("--playlist-random"), e.lazyPlaylist && r.push("--lazy-playlist"), e.noLazyPlaylist && r.push("--no-lazy-playlist"), e.xattrSetFilesize && r.push("--xattr-set-filesize"), e.hlsUseMpegts && r.push("--hls-use-mpegts"), e.noHlsUseMpegts && r.push("--no-hls-use-mpegts"), e.downloadSections && r.push("--download-sections", e.downloadSections.toString()), e.downloader && r.push("--downloader", e.downloader), e.downloaderArgs && r.push("--downloader-args", e.downloaderArgs), e.batchFile && r.push("--batch-file", e.batchFile), e.noBatchFile && r.push("--no-batch-file"), e.paths) if (typeof e.paths == "string") r.push("--paths", e.paths);
  else for (let [s, i] of Object.entries(e.paths)) r.push("--paths", `${s}:${i}`);
  if (e.output && r.push("-o", e.output), e.outputNaPlaceholder && r.push("--output-na-placeholder", e.outputNaPlaceholder), e.restrictFilenames && r.push("--restrict-filenames"), e.noRestrictFilenames && r.push("--no-restrict-filenames"), e.windowsFilenames && r.push("--windows-filenames"), e.noWindowsFilenames && r.push("--no-windows-filenames"), e.trimFileNames && r.push("--trim-file-names", e.trimFileNames.toString()), e.noOverwrites && r.push("--no-overwrites"), e.forceOverwrites && r.push("--force-overwrites"), e.noForceOverwrites && r.push("--no-force-overwrites"), e.continue && r.push("--continue"), e.noContinue && r.push("--no-continue"), e.part && r.push("--part"), e.noPart && r.push("--no-part"), e.mtime && r.push("--mtime"), e.noMtime && r.push("--no-mtime"), e.writeDescription && r.push("--write-description"), e.noWriteDescription && r.push("--no-write-description"), e.writeInfoJson && r.push("--write-info-json"), e.noWriteInfoJson && r.push("--no-write-info-json"), e.writePlaylistMetafiles && r.push("--write-playlist-metafiles"), e.noWritePlaylistMetafiles && r.push("--no-write-playlist-metafiles"), e.cleanInfoJson && r.push("--clean-info-json"), e.noCleanInfoJson && r.push("--no-clean-info-json"), e.writeComments && r.push("--write-comments"), e.noWriteComments && r.push("--no-write-comments"), e.loadInfoJson && r.push("--load-info-json", e.loadInfoJson.toString()), e.cookies && r.push("--cookies", e.cookies), e.noCookies && r.push("--no-cookies"), e.cookiesFromBrowser && r.push("--cookies-from-browser", e.cookiesFromBrowser), e.noCookiesFromBrowser && r.push("--no-cookies-from-browser"), e.cacheDir && r.push("--cache-dir", e.cacheDir), e.noCacheDir && r.push("--no-cache-dir"), e.rmCacheDir && r.push("--rm-cache-dir"), e.writeThumbnail && r.push("--write-thumbnail"), e.noWriteThumbnails && r.push("--no-write-thumbnails"), e.writeAllThumbnails && r.push("--write-all-thumbnails"), e.listThumbnails && r.push("--list-thumbnails"), e.writeLink && r.push("--write-link"), e.writeUrlLink && r.push("--write-url-link"), e.writeWeblocLink && r.push("--write-webloc-link"), e.writeDesktopLink && r.push("--write-desktop-link"), e.quiet && r.push("--quiet"), e.noQuiet && r.push("--no-quiet"), e.noWarnings && r.push("--no-warnings"), e.simulate && r.push("--simulate"), e.noSimulate && r.push("--no-simulate"), e.ignoreNoFormatsError && r.push("--ignore-no-formats-error"), e.noIgnoreNoFormatsError && r.push("--no-ignore-no-formats-error"), e.skipDownload && r.push("--skip-download"), e.print && r.push("--print", e.print), e.printToFile && r.push("--print-to-file", e.printToFile), e.dumpJson && r.push("--dump-json"), e.dumpSingleJson && r.push("--dump-single-json"), e.forceWriteArchive && r.push("--force-write-archive"), e.newline && r.push("--newline"), e.noProgress && r.push("--no-progress"), e.progress && r.push("--progress"), e.consoleTitle && r.push("--console-title"), e.progressTemplate && r.push("--progress-template", e.progressTemplate), e.progressDelta && r.push("--progress-delta", e.progressDelta.toString()), e.verbose && r.push("--verbose"), e.dumpPages && r.push("--dump-pages"), e.writePages && r.push("--write-pages"), e.printTraffic && r.push("--print-traffic"), e.encoding && r.push("--encoding", e.encoding), e.legacyServerConnect && r.push("--legacy-server-connect"), e.noCheckCertificates && r.push("--no-check-certificates"), e.preferInsecure && r.push("--prefer-insecure"), e.addHeaders) for (let [s, i] of Object.entries(e.addHeaders)) r.push("--add-header", `${s}:${i}`);
  if (e.headers) for (let [s, i] of Object.entries(e.headers)) r.push("--add-header", `${s}:${i}`);
  if (e.bidiWorkaround && r.push("--bidi-workaround"), e.sleepRequests && r.push("--sleep-requests", e.sleepRequests.toString()), e.sleepInterval && r.push("--sleep-interval", e.sleepInterval.toString()), e.maxSleepInterval && r.push("--max-sleep-interval", e.maxSleepInterval.toString()), e.sleepSubtitles && r.push("--sleep-subtitles", e.sleepSubtitles.toString()), e.format && r.push("-f", e.format), e.formatSort && e.formatSort.length > 0 && r.push("--format-sort", e.formatSort.join(",")), e.formatSortForce && r.push("--format-sort-force"), e.noFormatSortForce && r.push("--no-format-sort-force"), e.videoMultiStreams && r.push("--video-multistreams"), e.noVideoMultiStreams && r.push("--no-video-multistreams"), e.audioMultiStreams && r.push("--audio-multistreams"), e.noAudioMultiStreams && r.push("--no-audio-multistreams"), e.preferFreeFormats && r.push("--prefer-free-formats"), e.noPreferFreeFormats && r.push("--no-prefer-free-formats"), e.checkFormats && r.push("--check-formats"), e.checkAllFormats && r.push("--check-all-formats"), e.noCheckFormats && r.push("--no-check-formats"), e.listFormats && r.push("--list-formats"), e.mergeOutputFormat && r.push("--merge-output-format", e.mergeOutputFormat), e.writeSubs && r.push("--write-subs"), e.noWriteSubs && r.push("--no-write-subs"), e.writeAutoSubs && r.push("--write-auto-subs"), e.writeAllSubs && r.push("--all-subs"), e.listSubs && r.push("--list-subs"), e.subFormat && r.push("--sub-format", e.subFormat), e.subLangs && e.subLangs.length > 0 && r.push("--sub-langs", e.subLangs.join(",")), e.username && r.push("--username", e.username), e.password && r.push("--password", e.password), e.twoFactor && r.push("--twofactor", e.twoFactor), e.netrc && r.push("--netrc"), e.videoPassword && r.push("--video-password", e.videoPassword), e.apMso && r.push("--ap-mso", e.apMso), e.apUsername && r.push("--ap-username", e.apUsername), e.apPassword && r.push("--ap-password", e.apPassword), e.netrcLocation && r.push("--netrc-location", e.netrcLocation), e.netrcCmd && r.push("--netrc-cmd", e.netrcCmd), e.apListMso && r.push("--ap-list-mso"), e.clientCertificate && r.push("--client-certificate", e.clientCertificate), e.clientCertificateKey && r.push("--client-certificate-key", e.clientCertificateKey), e.clientCertificatePassword && r.push("--client-certificate-password", e.clientCertificatePassword), e.extractorRetries !== void 0 && r.push("--extractor-retries", e.extractorRetries.toString()), e.allowDynamicMpd && r.push("--allow-dynamic-mpd"), e.ignoreDynamicMpd && r.push("--ignore-dynamic-mpd"), e.hlsSplitDiscontinuity && r.push("--hls-split-discontinuity"), e.noHlsSplitDiscontinuity && r.push("--no-hls-split-discontinuity"), e.extractorArgs) for (let [s, i] of Object.entries(e.extractorArgs)) r.push("--extractor-args", `${s}:${i.join(" ")}`);
  if (e.playlistStart !== void 0 && r.push("--playlist-start", e.playlistStart.toString()), e.playlistEnd !== void 0 && r.push("--playlist-end", e.playlistEnd.toString()), e.matchTitle && r.push("--match-title", e.matchTitle), e.rejectTitle && r.push("--reject-title", e.rejectTitle), e.includeAds && r.push("--include-ads"), e.breakOnReject && r.push("--break-on-reject"), e.noDownload && r.push("--no-download"), e.playlistReverse && r.push("--playlist-reverse"), e.geoBypass && r.push("--geo-bypass"), e.geoBypassCountry && r.push("--geo-bypass-country", e.geoBypassCountry), e.geoBypassIpBlock && r.push("--geo-bypass-ip-block", e.geoBypassIpBlock), e.convertThumbnails && r.push("--convert-thumbnails", e.convertThumbnails), e.writeLink && r.push("--write-link"), e.writeUrlLink && r.push("--write-url-link"), e.writeWeblocLink && r.push("--write-webloc-link"), e.writeLnkLink && r.push("--write-lnk-link"), e.referer && r.push("--referer", e.referer), e.userAgent && r.push("--user-agent", e.userAgent), e.extractAudio && r.push("--extract-audio"), e.audioFormat && r.push("--audio-format", e.audioFormat), e.audioQuality && r.push("--audio-quality", e.audioQuality), e.remuxVideo && r.push("--remux-video", e.remuxVideo), e.recodeVideo && r.push("--recode-video", e.recodeVideo), e.postprocessorArgs) for (let [s, i] of Object.entries(e.postprocessorArgs)) r.push("--postprocessor-args", `${s}:${i.join(" ")}`);
  if (e.keepVideo && r.push("--keep-video"), e.noKeepVideo && r.push("--no-keep-video"), e.postOverwrites && r.push("--post-overwrites"), e.noPostOverwrites && r.push("--no-post-overwrites"), e.embedSubs && r.push("--embed-subs"), e.noEmbedSubs && r.push("--no-embed-subs"), e.embedThumbnail && r.push("--embed-thumbnail"), e.noEmbedThumbnail && r.push("--no-embed-thumbnail"), e.embedMetadata && r.push("--embed-metadata"), e.noEmbedMetadata && r.push("--no-embed-metadata"), e.embedChapters && r.push("--embed-chapters"), e.noEmbedChapters && r.push("--no-embed-chapters"), e.embedInfoJson && r.push("--embed-info-json"), e.noEmbedInfoJson && r.push("--no-embed-info-json"), e.parseMetadata) for (let [s, i] of Object.entries(e.parseMetadata)) r.push("--parse-metadata", `${s}:${i}`);
  if (e.replaceInMetadata) for (let [s, [i, n]] of Object.entries(e.replaceInMetadata)) r.push("--replace-in-metadata", `${s} ${i} ${n}`);
  if (e.xattrs && r.push("--xattrs"), e.concatPlaylist && r.push("--concat-playlist", e.concatPlaylist), e.fixup && r.push("--fixup", e.fixup), e.ffmpegLocation && r.push("--ffmpeg-location", e.ffmpegLocation), e.exec && r.push("--exec", e.exec), e.noExec && r.push("--no-exec"), e.convertSubs && r.push("--convert-subs", e.convertSubs), e.convertThumbnails && r.push("--convert-thumbnails", e.convertThumbnails), e.splitChapters && r.push("--split-chapters"), e.noSplitChapters && r.push("--no-split-chapters"), e.removeChapters && r.push("--remove-chapters", e.removeChapters), e.noRemoveChapters && r.push("--no-remove-chapters"), e.forceKeyframesAtCuts && r.push("--force-keyframes-at-cuts"), e.noForceKeyframesAtCuts && r.push("--no-force-keyframes-at-cuts"), e.usePostProcessor && e.usePostProcessor.length > 0) for (let s of e.usePostProcessor) r.push("--use-postprocessor", s);
  return e.sponsorblockMark && e.sponsorblockMark.length > 0 && r.push("--sponsorblock-mark", e.sponsorblockMark.join(",")), e.sponsorblockRemove && e.sponsorblockRemove.length > 0 && r.push("--sponsorblock-remove", e.sponsorblockRemove.join(",")), e.sponsorblockChapterTitle && r.push("--sponsorblock-chapter-title", e.sponsorblockChapterTitle), e.noSponsorblock && r.push("--no-sponsorblock"), e.sponsorblockApi && r.push("--sponsorblock-api", e.sponsorblockApi), e.additionalOptions && e.additionalOptions.length > 0 && r.push(...e.additionalOptions), e.rawArgs && e.rawArgs.length > 0 && r.push(...e.rawArgs), r;
}
var te = { "2160p": "bv*[height<=2160]", "1440p": "bv*[height<=1440]", "1080p": "bv*[height<=1080]", "720p": "bv*[height<=720]", "480p": "bv*[height<=480]", "360p": "bv*[height<=360]", "240p": "bv*[height<=240]", "144p": "bv*[height<=133]", highest: "bv*", lowest: "wv*" };
var se = ["audioonly", "videoonly", "audioandvideo", "mergevideo"];
function B(e) {
  let r, t, s;
  if (!e) return [];
  if (typeof e == "string" && !se.includes(e)) return ["-f", e];
  if (typeof e == "string" && se.includes(e) && (r = e), Object.keys(e).length === 0 || !e || typeof e != "object") return ["-f", "bv*+ba"];
  typeof e == "object" && (r = e.filter, t = e.type, s = e.quality);
  let i = [];
  return r === "audioonly" && (i = ["-x", "--audio-format", t || "mp3", "--audio-quality", s ? s.toString() : "5"]), r === "videoonly" && (i = ["-f", (s ? te[s] : "bv*") + "[acodec=none]"]), r === "audioandvideo" && (i = ["-f", (s == "lowest" ? "w*" : "b*") + "[vcodec!=none][acodec!=none][ext=" + (t || "mp4") + "]"]), r === "mergevideo" && (i = ["-f", `${s ? te[s] : "bv*"}+ba`], t && i.push("--merge-output-format", t)), i;
}
function U(e) {
  if (!e || typeof e == "string") return "video/mp4";
  let { filter: r, type: t } = e;
  switch (r) {
    case "videoonly":
    case "audioandvideo":
      switch (t) {
        case "mp4":
          return "video/mp4";
        case "webm":
          return "video/webm";
        default:
          return "video/mp4";
      }
    case "audioonly":
      switch (t) {
        case "aac":
          return "audio/aac";
        case "flac":
          return "audio/flac";
        case "mp3":
          return "audio/mp3";
        case "m4a":
          return "audio/mp4";
        case "opus":
          return "audio/opus";
        case "vorbis":
          return "audio/vorbis";
        case "wav":
          return "audio/wav";
        case "alac":
          return "audio/mp4";
        default:
          return "audio/mpeg";
      }
    case "mergevideo":
      switch (t) {
        case "webm":
          return "video/webm";
        case "mkv":
          return "video/x-matroska";
        case "ogg":
          return "video/ogg";
        case "flv":
          return "video/x-flv";
        default:
          return "video/mp4";
      }
  }
}
function z(e) {
  if (!e || typeof e == "string") return "mp4";
  let { filter: r, type: t } = e;
  return t || (r === "audioonly" ? "mp3" : "mp4");
}
function ie(e) {
  if (!e?.extractAudio) return null;
  switch (e.audioFormat || "mp3") {
    case "aac":
      return "audio/aac";
    case "flac":
      return "audio/flac";
    case "mp3":
      return "audio/mpeg";
    case "m4a":
      return "audio/mp4";
    case "opus":
      return "audio/opus";
    case "vorbis":
      return "audio/vorbis";
    case "wav":
      return "audio/wav";
    case "alac":
      return "audio/mp4";
    default:
      return "audio/mpeg";
  }
}
function ne(e) {
  return e?.extractAudio ? e.audioFormat || "mp3" : null;
}
var C = "~ytdlp-progress-%(progress)#j";
function J(e, r = 2) {
  let t = Number(e);
  if (t === 0 || isNaN(t)) return t + " Bytes";
  let s = 1024, i = r < 0 ? 0 : r, n = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], o = Math.floor(Math.log(t) / Math.log(s));
  return parseFloat((t / Math.pow(s, o)).toFixed(i)) + " " + n[o];
}
function ke(e, r, t) {
  let s = Math.pow(t || 10, r);
  return Math.round(e * s) / s;
}
function De(e) {
  e = Number(e);
  let r = Math.floor(e / 3600), t = Math.floor(e % 3600 / 60), s = Math.floor(e % 3600 % 60), i = r > 0 ? r + (r == 1 ? " hour, " : " hours, ") : "", n = t > 0 ? t + (t == 1 ? " minute, " : " minutes, ") : "", o = s >= 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return i + n + o;
}
function m(e) {
  try {
    if (!e.includes("~ytdlp-progress-")) throw new Error();
    let r = e.trim().replace("~ytdlp-progress-", "");
    if (!r) throw new Error();
    let t = JSON.parse(r), s = (l) => {
      if (l == null || l === "NA") return;
      let f = Number(l);
      return isNaN(f) ? void 0 : f;
    }, i = s(t.downloaded_bytes), n = s(t.total_bytes) ?? s(t.total_bytes_estimate), o = s(t.speed), a = s(t.eta), u = i !== void 0 && n !== void 0 && n > 0 ? ke(100 * i / n, 2) : void 0;
    return { filename: t.filename, status: t.status, downloaded: i, downloaded_str: i !== void 0 ? J(i) : void 0, total: n, total_str: n !== void 0 ? J(n) : void 0, speed: o, speed_str: o !== void 0 ? J(o) + "/s" : void 0, eta: a, eta_str: a !== void 0 ? De(a) : void 0, percentage: u, percentage_str: u !== void 0 ? u + "%" : void 0 };
  } catch {
    return;
  }
}
function Y(e, r = {}) {
  return new Promise((t, s) => {
    let o = (new oe(e).protocol === "https:" ? Se : _e).get(e, r, (a) => {
      if (a.statusCode >= 300 && a.statusCode < 400 && a.headers.location) {
        let u = new oe(a.headers.location, e).toString();
        Y(u, r).then(t).catch(s);
        return;
      }
      t(a);
    });
    o.on("error", s), o.setTimeout(3e4, () => {
      o.destroy(), s(new Error("Request timed out"));
    });
  });
}
async function k(e, r) {
  try {
    let t = b.createWriteStream(r), s = await Y(e);
    if (s.statusCode !== 200) throw t.close(), b.unlinkSync(r), new Error(`Failed to download file: ${s.statusCode} ${s.statusMessage}`);
    let i = parseInt(s.headers["content-length"] || "0", 10), n = 0;
    return s.on("data", (o) => {
      n += o.length;
      let a = n / i * 100;
      process.stdout.write(`Progress: ${Math.round(a)}%\r`);
    }), s.pipe(t), new Promise((o, a) => {
      t.on("finish", () => {
        t.close(), console.log(`
Download complete!`), o();
      }), t.on("error", (u) => {
        t.close(), b.unlinkSync(r), a(u);
      }), s.on("error", (u) => {
        t.close(), b.unlinkSync(r), a(u);
      });
    });
  } catch (t) {
    throw b.existsSync(r) && b.unlinkSync(r), t;
  }
}
async function ae(e, r = {}) {
  let t = await Y(e, r);
  if (t.statusCode !== 200) throw new Error(`Failed to fetch text: ${t.statusCode} ${t.statusMessage}`);
  return new Promise((s, i) => {
    let n = "";
    t.setEncoding("utf8"), t.on("data", (o) => {
      n += o;
    }), t.on("end", () => s(n)), t.on("error", i);
  });
}
function Ee(e) {
  let r = e;
  for (; ; ) {
    if (ue.existsSync(D.join(r, "package.json"))) return r;
    let t = D.dirname(r);
    if (t === r) return e;
    r = t;
  }
}
var le = Ee(h);
var w = D.join(le, "bin");
var dr = D.join(le, "package.json");
var Re = "https://github.com/iqbal-rashed/ytdlp-nodejs/releases/download/ffmpeg-latest";
var q = { win32: { x64: ["win-x64-ffmpeg.exe", "win-x64-ffprobe.exe"], ia32: ["win-ia32-ffmpeg.exe", "win-ia32-ffprobe.exe"], arm64: ["win-arm64-ffmpeg.exe", "win-arm64-ffprobe.exe"] }, linux: { x64: ["linux-x64-ffmpeg", "linux-x64-ffprobe"], arm64: ["linux-arm64-ffmpeg", "linux-arm64-ffprobe"] }, darwin: { x64: ["macos-x64-ffmpeg", "macos-x64-ffprobe"], arm64: ["macos-arm64-ffmpeg", "macos-arm64-ffprobe"] }, android: { arm64: ["linux-arm64-ffmpeg", "linux-arm64-ffprobe"] } };
function fe() {
  let e = process.platform, r = process.arch;
  if (!q[e] || !q[e][r]) throw new Error(`No FFmpeg build available for platform: ${e}, architecture: ${r}`);
  return q[e][r];
}
async function G(e) {
  let r = e || w, t = F();
  if (t) return t;
  try {
    let s = fe();
    if (!s.length) throw new Error();
    let i = s.map((o) => `${Re}/${o}`), n = s.map((o) => Q.join(r, String(o.split("-").pop())));
    N.existsSync(r) || N.mkdirSync(r, { recursive: true }), console.log("Downloading FFmpeg and FFprobe...");
    for (let o = 0; o < s.length; o++) {
      let a = i[o], u = n[o];
      console.log("Downloading...", Q.basename(a)), await k(a, u);
    }
    if (process.platform !== "win32") for (let o of n) N.chmodSync(o, 493);
    return F();
  } catch (s) {
    throw console.error(`Download failed: ${s}`), s;
  }
}
function F() {
  try {
    let e = fe();
    if (!e.length) throw new Error();
    let r = Q.join(w, String(e[0].split("-").pop()));
    if (!N.existsSync(r)) throw new Error("FFmpeg binary not found. Please download it first.");
    return r;
  } catch {
    return;
  }
}
var de = "https://github.com/yt-dlp/yt-dlp/releases/latest/download";
var $ = { win32: { x64: "yt-dlp.exe", ia32: "yt-dlp_x86.exe" }, linux: { x64: "yt-dlp", armv7l: "yt-dlp_linux_armv7l", aarch64: "yt-dlp_linux_aarch64", arm64: "yt-dlp" }, darwin: { x64: "yt-dlp_macos", arm64: "yt-dlp_macos" }, android: { arm64: "yt-dlp" } };
function Te() {
  let e = process.platform, r = process.arch;
  if (!$[e] || !$[e][r]) throw new Error(`No yt-dlp build available for ${e} ${r}`);
  return $[e][r];
}
async function L(e) {
  let r = e || w, t = Te(), s = `${de}/${t}`, i = T.join(r, t);
  if (g.existsSync(i)) return i;
  console.log("Downloading yt-dlp...", s), g.existsSync(r) || g.mkdirSync(r, { recursive: true });
  try {
    return await k(s, i), console.log(`yt-dlp downloaded successfully to: ${i}`), process.platform !== "win32" && g.chmodSync(i, 493), i;
  } catch (o) {
    throw console.error(`Download failed: ${o}`), o;
  }
}
async function Ie(e) {
  return new Promise((r, t) => {
    let s = Be.createHash("sha256"), i = g.createReadStream(e);
    i.on("data", (n) => s.update(n)), i.on("end", () => r(s.digest("hex"))), i.on("error", t);
  });
}
async function Oe(e) {
  try {
    let s = (await ae(`${de}/SHA2-256SUMS`)).split(/\r?\n/).find((n) => n.includes(e));
    if (!s) return;
    let [i] = s.trim().split(/\s+/);
    return i || void 0;
  } catch {
    return;
  }
}
async function H(e) {
  let r = await L(e), t = T.basename(r), s = await Oe(t);
  if (!s) return { path: r, verified: false };
  let i = await Ie(r);
  if (i.toLowerCase() !== s.toLowerCase()) throw new Error(`Checksum mismatch for ${t}. Expected ${s}, got ${i}`);
  return { path: r, verified: true, checksum: s };
}
function I() {
  let e = process.platform, r = process.arch;
  try {
    let t = $[e][r], s = T.join(w, t);
    if (!g.existsSync(s)) throw new Error("Ytdlp binary not found. Please download it first.");
    return s;
  } catch {
    return;
  }
}
function j(e) {
  return e.replace(/~ytdlp-progress-\{[\s\S]*?\}\n?/g, "").split(/\r?\n/).map((r) => r.trim()).filter((r) => r.length > 0).filter((r) => !r.includes("__YTDLP_FILEPATH__:")).filter((r) => !r.includes("__YTDLP_VIDEO_INFO__:")).filter((r) => !r.includes("__YTDLP_BEFORE_DL__:")).join(`
`);
}
function K(e) {
  let r = [], t = e.split(/\r?\n/);
  for (let s of t) {
    let i = s.trim();
    if (i.startsWith("__YTDLP_VIDEO_INFO__:")) {
      let n = i.replace("__YTDLP_VIDEO_INFO__:", "").trim();
      try {
        let o = n.replace(/:"N\/A"/g, ":null").replace(/:"NA"/g, ":null").replace(/:""/g, ':"NA"'), a = JSON.parse(o), u = {};
        for (let [l, f] of Object.entries(a)) if (f === "NA") u[l] = null;
        else if (typeof f == "string" && f === "N/A") u[l] = null;
        else if ((l.includes("_count") || l.includes("_timestamp") || l === "autonumber" || l === "video_autonumber" || l === "n_entries" || l === "playlist_count" || l === "release_year" || l === "start_time" || l === "end_time" || l === "epoch" || l === "duration" || l === "age_limit") && typeof f == "string") {
          let d = Number(f);
          u[l] = isNaN(d) ? null : d;
        } else (l === "is_live" || l === "was_live" || l === "channel_is_verified") && typeof f == "string" ? u[l] = f === "true" || f === "True" : (l === "categories" || l === "tags" || l === "creators" || l === "cast") && typeof f == "string" ? f === "NA" || f === "N/A" || f === "" ? u[l] = null : u[l] = f.split(",").map((d) => d.trim()) : u[l] = f;
        r.push(u);
      } catch {
      }
    }
  }
  return r;
}
function y(e) {
  let r = e.trim();
  if (!r.startsWith("__YTDLP_BEFORE_DL__:")) return null;
  let t = r.replace("__YTDLP_BEFORE_DL__:", "").trim();
  try {
    let s = t.replace(/:"N\/A"/g, ":null").replace(/:"NA"/g, ":null").replace(/:""/, ':"NA"'), i = JSON.parse(s), n = {};
    for (let [o, a] of Object.entries(i)) if (a === "NA" || a === "N/A") n[o] = null;
    else if ((o.includes("_count") || o.includes("_timestamp") || o === "autonumber" || o === "video_autonumber" || o === "n_entries" || o === "playlist_count" || o === "release_year" || o === "start_time" || o === "end_time" || o === "epoch" || o === "duration" || o === "age_limit") && typeof a == "string") {
      let u = Number(a);
      n[o] = isNaN(u) ? null : u;
    } else (o === "is_live" || o === "was_live" || o === "channel_is_verified") && typeof a == "string" ? n[o] = a === "true" || a === "True" : (o === "categories" || o === "tags" || o === "creators" || o === "cast") && typeof a == "string" ? a === "NA" || a === "N/A" || a === "" ? n[o] = null : n[o] = a.split(",").map((u) => u.trim()) : n[o] = a;
    return n;
  } catch {
    return null;
  }
}
var Ve = /^ERROR:\s*(?:\[.+?\]\s*)?(.+)/m;
var Ce = [/ERROR:\s*\[.*?\]\s*.*?:\s*Sign in to confirm/i, /ERROR:\s*\[.*?\]\s*Unable to extract/i, /ERROR:\s*\[.*?\]\s*This video is unavailable/i, /ERROR:\s*\[.*?\]\s*Video unavailable/i, /ERROR:\s*\[.*?\]\s*Private video/i, /ERROR:\s*\[.*?\]\s*.*?requires premium/i, /ERROR:\s*\[.*?\]\s*This live event has ended/i, /ERROR:\s*\[.*?\]\s*.*?is not available/i, /ERROR:\s*No video formats found/i, /ERROR:\s*Unsupported URL/i];
function ce(e) {
  if (!e) return { hasError: false };
  let r = e.match(Ve);
  return r ? { hasError: true, message: r[1]?.trim(), fullError: r[0] } : { hasError: false };
}
function Ne(e) {
  return e ? Ce.some((r) => r.test(e)) : false;
}
function he(e, r) {
  let s = ce(e).message || "Unknown yt-dlp error";
  return r != null && r !== 0 && (s = `yt-dlp exited with code ${r}: ${s}`), new Error(s);
}
function A(e, r, t) {
  let { exitCodeOnly: s = false, fatalOnly: i = false } = t || {};
  if (r !== 0 && r !== null) return he(e, r);
  if (s) return;
  if (ce(e).hasError) return i && !Ne(e) ? void 0 : he(e);
}
function me({ url: e, options: r, ffmpegPath: t, withProgressTemplate: s, extra: i }) {
  let n = V(r || {});
  return t && n.push("--ffmpeg-location", t), s && n.push("--progress-template", C), i && i.length > 0 && n.push(...i), e && n.push("--", e), n;
}
var x = class extends $e {
  constructor(t, s) {
    super();
    this.binaryPath = "";
    this.videoUrl = "";
    this.extraArgs = {};
    this.rawArgs = [];
    this.videoUrl = t, this.binaryPath = s?.binaryPath || I() || "", this.ffmpegPath = s?.ffmpegPath || F(), (!this.binaryPath || !pe.existsSync(this.binaryPath)) && console.error(new Error("yt-dlp binary not found. Please install yt-dlp or specify correct binaryPath in options.")), this.ffmpegPath && !pe.existsSync(this.ffmpegPath) && console.error(new Error(`FFmpeg binary not found at: ${this.ffmpegPath}. Please install FFmpeg or specify correct ffmpegPath.`));
  }
  setBinaryPath(t) {
    return this.binaryPath = t, this;
  }
  setFfmpegPath(t) {
    return this.ffmpegPath = t, this;
  }
  format(t) {
    return this.formatValue = t, this;
  }
  filter(t) {
    let s = typeof this.formatValue == "object" ? this.formatValue : {};
    return this.formatValue = { ...s, filter: t }, this;
  }
  quality(t) {
    let s = typeof this.formatValue == "object" ? this.formatValue : {};
    return this.formatValue = { filter: this.formatValue, ...s, quality: t }, this;
  }
  type(t) {
    let s = typeof this.formatValue == "object" ? this.formatValue : {};
    return this.formatValue = { filter: this.formatValue, ...s, type: t }, this;
  }
  options(t) {
    return this.extraArgs = { ...this.extraArgs, ...t }, this;
  }
  rateLimit(t) {
    return this.extraArgs.limitRate = t, this;
  }
  cookies(t) {
    return this.extraArgs.cookies = t, this;
  }
  cookiesFromBrowser(t) {
    return this.extraArgs.cookiesFromBrowser = t, this;
  }
  proxy(t) {
    return this.extraArgs.proxy = t, this;
  }
  addOption(t, s) {
    return this.extraArgs[t] = s, this;
  }
  addArgs(...t) {
    return this.rawArgs.push(...t), this;
  }
  extractAudio(t) {
    return this.extraArgs.extractAudio = true, t && (this.extraArgs.audioFormat = t), this;
  }
  audioFormat(t) {
    return this.extraArgs.audioFormat = t, this;
  }
  audioQuality(t) {
    return this.extraArgs.audioQuality = t, this;
  }
  embedThumbnail() {
    return this.extraArgs.embedThumbnail = true, this;
  }
  embedSubs() {
    return this.extraArgs.embedSubs = true, this;
  }
  embedMetadata() {
    return this.extraArgs.embedMetadata = true, this;
  }
  writeSubs() {
    return this.extraArgs.writeSubs = true, this;
  }
  writeAutoSubs() {
    return this.extraArgs.writeAutoSubs = true, this;
  }
  subLangs(t) {
    return this.extraArgs.subLangs = t, this;
  }
  writeThumbnail() {
    return this.extraArgs.writeThumbnail = true, this;
  }
  username(t) {
    return this.extraArgs.username = t, this;
  }
  password(t) {
    return this.extraArgs.password = t, this;
  }
  playlistStart(t) {
    return this.extraArgs.playlistStart = t, this;
  }
  playlistEnd(t) {
    return this.extraArgs.playlistEnd = t, this;
  }
  playlistItems(t) {
    return this.extraArgs.playlistItems = t, this;
  }
  buildFormatArgs() {
    return this.formatValue ? B(this.formatValue) : [];
  }
  buildBaseArgs(t = []) {
    if (!this.videoUrl) throw new Error("URL is required.");
    let s = this.buildFormatArgs();
    return me({ url: this.videoUrl, options: this.extraArgs, ffmpegPath: this.ffmpegPath, withProgressTemplate: true, extra: [...s, ...t, ...this.rawArgs] });
  }
  debugPrint(t = true) {
    return this.extraArgs.debugPrintCommandLine = t, this;
  }
  getCommand() {
    let t = this.buildArgs();
    return `${this.binaryPath} ${t.join(" ")}`;
  }
  getArguments() {
    return this.buildArgs();
  }
  toString() {
    return this.getCommand();
  }
  printDebugCommandLine(t) {
    if (this.extraArgs.debugPrintCommandLine) {
      let s = `${this.binaryPath} ${t.join(" ")}`;
      console.error(`[ytdlp-nodejs] Command: ${s}`);
    }
  }
  validateBinaryPath() {
    if (!this.binaryPath) throw new Error("Binary path is required. Use .setBinaryPath() or pass it in constructor.");
  }
  kill(t) {
    return this.process?.kill(t) ?? false;
  }
  get pid() {
    return this.process?.pid;
  }
};
var ge = ["id", "title", "fulltitle", "ext", "alt_title", "description", "display_id", "uploader", "uploader_id", "uploader_url", "license", "creators", "creator", "timestamp", "upload_date", "release_timestamp", "release_date", "release_year", "modified_timestamp", "modified_date", "channel", "channel_id", "channel_url", "channel_follower_count", "channel_is_verified", "location", "duration", "duration_string", "view_count", "concurrent_view_count", "like_count", "dislike_count", "repost_count", "average_rating", "comment_count", "save_count", "age_limit", "live_status", "is_live", "was_live", "playable_in_embed", "availability", "media_type", "start_time", "end_time", "extractor", "extractor_key", "epoch", "autonumber", "video_autonumber", "n_entries", "playlist_id", "playlist_title", "playlist", "playlist_count", "playlist_index", "playlist_autonumber", "playlist_uploader", "playlist_uploader_id", "playlist_channel", "playlist_channel_id", "playlist_webpage_url", "webpage_url", "webpage_url_basename", "webpage_url_domain", "original_url", "categories", "tags", "cast", "filepath"];
function Le() {
  return `after_move:__YTDLP_VIDEO_INFO__:{${ge.map((r) => `"${r}":%(${r}|null)j`).join(",")}}`;
}
function S() {
  return `before_dl:__YTDLP_BEFORE_DL__:{${ge.map((r) => `"${r}":%(${r}|null)j`).join(",")}}`;
}
function M() {
  return ["--print", Le(), "--progress", "--newline"];
}
var _ = class extends x {
  constructor(r, t) {
    super(r, t), this.on("error", () => {
    });
  }
  on(r, t) {
    return super.on(r, t);
  }
  once(r, t) {
    return super.once(r, t);
  }
  emit(r, ...t) {
    return super.emit(r, ...t);
  }
  output(r) {
    return this.outputDir = r, this;
  }
  setOutputTemplate(r) {
    return this.outputPath = r, this;
  }
  skipDownload() {
    return this.extraArgs.skipDownload = true, this;
  }
  buildArgs() {
    let r = { ...this.extraArgs };
    this.outputDir && (r.output = `${this.outputDir}/%(title)s.%(ext)s`), this.outputPath && (r.output = this.outputPath);
    let t = this.extraArgs;
    this.extraArgs = r;
    let s = [...M()];
    this.listenerCount("beforeDownload") > 0 && s.unshift("--print", S());
    let i = this.buildBaseArgs(s);
    return this.extraArgs = t, i;
  }
  run() {
    return this.resultPromise ? this.resultPromise : (this.resultPromise = new Promise((r, t) => {
      try {
        this.validateBinaryPath();
        let s = this.buildArgs(), i = `${this.binaryPath} ${s.join(" ")}`;
        this.printDebugCommandLine(s), this.process = je(this.binaryPath, s), this.emit("start", i);
        let n = "", o = "";
        this.process.stdout?.on("data", (a) => {
          let u = a.toString();
          n += u, this.emit("stdout", u);
          let l = y(u);
          l && this.emit("beforeDownload", l);
          let f = m(u);
          f && this.emit("progress", f);
        }), this.process.stderr?.on("data", (a) => {
          let u = a.toString();
          o += u, this.emit("stderr", u);
          let l = m(u);
          l && this.emit("progress", l);
        }), this.process.on("error", (a) => {
          this.emit("error", a), t(a);
        }), this.process.on("close", (a) => {
          let u = A(o, a);
          if (u) {
            this.emit("error", u), t(u);
            return;
          }
          let l = j(n), f = K(n), d = { output: l, filePaths: f.map((p) => p?.filepath ?? "").filter(Boolean), info: f, stderr: o };
          this.emit("finish", d), r(d);
        });
      } catch (s) {
        t(s);
      }
    }), this.resultPromise);
  }
  then(r, t) {
    return this.run().then(r, t);
  }
  catch(r) {
    return this.run().catch(r);
  }
  finally(r) {
    return this.run().finally(r);
  }
};
var E = class extends x {
  constructor(t, s) {
    super(t, s);
    this.totalBytes = 0;
    this.started = false;
    this.on("error", () => {
    });
  }
  on(t, s) {
    return super.on(t, s);
  }
  once(t, s) {
    return super.once(t, s);
  }
  emit(t, ...s) {
    return super.emit(t, ...s);
  }
  buildArgs() {
    let t = ["-o", "-", "--no-playlist", "--progress", "--no-quiet"];
    return this.listenerCount("beforeDownload") > 0 && t.push("--print", S()), this.buildBaseArgs(t);
  }
  startStream() {
    if (this.started) return this.passThrough;
    this.validateBinaryPath(), this.started = true, this.passThrough = new Me();
    let t = this.buildArgs(), s = `${this.binaryPath} ${t.join(" ")}`;
    this.printDebugCommandLine(t), this.process = We(this.binaryPath, t, { shell: false }), this.emit("start", s), this.process.stdout?.on("data", (n) => {
      this.totalBytes += n.length, this.passThrough.write(n), this.emit("data", n);
    });
    let i = "";
    return this.process.stderr?.on("data", (n) => {
      let o = n.toString();
      i += o, this.emit("stderr", o);
      let a = y(o);
      a && this.emit("beforeDownload", a);
      let u = m(o);
      u && this.emit("progress", u);
    }), this.process.on("error", (n) => {
      this.emit("error", n), this.passThrough.destroy(n);
    }), this.process.on("close", (n) => {
      let o = A(i, n);
      o ? (this.emit("error", o), this.passThrough.destroy(o)) : (this.passThrough.end(), this.emit("end"));
    }), this.passThrough;
  }
  pipe(t, s) {
    let i = Date.now(), n = this.startStream();
    return new Promise((o, a) => {
      n.pipe(t, s), t.on("finish", () => {
        o({ bytes: this.totalBytes, duration: Date.now() - i });
      }), t.on("error", a), this.passThrough.on("error", a);
    });
  }
  pipeAsync(t, s) {
    return this.pipe(t, s);
  }
  async toBuffer() {
    let t = [];
    return new Promise((s, i) => {
      let n = this.startStream();
      n.on("data", (o) => {
        t.push(o);
      }), n.on("end", () => {
        s(Buffer.concat(t));
      }), n.on("error", i);
    });
  }
  getStream() {
    return this.startStream();
  }
};
var P = class extends x {
  constructor(t, s) {
    super(t, s);
    this.totalBytes = 0;
    this.started = false;
    this.output = "";
    this.on("error", () => {
    });
  }
  on(t, s) {
    return super.on(t, s);
  }
  once(t, s) {
    return super.once(t, s);
  }
  emit(t, ...s) {
    return super.emit(t, ...s);
  }
  buildArgs() {
    let t = [], s = [...M()];
    return this.listenerCount("beforeDownload") > 0 && s.unshift("--print", S()), this.listenerCount("afterDownload") > 0 && s.push("--print", "after_move:filepath"), this.buildBaseArgs([...t, ...s]);
  }
  startStream() {
    if (this.started) return this.passThrough;
    this.validateBinaryPath(), this.started = true, this.passThrough = new ze(), this.output = "";
    let t = this.buildArgs();
    t.includes("--no-playlist") || (t = ["--no-playlist", ...t]);
    let s = `${this.binaryPath} ${t.join(" ")}`;
    return this.printDebugCommandLine(t), this.process = be(this.binaryPath, t, { shell: false }), this.emit("start", s), this.process.stdout?.on("data", (i) => {
      this.totalBytes += i.length, this.passThrough.write(i), this.emit("data", i);
      let n = i.toString();
      this.emit("stdout", n);
      let o = y(n);
      o && (this.beforeDownloadInfo = o, this.emit("beforeDownload", this.beforeDownloadInfo));
      let a = m(n);
      a && this.emit("progress", a);
    }), this.process.stderr?.on("data", (i) => {
      let n = i.toString();
      this.emit("stderr", n), this.output += n;
      let o = y(n);
      o && (this.beforeDownloadInfo = o, this.emit("beforeDownload", this.beforeDownloadInfo));
      let a = m(n);
      a && (this.emit("progress", a), a.status === "finished" && this.beforeDownloadInfo && (this.afterDownloadInfo = { ...this.beforeDownloadInfo, filepath: a.filename }, this.emit("afterDownload", this.afterDownloadInfo)));
    }), this.process.on("error", (i) => {
      this.emit("error", i), this.passThrough.destroy(i);
    }), this.process.on("close", (i) => {
      let n = A(this.output, i);
      n ? (this.emit("error", n), this.passThrough.destroy(n)) : (this.passThrough.end(), this.emit("end"));
    }), this.passThrough;
  }
  pipe(t, s) {
    let i = Date.now(), n = this.startStream();
    return new Promise((o, a) => {
      n.pipe(t, s), t.on("finish", () => {
        o({ bytes: this.totalBytes, duration: Date.now() - i, info: this.afterDownloadInfo, output: this.output });
      }), t.on("error", a), this.passThrough.on("error", a);
    });
  }
  pipeAsync(t, s) {
    return this.pipe(t, s);
  }
  async toBuffer() {
    let t = [];
    return new Promise((s, i) => {
      let n = this.startStream();
      n.on("data", (o) => {
        t.push(o);
      }), n.on("end", () => {
        s(Buffer.concat(t));
      }), n.on("error", i);
    });
  }
  getStream() {
    return this.startStream();
  }
  exec() {
    return this.resultPromise ? this.resultPromise : (this.resultPromise = new Promise((t, s) => {
      try {
        this.validateBinaryPath();
        let i = this.buildArgs(), n = `${this.binaryPath} ${i.join(" ")}`;
        this.printDebugCommandLine(i), this.process = be(this.binaryPath, i, { shell: false }), this.emit("start", n);
        let o = "", a = "";
        this.process.stdout?.on("data", (u) => {
          let l = u.toString();
          o += l, this.emit("stdout", l);
          let f = y(l);
          f && (this.beforeDownloadInfo = f, this.emit("beforeDownload", this.beforeDownloadInfo)), this.emit("data", u);
          let d = m(l);
          d && (this.emit("progress", d), d.status === "finished" && this.beforeDownloadInfo && (this.afterDownloadInfo = { ...this.beforeDownloadInfo, filepath: d.filename }, this.emit("afterDownload", this.afterDownloadInfo)));
        }), this.process.stderr?.on("data", (u) => {
          let l = u.toString();
          a += l, this.emit("stderr", l);
          let f = y(l);
          f && (this.beforeDownloadInfo = f, this.emit("beforeDownload", this.beforeDownloadInfo));
          let d = m(l);
          d && (this.emit("progress", d), d.status === "finished" && this.beforeDownloadInfo && (this.afterDownloadInfo = { ...this.beforeDownloadInfo, filepath: d.filename }, this.emit("afterDownload", this.afterDownloadInfo)));
        }), this.process.on("error", (u) => {
          this.emit("error", u), s(u);
        }), this.process.on("close", (u) => {
          let l = A(a, u);
          if (l) {
            this.emit("error", l), s(l);
            return;
          }
          let f = j(o), d = K(o), p = { stdout: o, stderr: a, exitCode: u, command: n, info: d, output: f, filePaths: d.map((R) => R?.filepath ?? "").filter(Boolean) };
          this.emit("complete", p), this.emit("end"), t(p);
        });
      } catch (i) {
        s(i);
      }
    }), this.resultPromise);
  }
  run() {
    return this.exec();
  }
  then(t, s) {
    return this.exec().then(t, s);
  }
  catch(t) {
    return this.exec().catch(t);
  }
  finally(t) {
    return this.exec().finally(t);
  }
};
var we = class {
  constructor(r) {
    this.binaryPath = r?.binaryPath || I() || "", this.ffmpegPath = r?.ffmpegPath || F(), (!this.binaryPath || !X.existsSync(this.binaryPath)) && console.error(new Error("yt-dlp binary not found. Please install yt-dlp or specify correct binaryPath in options.")), this.ffmpegPath && !X.existsSync(this.ffmpegPath) && console.error(new Error(`FFmpeg binary not found at: ${this.ffmpegPath}. Please install FFmpeg or specify correct ffmpegPath.`));
  }
  async checkInstallationAsync(r) {
    return new Promise((t, s) => {
      if (r?.ffmpeg && !this.ffmpegPath) return s(new Error("FFmpeg path is not set"));
      let i = Z(this.binaryPath, ["--version"]), n = false, o = !r?.ffmpeg;
      i.on("error", () => n = false), i.on("exit", (a) => {
        if (n = a === 0, r?.ffmpeg) {
          let u = Z(this.ffmpegPath, ["-version"]);
          u.on("error", () => o = false), u.on("exit", (l) => {
            o = l === 0, t(n && o);
          });
        } else t(n);
      });
    });
  }
  checkInstallation(r) {
    if (r?.ffmpeg && !this.ffmpegPath) throw new Error("FFmpeg path is not set");
    let t = ye(this.binaryPath, ["--version"], { stdio: "ignore" }), s = r?.ffmpeg ? ye(this.ffmpegPath, ["-version"], { stdio: "ignore" }) : { status: 0 };
    return t.status === 0 && s.status === 0;
  }
  async getInfoAsync(r, t) {
    let s = await this.execAsync(r, { dumpSingleJson: true, flatPlaylist: true, ...t });
    return JSON.parse(s.output);
  }
  async execAsync(r, t) {
    let s = new P(r, { binaryPath: this.binaryPath, ffmpegPath: this.ffmpegPath }), { onData: i, onProgress: n, onBeforeDownload: o, pipeTo: a, ...u } = t || {};
    return u && s.options(u), i && s.on("stdout", i), n && s.on("progress", n), o && s.on("beforeDownload", o), a ? s.pipe(a) : s.exec();
  }
  exec(r, t) {
    let s = new P(r, { binaryPath: this.binaryPath, ffmpegPath: this.ffmpegPath });
    return t && s.options(t), s;
  }
  download(r, t) {
    let s = new _(r, { binaryPath: this.binaryPath, ffmpegPath: this.ffmpegPath }), { format: i, ...n } = t || {};
    return i && s.format(i), n && s.options(n), s;
  }
  async downloadAsync(r, t) {
    let { onProgress: s, beforeDownload: i, ...n } = t || {}, o = this.download(r, n);
    s && o.on("progress", s), i && o.on("beforeDownload", i);
    let a = await o.run();
    return { output: a.output, filePaths: a.filePaths, info: a.info };
  }
  stream(r, t) {
    let s = new E(r, { binaryPath: this.binaryPath, ffmpegPath: this.ffmpegPath }), { format: i, ...n } = t || {};
    return i && s.format(i), n && s.options(n), s;
  }
  execBuilder(r, t) {
    let s = new P(r, { binaryPath: this.binaryPath, ffmpegPath: this.ffmpegPath }), { format: i, ...n } = t || {};
    return i && s.format(i), n && s.options(n), s;
  }
  async downloadAudio(r, t = "mp3", s) {
    let i = ["aac", "flac", "mp3", "m4a", "opus", "vorbis", "wav", "alac"];
    if (!i.includes(t)) throw new Error(`Invalid audio format: ${t}. Supported: ${i.join(", ")}`);
    return this.downloadAsync(r, { ...s, extractAudio: true, audioFormat: t });
  }
  async downloadVideo(r, t = "best", s) {
    let i = ["best", "2160p", "1440p", "1080p", "720p", "480p", "360p", "240p", "144p", "highest", "lowest"];
    if (!i.includes(t)) throw new Error(`Invalid video quality: ${t}. Supported: ${i.join(", ")}`);
    let n = t === "best" ? "bestvideo+bestaudio/best" : `bestvideo[height<=${parseInt(t) || 1080}]+bestaudio/best[height<=${parseInt(t) || 1080}]`;
    return this.downloadAsync(r, { ...s, format: n });
  }
  async getSubtitles(r, t) {
    return (await this.execAsync(r, { ...t, listSubs: true, skipDownload: true })).output ? [] : [];
  }
  async getComments(r, t = 20, s) {
    let i = await this.execAsync(r, { ...s, writeComments: true, dumpSingleJson: true, skipDownload: true, extractorArgs: { youtube: [`max_comments=${t}`, "player_skip=webpage"] } });
    try {
      return JSON.parse(i.output).comments || [];
    } catch {
      return [];
    }
  }
  async getDirectUrlsAsync(r, t) {
    return (await this.getInfoAsync(r, t)).formats.map((i) => i.url);
  }
  async getFormatsAsync(r, t) {
    let s = await this.getInfoAsync(r, t);
    return { source: "json", info: s, formats: s.formats };
  }
  async getThumbnailsAsync(r) {
    return (await this.getInfoAsync(r)).thumbnails;
  }
  async getTitleAsync(r) {
    return (await this.execAsync(r, { print: "title" })).output.trim();
  }
  async getVersionAsync() {
    return (await this.execAsync("", { printVersion: true })).output.trim();
  }
  async downloadFFmpeg() {
    return G();
  }
  async getFileAsync(r, t) {
    let s, { onBeforeDownload: i, onProgress: n, filename: o, metadata: a, format: u, ...l } = t || {}, f = [], d = new Qe();
    d.on("data", (v) => f.push(Buffer.from(v)));
    let p = B(u), R = { ...l };
    if (p.length >= 2 && p[0] === "-f" && (R.format = p[1]), p.includes("--merge-output-format")) {
      let v = p.indexOf("--merge-output-format");
      R.mergeOutputFormat = p[v + 1];
    }
    await this.execAsync(r, { ...R, noPlaylist: true, pipeTo: d, onProgress: n, onBeforeDownload: (v) => {
      s = v, i?.(v);
    }, output: "-" });
    let O, W;
    u && typeof u == "object" ? (O = U(u), W = z(u)) : (O = ie(l) || "video/mp4", W = ne(l) || "mp4");
    let xe = new qe(f, { type: O }), ee = { name: o || `${s?.title || "download"}.${W}`, type: O, size: xe.size, ...a };
    return new File([Buffer.concat(f)], ee.name, { type: ee.type });
  }
  async getUrlsAsync(r, t) {
    return (await this.execAsync(r, { ...t, print: "urls" })).output.split(`
`).filter(Boolean);
  }
  async updateYtDlpAsync(r) {
    if (r?.preferBuiltIn !== false && this.binaryPath) try {
      await this.execAsync("", { update: true });
      let a = await this.getVersionAsync().catch(() => {
      });
      return { method: "built-in", binaryPath: this.binaryPath, version: a };
    } catch {
    }
    let s = r?.outDir || (this.binaryPath ? Ye.dirname(this.binaryPath) : void 0);
    if (r?.verifyChecksum !== false) {
      let a = await H(s), u = await this.getVersionAsyncUsingBinary(a.path).catch(() => {
      });
      return { method: "download", binaryPath: a.path, version: u, verified: a.verified };
    }
    let n = await L(s), o = await this.getVersionAsyncUsingBinary(n).catch(() => {
    });
    return { method: "download", binaryPath: n, version: o, verified: false };
  }
  async getVersionAsyncUsingBinary(r) {
    return new Promise((t, s) => {
      let i = Z(r, ["--version"]), n = "", o = "";
      i.stdout?.on("data", (a) => {
        n += a.toString();
      }), i.stderr?.on("data", (a) => {
        o += a.toString();
      }), i.on("close", (a) => {
        a === 0 ? t(n.trim()) : s(new Error(`Failed to get version: ${o}`));
      }), i.on("error", s);
    });
  }
};

// src/ytdlpBinary.ts
import { fileURLToPath } from "node:url";
var YTDLP_BINARY_PATH = fileURLToPath(new URL("./bin/yt-dlp", import.meta.url));

// src/ytdlpStream.ts
var ytdlp = new we({ binaryPath: YTDLP_BINARY_PATH });
var YT_EXTRACTOR_ARGS = void 0;
function extractYouTubeId(input) {
  if (!input) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/
  ];
  for (const re of patterns) {
    const m2 = input.match(re);
    if (m2) return m2[1];
  }
  return null;
}
function parseStreamExpiry(url) {
  if (!url) return null;
  const m2 = url.match(/[?&]expire=(\d{9,11})/);
  if (!m2) return null;
  const secs = parseInt(m2[1], 10);
  return Number.isFinite(secs) ? secs * 1e3 : null;
}
var VIDEO_CODEC_RANK = [
  (c) => /^(avc1|h264|h\.264)/.test(c),
  // H.264 (universal)
  (c) => /^vp0?9/.test(c),
  // VP9 (broad)
  (c) => /^vp0?8/.test(c),
  // VP8 (broad)
  (c) => /^(av01|av1)/.test(c)
  // AV1 (modern only)
];
var AUDIO_CODEC_RANK = [
  (c) => c.startsWith("mp4a") || c === "aac",
  (c) => c === "opus",
  (c) => c === "vorbis"
];
function codecRank(codec, ranks) {
  if (!codec) return ranks.length;
  const lc = codec.toLowerCase();
  for (let i = 0; i < ranks.length; i++) {
    if (ranks[i](lc)) return i;
  }
  return ranks.length;
}
function sortFormats(formats, kind) {
  return [...formats].sort((a, b2) => {
    if (kind === "video") {
      const heightDiff = (b2.height ?? 0) - (a.height ?? 0);
      if (heightDiff !== 0) return heightDiff;
      return codecRank(a.vcodec, VIDEO_CODEC_RANK) - codecRank(b2.vcodec, VIDEO_CODEC_RANK);
    }
    const abrDiff = (b2.abr ?? 0) - (a.abr ?? 0);
    if (abrDiff !== 0) return abrDiff;
    return codecRank(a.acodec, AUDIO_CODEC_RANK) - codecRank(b2.acodec, AUDIO_CODEC_RANK);
  });
}
var MAX_PREFERRED_HEIGHT = 1080;
function matchesCodec(vcodec, ranks, tier) {
  if (!vcodec) return false;
  return ranks[tier](vcodec.toLowerCase());
}
function pickBestUrl(formatsIn, allowSeparateAudio) {
  if (!Array.isArray(formatsIn) || formatsIn.length === 0) return null;
  const formats = formatsIn.filter((f) => !!f.url && !f.protocol?.includes("m3u8"));
  const combined = sortFormats(
    formats.filter((f) => f.vcodec && f.vcodec !== "none" && f.acodec && f.acodec !== "none"),
    "video"
  );
  const videoOnly = sortFormats(
    formats.filter((f) => f.vcodec && f.vcodec !== "none" && (!f.acodec || f.acodec === "none")),
    "video"
  );
  const audioOnly = sortFormats(
    formats.filter((f) => f.acodec && f.acodec !== "none" && (!f.vcodec || f.vcodec === "none")),
    "audio"
  );
  if (allowSeparateAudio && videoOnly.length > 0) {
    for (let tier = 0; tier < VIDEO_CODEC_RANK.length; tier++) {
      const candidate = videoOnly.find(
        (f) => matchesCodec(f.vcodec, VIDEO_CODEC_RANK, tier) && (f.height ?? 0) <= MAX_PREFERRED_HEIGHT
      );
      if (candidate) {
        return {
          url: candidate.url,
          audioUrl: audioOnly[0]?.url,
          quality: `${candidate.height ?? "?"}p`
        };
      }
    }
    const bestVideo = videoOnly[0];
    const combinedHeight = combined[0]?.height ?? 0;
    if ((bestVideo.height ?? 0) > combinedHeight) {
      return {
        url: bestVideo.url,
        audioUrl: audioOnly[0]?.url,
        quality: `${bestVideo.height ?? "?"}p`
      };
    }
  }
  if (combined.length > 0) {
    return { url: combined[0].url, quality: `${combined[0].height ?? "?"}p` };
  }
  if (videoOnly.length > 0) {
    return {
      url: videoOnly[0].url,
      audioUrl: audioOnly[0]?.url,
      quality: `${videoOnly[0].height ?? "?"}p`
    };
  }
  const any = formats.find((f) => f.url);
  return any ? { url: any.url, quality: "?" } : null;
}
function buildQualityLadder(formatsIn) {
  const formats = formatsIn.filter((f) => !!f.url && !f.protocol?.includes("m3u8"));
  const videoOnly = sortFormats(
    formats.filter((f) => f.vcodec && f.vcodec !== "none" && (!f.acodec || f.acodec === "none")),
    "video"
  );
  const audioOnly = sortFormats(
    formats.filter((f) => f.acodec && f.acodec !== "none" && (!f.vcodec || f.vcodec === "none")),
    "audio"
  );
  const audioUrl = audioOnly[0]?.url;
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  for (const f of videoOnly) {
    const h2 = f.height ?? 0;
    if (!h2 || seen.has(h2)) continue;
    seen.add(h2);
    result.push({
      height: h2,
      vcodec: (f.vcodec ?? "?").split(".")[0],
      videoUrl: f.url,
      audioUrl,
      label: `${h2}p`
    });
  }
  return result;
}
async function resolveYouTubeStream(videoId, opts = {}) {
  const allowSeparateAudio = opts.allowSeparateAudio !== false;
  const info = YT_EXTRACTOR_ARGS ? await ytdlp.getInfoAsync(
    `https://www.youtube.com/watch?v=${videoId}`,
    { extractorArgs: YT_EXTRACTOR_ARGS }
  ) : await ytdlp.getInfoAsync(`https://www.youtube.com/watch?v=${videoId}`);
  const formats = info.formats ?? [];
  const best = pickBestUrl(formats, allowSeparateAudio);
  if (!best) return null;
  const qualities = allowSeparateAudio ? buildQualityLadder(formats) : [];
  const title = info.title ?? "";
  const rawThumbs = info.thumbnails ?? [];
  const thumbnail = rawThumbs.length > 0 ? rawThumbs.sort((a, b2) => (b2.preference ?? 0) - (a.preference ?? 0))[0].url : info.thumbnail ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  return {
    url: best.url,
    audioUrl: best.audioUrl,
    title,
    thumbnail,
    quality: best.quality,
    qualities,
    urlExpiry: parseStreamExpiry(best.url)
  };
}

// src/ytdlpVideos.ts
var ytdlpVideos_exports = {};
__export(ytdlpVideos_exports, {
  APPROX_DATE_OPTS: () => APPROX_DATE_OPTS,
  CHANNEL_SEARCH_SP: () => CHANNEL_SEARCH_SP,
  entryToChannelMeta: () => entryToChannelMeta,
  entryToVideoMeta: () => entryToVideoMeta,
  formatSeconds: () => formatSeconds,
  formatYtdlpDate: () => formatYtdlpDate,
  isoDateFromEpoch: () => isoDateFromEpoch,
  ytdlp: () => ytdlp2
});
var ytdlp2 = new we({ binaryPath: YTDLP_BINARY_PATH });
var APPROX_DATE_OPTS = {
  extractorArgs: { youtubetab: ["approximate_date"] }
};
var CHANNEL_SEARCH_SP = "EgIQAg%3D%3D";
function formatYtdlpDate(raw) {
  if (typeof raw !== "string") return void 0;
  const m2 = /^(\d{4})(\d{2})(\d{2})$/.exec(raw);
  return m2 ? `${m2[1]}-${m2[2]}-${m2[3]}` : void 0;
}
function isoDateFromEpoch(raw) {
  const secs = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(secs) || secs <= 0) return void 0;
  const d = new Date(secs * 1e3);
  return Number.isNaN(d.getTime()) ? void 0 : d.toISOString().slice(0, 10);
}
function formatSeconds(raw) {
  const secs = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(secs) || secs <= 0) return void 0;
  const total = Math.round(secs);
  const h2 = Math.floor(total / 3600);
  const m2 = Math.floor(total % 3600 / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h2 > 0 ? `${h2}:${pad(m2)}:${pad(s)}` : `${m2}:${pad(s)}`;
}
function httpsThumb(url) {
  if (typeof url !== "string" || !url) return void 0;
  return url.startsWith("//") ? `https:${url}` : url;
}
function entryToVideoMeta(entry) {
  const thumbnail = entry.thumbnail && String(entry.thumbnail).startsWith("http") ? entry.thumbnail : `https://i.ytimg.com/vi/${entry.id}/hqdefault.jpg`;
  const releaseInfo = isoDateFromEpoch(entry.timestamp) ?? formatYtdlpDate(entry.upload_date);
  const runtime = formatSeconds(entry.duration);
  const channelName = entry.uploader || entry.channel;
  const channelUrl = entry.uploader_url || entry.channel_url;
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
      ...channelName ? [
        {
          name: channelName,
          category: "Directors",
          url: channelUrl || `https://www.youtube.com/watch?v=${entry.id}`
        }
      ] : [],
      {
        name: "YouTube",
        category: "stream",
        url: `https://www.youtube.com/watch?v=${entry.id}`
      }
    ]
  };
}
function entryToChannelMeta(entry) {
  const thumbs = Array.isArray(entry.thumbnails) ? entry.thumbnails : [];
  const avatar = httpsThumb(thumbs.length ? thumbs[thumbs.length - 1].url : "");
  return {
    id: entry.channel_id || entry.id,
    name: entry.channel || entry.title || "",
    avatar,
    subscribers: typeof entry.channel_follower_count === "number" ? entry.channel_follower_count : null,
    verified: !!entry.channel_is_verified,
    description: entry.description || "",
    url: entry.channel_url || entry.url || ""
  };
}

// src/ytmusic.ts
var ytmusic_exports = {};
__export(ytmusic_exports, {
  extractYouTubeId: () => extractYouTubeId2,
  fetchAlbum: () => fetchAlbum,
  resolveAudioStream: () => resolveAudioStream,
  searchAlbums: () => searchAlbums,
  searchArtists: () => searchArtists2,
  searchTracks: () => searchTracks,
  ytdlp: () => ytdlp3
});

// src/ytmusic-innertube.ts
var ytmusic_innertube_exports = {};
__export(ytmusic_innertube_exports, {
  searchAlbumsInnerTube: () => searchAlbumsInnerTube,
  searchArtists: () => searchArtists,
  searchSongs: () => searchSongs
});
var INNERTUBE_KEY = "AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30";
var INNERTUBE_URL = `https://music.youtube.com/youtubei/v1/search?key=${INNERTUBE_KEY}&prettyPrint=false`;
var CLIENT_CONTEXT = {
  client: {
    clientName: "WEB_REMIX",
    clientVersion: "1.20240101.01.00",
    hl: "en",
    gl: "US"
  }
};
var FILTERS = {
  songs: "EgWKAQIIAWoKEAoQAxAEEAkQBQ%3D%3D",
  albums: "EgWKAQIYAWoKEAoQAxAEEAkQBQ%3D%3D",
  artists: "EgWKAQIgAWoKEAoQAxAEEAkQBQ%3D%3D"
};
async function callInnerTube(query, filter) {
  const res = await fetch(INNERTUBE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      context: CLIENT_CONTEXT,
      query,
      params: FILTERS[filter]
    })
  });
  if (!res.ok) {
    throw new Error(`YT Music InnerTube ${res.status}: ${res.statusText}`);
  }
  return res.json();
}
function pickShelfItems(payload) {
  const sections = payload?.contents?.tabbedSearchResultsRenderer?.tabs?.[0]?.tabRenderer?.content?.sectionListRenderer?.contents ?? [];
  const shelf = sections.find((s) => s.musicShelfRenderer)?.musicShelfRenderer;
  return shelf?.contents ?? [];
}
function colRuns(item, col) {
  return item?.flexColumns?.[col]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs ?? [];
}
function colText(item, col) {
  return colRuns(item, col).map((r) => r.text || "").join("");
}
function upscaleThumb(url, size = 540) {
  if (!url) return url;
  const bump = (n) => String(Math.max(parseInt(n, 10) || 0, size));
  return url.replace(
    /=([a-z0-9-]+)$/i,
    (_m, params) => "=" + params.replace(/(^|-)w(\d+)/i, (_x, p, n) => `${p}w${bump(n)}`).replace(/(^|-)h(\d+)/i, (_x, p, n) => `${p}h${bump(n)}`).replace(/(^|-)s(\d+)/i, (_x, p, n) => `${p}s${bump(n)}`)
  );
}
function bestThumbnail(item) {
  const list = item?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails ?? [];
  return upscaleThumb(list[list.length - 1]?.url ?? list[0]?.url ?? "");
}
function durationStringToSeconds(input) {
  const parts = input.split(":").map((p) => parseInt(p, 10));
  if (parts.some((n) => Number.isNaN(n))) return 0;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}
async function searchSongs(query, limit) {
  const data = await callInnerTube(query, "songs");
  const items = pickShelfItems(data);
  const hits = [];
  for (const it of items) {
    const r = it.musicResponsiveListItemRenderer;
    if (!r) continue;
    const titleRun = colRuns(r, 0)[0];
    const videoId = titleRun?.navigationEndpoint?.watchEndpoint?.videoId;
    if (!videoId || videoId.length !== 11) continue;
    const meta = colRuns(r, 1).map((x2) => x2.text || "");
    const parts = meta.filter((s) => s && s !== " \u2022 ");
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
    hits.push({
      id: videoId,
      title: colText(r, 0),
      artist,
      album,
      duration,
      thumbnail: bestThumbnail(r) || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    });
    if (hits.length >= limit) break;
  }
  return hits;
}
async function searchAlbumsInnerTube(query, limit) {
  const data = await callInnerTube(query, "albums");
  const items = pickShelfItems(data);
  const hits = [];
  for (const it of items) {
    const r = it.musicResponsiveListItemRenderer;
    if (!r) continue;
    const browseId = r?.navigationEndpoint?.browseEndpoint?.browseId;
    if (!browseId || !browseId.startsWith("MPREb_")) continue;
    const meta = colRuns(r, 1).map((x2) => x2.text || "");
    const parts = meta.filter((s) => s && s !== " \u2022 " && s !== "Album");
    const artist = parts[0] ?? "";
    const year = parts[1] ?? "";
    hits.push({
      id: browseId,
      title: colText(r, 0),
      artist,
      year,
      thumbnail: bestThumbnail(r)
    });
    if (hits.length >= limit) break;
  }
  return hits;
}
async function searchArtists(query, limit) {
  const data = await callInnerTube(query, "artists");
  const items = pickShelfItems(data);
  const hits = [];
  for (const it of items) {
    const r = it.musicResponsiveListItemRenderer;
    if (!r) continue;
    const browseId = r?.navigationEndpoint?.browseEndpoint?.browseId;
    if (!browseId || !browseId.startsWith("UC")) continue;
    const meta = colRuns(r, 1).map((x2) => x2.text || "");
    const parts = meta.filter((s) => s && s !== " \u2022 " && s !== "Artist");
    const subscribers = parts[0] ?? "";
    hits.push({
      id: browseId,
      name: colText(r, 0),
      subscribers,
      thumbnail: bestThumbnail(r)
    });
    if (hits.length >= limit) break;
  }
  return hits;
}

// src/ytmusic.ts
var ytdlp3 = new we({ binaryPath: YTDLP_BINARY_PATH });
var AUDIO_CODEC_RANK2 = [
  (c) => c.startsWith("mp4a") || c === "aac",
  (c) => c === "opus",
  (c) => c === "vorbis",
  (c) => c === "mp3"
];
function codecRank2(codec) {
  if (!codec) return AUDIO_CODEC_RANK2.length;
  const lc = codec.toLowerCase();
  for (let i = 0; i < AUDIO_CODEC_RANK2.length; i++) {
    if (AUDIO_CODEC_RANK2[i](lc)) return i;
  }
  return AUDIO_CODEC_RANK2.length;
}
function pickBestAudio(formats) {
  const audio = formats.filter(
    (f) => !!f.url && !f.protocol?.includes("m3u8") && f.acodec && f.acodec !== "none" && (!f.vcodec || f.vcodec === "none")
  );
  if (audio.length === 0) return null;
  return [...audio].sort((a, b2) => {
    const abrDiff = (b2.abr ?? b2.tbr ?? 0) - (a.abr ?? a.tbr ?? 0);
    if (abrDiff !== 0) return abrDiff;
    return codecRank2(a.acodec) - codecRank2(b2.acodec);
  })[0];
}
function normalizeCodec(codec) {
  if (!codec) return void 0;
  if (codec.startsWith("mp4a")) return "aac";
  return codec;
}
function container(f) {
  const raw = f.container ?? f.ext;
  switch (raw) {
    case "m4a":
    case "mp4":
      return "mp4";
    case "opus":
    case "webm":
      return "webm";
    default:
      return raw ?? void 0;
  }
}
function extractYouTubeId2(input) {
  if (!input) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
    /music\.youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/
  ];
  for (const re of patterns) {
    const m2 = input.match(re);
    if (m2) return m2[1];
  }
  return null;
}
async function resolveAudioStream(videoId) {
  let info = await ytdlp3.getInfoAsync(`https://music.youtube.com/watch?v=${videoId}`).catch(() => null);
  let best = pickBestAudio(info?.formats ?? []);
  if (!best?.url) {
    info = await ytdlp3.getInfoAsync(
      `https://www.youtube.com/watch?v=${videoId}`
    );
    best = pickBestAudio(info?.formats ?? []);
  }
  if (!best?.url) return null;
  return {
    url: best.url,
    title: info?.title ?? "",
    artist: info?.artist ?? info?.uploader ?? null,
    album: info?.album ?? null,
    track: info?.track ?? null,
    duration: typeof info?.duration === "number" ? info.duration : null,
    bitrate: best.abr ? Math.round(best.abr * 1e3) : best.tbr ? Math.round(best.tbr * 1e3) : null,
    codec: normalizeCodec(best.acodec) ?? null,
    container: container(best) ?? null,
    channels: typeof best.audio_channels === "number" ? best.audio_channels : null,
    sampleRate: typeof best.asr === "number" ? best.asr : null,
    thumbnail: bestThumbnail2(info)
  };
}
function bestThumbnail2(info) {
  const thumbnails = Array.isArray(info?.thumbnails) ? info.thumbnails : [];
  if (thumbnails.length > 0) {
    const best = [...thumbnails].filter((t) => typeof t?.url === "string" && t.url.length > 0).sort(
      (a, b2) => (b2.preference ?? 0) - (a.preference ?? 0) || (b2.width ?? 0) - (a.width ?? 0)
    )[0];
    if (best?.url) return best.url;
  }
  return typeof info?.thumbnail === "string" ? info.thumbnail : null;
}
async function searchTracks(query, limit) {
  const hits = await searchSongs(query, limit);
  return hits.map((h2) => ({
    id: h2.id,
    title: h2.title,
    artist: h2.artist,
    thumbnail: h2.thumbnail || `https://i.ytimg.com/vi/${h2.id}/hqdefault.jpg`,
    duration: h2.duration,
    url: `https://music.youtube.com/watch?v=${h2.id}`,
    album: h2.album
  }));
}
async function searchAlbums(query, limit) {
  const hits = await searchAlbumsInnerTube(query, limit);
  return hits.map((h2) => ({
    id: h2.id,
    title: h2.title,
    artist: h2.artist,
    thumbnail: h2.thumbnail,
    trackCount: 0,
    // not exposed in the search shelf; fetched per-album later
    url: `https://music.youtube.com/browse/${h2.id}`,
    year: h2.year
  }));
}
async function searchArtists2(query, limit) {
  const hits = await searchArtists(query, limit);
  return hits.map((h2) => ({
    id: h2.id,
    name: h2.name,
    subscribers: h2.subscribers,
    thumbnail: h2.thumbnail
  }));
}
async function fetchAlbum(albumId) {
  const url = albumId.startsWith("http") ? albumId : `https://music.youtube.com/browse/${albumId}`;
  const playlist = await ytdlp3.getInfoAsync(url, {
    flatPlaylist: true
  });
  if (!playlist) return null;
  const tracks = (playlist.entries ?? []).filter((e) => typeof e?.id === "string" && e.id.length === 11).map((e) => ({
    id: e.id,
    title: e.title ?? "",
    artist: e.uploader ?? e.channel ?? playlist.uploader ?? "",
    thumbnail: Array.isArray(e.thumbnails) && e.thumbnails[0]?.url || e.thumbnail || playlist.thumbnail || "",
    duration: typeof e.duration === "number" ? e.duration : 0,
    url: e.webpage_url ?? `https://www.youtube.com/watch?v=${e.id}`
  }));
  return {
    id: playlist.id ?? albumId,
    title: playlist.title ?? "",
    artist: playlist.uploader ?? playlist.channel ?? "",
    thumbnail: Array.isArray(playlist.thumbnails) && playlist.thumbnails[0]?.url || playlist.thumbnail || "",
    tracks
  };
}

// src/ytmusic-discover.ts
var ytmusic_discover_exports = {};
__export(ytmusic_discover_exports, {
  fetchCommunityPlaylists: () => fetchCommunityPlaylists,
  fetchGenreContent: () => fetchGenreContent,
  fetchGenreTiles: () => fetchGenreTiles,
  fetchMoodPlaylists: () => fetchMoodPlaylists,
  fetchNewReleases: () => fetchNewReleases,
  fetchPlaylistTracks: () => fetchPlaylistTracks,
  fetchPopularAlbums: () => fetchPopularAlbums,
  fetchPopularArtists: () => fetchPopularArtists,
  fetchRelatedTracks: () => fetchRelatedTracks,
  fetchTopArtists: () => fetchTopArtists,
  fetchTrendingTracks: () => fetchTrendingTracks
});
var INNERTUBE_KEY2 = "AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30";
var INNERTUBE_URL2 = `https://music.youtube.com/youtubei/v1/browse?key=${INNERTUBE_KEY2}&prettyPrint=false`;
var CLIENT_CONTEXT2 = {
  client: {
    clientName: "WEB_REMIX",
    clientVersion: "1.20240101.01.00",
    hl: "en",
    gl: "US"
  }
};
async function callBrowse(browseId, params) {
  const res = await fetch(INNERTUBE_URL2, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      context: CLIENT_CONTEXT2,
      browseId,
      ...params ? { params } : {}
    })
  });
  if (!res.ok) {
    throw new Error(`YT Music browse ${browseId} \u2192 ${res.status}: ${res.statusText}`);
  }
  return res.json();
}
function upscaleThumb2(url, size = 540) {
  if (!url) return url;
  const bump = (n) => String(Math.max(parseInt(n, 10) || 0, size));
  return url.replace(
    /=([a-z0-9-]+)$/i,
    (_m, params) => "=" + params.replace(/(^|-)w(\d+)/i, (_x, p, n) => `${p}w${bump(n)}`).replace(/(^|-)h(\d+)/i, (_x, p, n) => `${p}h${bump(n)}`).replace(/(^|-)s(\d+)/i, (_x, p, n) => `${p}s${bump(n)}`)
  );
}
function bestThumbnailFromList(list) {
  if (!Array.isArray(list) || list.length === 0) return "";
  return upscaleThumb2(list[list.length - 1]?.url ?? list[0]?.url ?? "");
}
function bestThumbnail3(obj) {
  const lists = [
    obj?.thumbnailRenderer?.musicThumbnailRenderer?.thumbnail?.thumbnails,
    obj?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails,
    obj?.thumbnail?.thumbnails
  ];
  for (const list of lists) {
    if (Array.isArray(list) && list.length > 0) {
      return bestThumbnailFromList(list);
    }
  }
  return "";
}
function runsText(runs) {
  if (!Array.isArray(runs)) return "";
  return runs.map((r) => r?.text ?? "").join("");
}
function durationStringToSeconds2(input) {
  const parts = input.split(":").map((p) => parseInt(p, 10));
  if (parts.some((n) => Number.isNaN(n))) return 0;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}
function extractAllShelves(payload) {
  const shelves = [];
  const tabs = payload?.contents?.singleColumnBrowseResultsRenderer?.tabs ?? payload?.contents?.twoColumnBrowseResultsRenderer?.tabs ?? [];
  for (const tab of tabs) {
    const sections = tab?.tabRenderer?.content?.sectionListRenderer?.contents ?? [];
    for (const s of sections) {
      if (s.musicCarouselShelfRenderer) shelves.push(s.musicCarouselShelfRenderer);
      if (s.musicShelfRenderer) shelves.push(s.musicShelfRenderer);
      if (s.musicCardShelfRenderer) shelves.push(s.musicCardShelfRenderer);
    }
  }
  return shelves;
}
function shelfItems(shelf) {
  return shelf?.contents ?? [];
}
function readResponsiveTitle(row) {
  const fc = row?.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer;
  const runs = fc?.text?.runs ?? [];
  const text = runs.map((r) => r?.text ?? "").join("");
  let videoId = null;
  let browseId = null;
  for (const r of runs) {
    const ne2 = r?.navigationEndpoint;
    if (ne2?.watchEndpoint?.videoId) {
      videoId = ne2.watchEndpoint.videoId;
      break;
    }
    if (ne2?.browseEndpoint?.browseId) {
      browseId = ne2.browseEndpoint.browseId;
      break;
    }
  }
  return { text, videoId, browseId };
}
function readResponsiveSubtitleParts(row) {
  const fc = row?.flexColumns?.[1]?.musicResponsiveListItemFlexColumnRenderer;
  const runs = fc?.text?.runs ?? [];
  return runs.map((r) => r?.text ?? "").filter((s) => s && s !== " \u2022 " && s !== ", ");
}
function classifyItem(item) {
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
    if (browse?.browseId?.startsWith("VL") || browse?.browseId?.startsWith("OLAK") || browse?.browseId?.startsWith("FEmusic_detail"))
      return { kind: "playlist", data: { node: tworow, layout: "tworow", browse } };
    return { kind: null, data: null };
  }
  const row = item?.musicResponsiveListItemRenderer;
  if (row) {
    const playlistVideoId = row?.playlistItemData?.videoId;
    const titleInfo = readResponsiveTitle(row);
    const videoId = playlistVideoId || titleInfo.videoId;
    if (videoId && videoId.length === 11) {
      return {
        kind: "track",
        data: { node: row, layout: "row", watch: { videoId }, titleInfo }
      };
    }
    const topNav = row?.navigationEndpoint;
    const browseId = topNav?.browseEndpoint?.browseId || titleInfo.browseId || null;
    if (browseId) {
      const browse = { browseId };
      if (browseId.startsWith("MPREb_"))
        return { kind: "album", data: { node: row, layout: "row", browse, titleInfo } };
      if (browseId.startsWith("UC"))
        return { kind: "artist", data: { node: row, layout: "row", browse, titleInfo } };
      if (browseId.startsWith("VL") || browseId.startsWith("OLAK") || browseId.startsWith("FEmusic_detail"))
        return { kind: "playlist", data: { node: row, layout: "row", browse, titleInfo } };
    }
  }
  return { kind: null, data: null };
}
function pickPlaylist(node, browse, titleInfo) {
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
    thumbnail: bestThumbnail3(node)
  };
}
function pickTrack(node, watch, titleInfo) {
  if (!watch?.videoId || watch.videoId.length !== 11) return null;
  let title = "";
  let parts = [];
  if (titleInfo) {
    title = titleInfo.text || "";
    parts = readResponsiveSubtitleParts(node);
  } else {
    title = runsText(node?.title?.runs);
    const subtitleRuns = node?.subtitle?.runs ?? [];
    parts = subtitleRuns.map((r) => r?.text ?? "").filter((s) => s && s !== " \u2022 " && s !== ", ");
  }
  const artist = parts[0] ?? "";
  let album = "";
  let duration = 0;
  const last = parts[parts.length - 1];
  if (last && /^\d+:\d{2}(?::\d{2})?$/.test(last)) {
    duration = durationStringToSeconds2(last);
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
    thumbnail: bestThumbnail3(node) || `https://i.ytimg.com/vi/${watch.videoId}/hqdefault.jpg`
  };
}
function pickAlbum(node, browse, titleInfo) {
  if (!browse?.browseId) return null;
  let title = "";
  let parts = [];
  if (titleInfo) {
    title = titleInfo.text || "";
    parts = readResponsiveSubtitleParts(node).filter(
      (s) => s !== "Album" && s !== "Single" && s !== "EP"
    );
  } else {
    title = runsText(node?.title?.runs);
    const subtitleRuns = node?.subtitle?.runs ?? [];
    parts = subtitleRuns.map((r) => r?.text ?? "").filter((s) => s && s !== " \u2022 " && s !== "Album" && s !== "Single" && s !== "EP");
  }
  const artist = parts[0] ?? "";
  const year = parts.find((p) => /^\d{4}$/.test(p)) ?? "";
  if (!title) return null;
  return {
    id: browse.browseId,
    title,
    artist,
    year,
    thumbnail: bestThumbnail3(node)
  };
}
function pickArtist(node, browse, titleInfo) {
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
    thumbnail: bestThumbnail3(node)
  };
}
async function browseDiscover(browseId) {
  const data = await callBrowse(browseId);
  const shelves = extractAllShelves(data);
  const tracks = [];
  const albums = [];
  const artists = [];
  const playlists = [];
  const seenTracks = /* @__PURE__ */ new Set();
  const seenAlbums = /* @__PURE__ */ new Set();
  const seenArtists = /* @__PURE__ */ new Set();
  const seenPlaylists = /* @__PURE__ */ new Set();
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
var DISCOVER_CACHE_TTL_MS = 60 * 60 * 1e3;
var discoverCache = /* @__PURE__ */ new Map();
async function cachedBrowse(browseId) {
  const now = Date.now();
  const cached = discoverCache.get(browseId);
  if (cached && cached.expiresAt > now) return cached.value;
  const value = await browseDiscover(browseId).catch(() => ({
    tracks: [],
    albums: [],
    artists: [],
    playlists: []
  }));
  discoverCache.set(browseId, { value, expiresAt: now + DISCOVER_CACHE_TTL_MS });
  return value;
}
async function fetchTrendingTracks(limit = 30) {
  const [charts, explore] = await Promise.all([
    cachedBrowse("FEmusic_charts"),
    cachedBrowse("FEmusic_explore")
  ]);
  const merged = [...charts.tracks, ...explore.tracks];
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const t of merged) {
    if (seen.has(t.id)) continue;
    seen.add(t.id);
    out.push(t);
    if (out.length >= limit) break;
  }
  return out;
}
async function fetchNewReleases(limit = 24) {
  const data = await cachedBrowse("FEmusic_new_releases");
  return data.albums.slice(0, limit);
}
async function fetchTopArtists(limit = 20) {
  const data = await cachedBrowse("FEmusic_charts");
  return data.artists.slice(0, limit);
}
async function fetchPopularAlbums(limit = 24) {
  const [explore, newReleases] = await Promise.all([
    cachedBrowse("FEmusic_explore"),
    cachedBrowse("FEmusic_new_releases")
  ]);
  const merged = [...explore.albums, ...newReleases.albums];
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const a of merged) {
    if (seen.has(a.id)) continue;
    seen.add(a.id);
    out.push(a);
    if (out.length >= limit) break;
  }
  return out;
}
async function fetchPopularArtists(limit = 24) {
  const [charts, explore] = await Promise.all([
    cachedBrowse("FEmusic_charts"),
    cachedBrowse("FEmusic_explore")
  ]);
  const merged = [...charts.artists, ...explore.artists];
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const a of merged) {
    if (seen.has(a.id)) continue;
    seen.add(a.id);
    out.push(a);
    if (out.length >= limit) break;
  }
  return out;
}
async function fetchMoodPlaylists(limit = 16) {
  const data = await cachedBrowse("FEmusic_moods_and_genres");
  return data.playlists.slice(0, limit);
}
async function fetchCommunityPlaylists(limit = 16) {
  const [charts, explore] = await Promise.all([
    cachedBrowse("FEmusic_charts"),
    cachedBrowse("FEmusic_explore")
  ]);
  const merged = [...charts.playlists, ...explore.playlists];
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const p of merged) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    out.push(p);
    if (out.length >= limit) break;
  }
  return out;
}
async function fetchGenreTiles() {
  const now = Date.now();
  const cached = genreTilesCache;
  if (cached && cached.expiresAt > now) return cached.value;
  const data = await callBrowse("FEmusic_moods_and_genres").catch(() => null);
  if (!data) {
    const empty = { value: [], expiresAt: now + DISCOVER_CACHE_TTL_MS };
    genreTilesCache = empty;
    return [];
  }
  const tiles = [];
  const seen = /* @__PURE__ */ new Set();
  const sections = data?.contents?.singleColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer?.content?.sectionListRenderer?.contents ?? [];
  for (const s of sections) {
    const items = s?.gridRenderer?.items ?? [];
    for (const it of items) {
      const r = it?.musicNavigationButtonRenderer;
      if (!r) continue;
      const name = runsText(r?.buttonText?.runs) || r?.buttonText?.simpleText;
      const browse = r?.clickCommand?.browseEndpoint;
      const browseId = browse?.browseId;
      const params = browse?.params;
      if (!name || !browseId || !params) continue;
      const key = `${browseId}:${params}`;
      if (seen.has(key)) continue;
      seen.add(key);
      tiles.push({ name, browseId, params });
    }
  }
  genreTilesCache = { value: tiles, expiresAt: now + DISCOVER_CACHE_TTL_MS };
  return tiles;
}
var genreTilesCache = null;
async function fetchGenreContent(browseId, params) {
  const cacheKey = `genre:${browseId}:${params}`;
  const now = Date.now();
  const cached = discoverCache.get(cacheKey);
  if (cached && cached.expiresAt > now) return cached.value;
  const data = await callBrowse(browseId, params).catch(() => null);
  if (!data) {
    const empty = {
      tracks: [],
      albums: [],
      artists: [],
      playlists: []
    };
    discoverCache.set(cacheKey, { value: empty, expiresAt: now + DISCOVER_CACHE_TTL_MS });
    return empty;
  }
  const shelves = extractAllShelves(data);
  const tracks = [];
  const albums = [];
  const artists = [];
  const playlists = [];
  const seenTracks = /* @__PURE__ */ new Set();
  const seenAlbums = /* @__PURE__ */ new Set();
  const seenArtists = /* @__PURE__ */ new Set();
  const seenPlaylists = /* @__PURE__ */ new Set();
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
async function fetchPlaylistTracks(browseId, limit = 100) {
  const data = await callBrowse(browseId).catch(() => null);
  if (!data) return { title: "", thumbnail: "", tracks: [] };
  const header = data?.header?.musicDetailHeaderRenderer ?? data?.header?.musicEditablePlaylistDetailHeaderRenderer?.header?.musicDetailHeaderRenderer ?? data?.header?.musicResponsiveHeaderRenderer ?? {};
  const title = runsText(header?.title?.runs) || header?.title?.simpleText || runsText(data?.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]?.musicResponsiveHeaderRenderer?.title?.runs);
  const thumbnail = bestThumbnail3(header);
  const tabs = data?.contents?.singleColumnBrowseResultsRenderer?.tabs ?? data?.contents?.twoColumnBrowseResultsRenderer?.tabs ?? [];
  let trackItems = [];
  for (const tab of tabs) {
    const sections = tab?.tabRenderer?.content?.sectionListRenderer?.contents ?? [];
    for (const s of sections) {
      const items = s?.musicPlaylistShelfRenderer?.contents;
      if (Array.isArray(items) && items.length > 0) {
        trackItems = items;
        break;
      }
    }
    if (trackItems.length > 0) break;
  }
  const tracks = [];
  const seen = /* @__PURE__ */ new Set();
  for (const it of trackItems) {
    const r = it?.musicResponsiveListItemRenderer;
    if (!r) continue;
    const titleRun = r?.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.[0];
    const videoId = titleRun?.navigationEndpoint?.watchEndpoint?.videoId;
    if (!videoId || videoId.length !== 11 || seen.has(videoId)) continue;
    seen.add(videoId);
    const trackTitle = runsText(
      r?.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs
    );
    const subRuns = r?.flexColumns?.[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs ?? [];
    const parts = subRuns.map((x2) => x2?.text ?? "").filter((s) => s && s !== " \u2022 ");
    const artist = parts[0] ?? "";
    const album = parts.slice(1).join(" ");
    const durStr = r?.fixedColumns?.[0]?.musicResponsiveListItemFixedColumnRenderer?.text?.runs?.[0]?.text;
    const duration = durStr ? durationStringToSeconds2(durStr) : 0;
    const thumb = bestThumbnail3(r) || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    tracks.push({
      id: videoId,
      title: trackTitle,
      artist,
      album,
      duration,
      thumbnail: thumb
    });
    if (tracks.length >= limit) break;
  }
  return { title: title || "", thumbnail, tracks };
}
async function fetchRelatedTracks(seedVideoId, limit = 10) {
  const NEXT_URL = `https://music.youtube.com/youtubei/v1/next?key=${INNERTUBE_KEY2}&prettyPrint=false`;
  try {
    const res = await fetch(NEXT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        context: CLIENT_CONTEXT2,
        videoId: seedVideoId,
        // RDAMVM<videoId> is the canonical "video radio" playlist; YT Music
        // builds the auto-play queue from it.
        playlistId: `RDAMVM${seedVideoId}`,
        params: "wAEB"
      })
    });
    if (!res.ok) return [];
    const data = await res.json();
    const queue = data?.contents?.singleColumnMusicWatchNextResultsRenderer?.tabbedRenderer?.watchNextTabbedResultsRenderer?.tabs?.[0]?.tabRenderer?.content?.musicQueueRenderer?.content?.playlistPanelRenderer?.contents ?? [];
    const out = [];
    const seen = /* @__PURE__ */ new Set([seedVideoId]);
    for (const it of queue) {
      const r = it?.playlistPanelVideoRenderer;
      if (!r) continue;
      const videoId = r?.navigationEndpoint?.watchEndpoint?.videoId;
      if (!videoId || videoId.length !== 11) continue;
      if (seen.has(videoId)) continue;
      seen.add(videoId);
      const title = runsText(r?.title?.runs);
      const byLineRuns = r?.longBylineText?.runs ?? r?.shortBylineText?.runs ?? [];
      const parts = byLineRuns.map((x2) => x2?.text ?? "").filter((s) => s && s !== " \u2022 ");
      const artist = parts[0] ?? "";
      const album = parts[1] ?? "";
      const duration = durationStringToSeconds2(
        runsText(r?.lengthText?.runs) || ""
      );
      const thumbList = r?.thumbnail?.thumbnails ?? r?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails;
      out.push({
        id: videoId,
        title,
        artist,
        album,
        duration,
        thumbnail: bestThumbnailFromList(thumbList ?? []) || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      });
      if (out.length >= limit) break;
    }
    return out;
  } catch {
    return [];
  }
}

// src/plugin.ts
var manifest = { id: "rewind.conduit", kind: "videos" };
function register() {
  return { ytdlpStream: ytdlpStream_exports, ytdlpVideos: ytdlpVideos_exports, ytmusic: ytmusic_exports, ytmusicDiscover: ytmusic_discover_exports, ytmusicInnertube: ytmusic_innertube_exports };
}
export {
  manifest,
  register
};
