const CACHE_NAME = "vsync-v1";
const assets = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(assets)));
});

self.addEventListener("fetch", (e) => {
    e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
self.addEventListener("install", (e) => {
    self.skipWaiting(); // 🚀 Forces the new service worker to become active immediately
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(assets)));
});

self.addEventListener("activate", (e) => {
    e.waitUntil(clients.claim()); // 🚀 Forces the new worker to take control of the page instantly
});
