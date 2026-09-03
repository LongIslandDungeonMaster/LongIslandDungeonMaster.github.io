/* Gnasher's Satchel service worker - cache-first of the app itself so a phone
   opens it with no signal after the first visit. Cache key is version-locked to
   the build, so a new deploy replaces the old copy on next load. */
const CACHE = "satchel-2026-09-03.3-12fbed1a";
const ASSETS = ["./players-satchel.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => {
  /* v35 (adversary F1): under the live origin's Cache-Control: max-age=600 a launch inside ten minutes
     of a push installed the NEW worker with the OLD html read from the HTTP cache, and that stale copy
     sat in the bucket named for the new build until the next release. Bypass the HTTP cache here. */
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, {cache: "reload"})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(
    ks.filter(k => k !== CACHE).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // relay + WebRTC traffic go straight out
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request.url, {cache: "no-cache", credentials: "same-origin"}).catch(() => caches.match("./players-satchel.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
