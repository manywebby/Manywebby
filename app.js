let count = 0;
function increment() {
    count++;
    document.getElementById('counter').innerText = count;
}

const CACHE_NAME = "my-pwa-cache-v1";
const urlsToCache = [
  "/index.html",
  "/style.css",
  "/app.js"
];

// Install service worker and cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve cached content when offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
