/* Gnasher's Satchel service worker - cache-first of the app itself so a phone
   opens it with no signal after the first visit. Cache key is version-locked to
   the build, so a new deploy replaces the old copy on next load. */
const CACHE = "satchel-2026-11-18.1-dc7cf8bc";
const ASSETS = ["./players-satchel.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => {
  /* read past the HTTP cache: the site's pages may be cached for ten minutes, and a launch inside that
     window would otherwise put the previous release's html into the cache named for this one. */
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
