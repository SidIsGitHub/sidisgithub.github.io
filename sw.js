const CACHE_NAME = "vsync-v5"; // <--- CHANGE THIS NUMBER TO v3, v4, etc. on every update
const assets = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

// 1. Install: Cache files
self.addEventListener("install", (e) => {
    self.skipWaiting(); // 🚀 FORCE ACTIVE IMMEDIATELY
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assets);
        })
    );
});

// 2. Activate: Clean up old caches
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key); // Delete old v1 cache
                    }
                })
            );
        }).then(() => self.clients.claim()) //Take control of all pages immediately
    );
});

// 3. Fetch: Cache First, Network Fallback
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request);
        })
    );
});