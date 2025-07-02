/// <reference lib="webworker" />

const CACHE_NAME = "Kargo_v0.2.0";
const CORE_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/fonts/AirbnbCereal_W_Bd.otf",
  "/fonts/Inter-VariableFont_opsz,wght.ttf",
  "/fonts/Montserrat-Regular.ttf",
  "/icons/icon-16x16.webp",
  "/icons/icon-32x32.webp",
  "/icons/icon-48x48.webp",
  "/icons/icon-64x64.webp",
  "/icons/icon-72x72.webp",
  "/icons/icon-76x76.webp",
  "/icons/icon-96x96.webp",
  "/icons/icon-114x114.webp",
  "/icons/icon-120x120.webp",
  "/icons/icon-128x128.webp",
  "/icons/icon-144x144.webp",
  "/icons/icon-152x152.webp",
  "/icons/icon-180x180.webp",
  "/icons/icon-192x192.webp",
  "/icons/icon-196x196.webp",
  "/icons/icon-228x228.webp",
  "/icons/icon-256x256.webp",
  "/icons/icon-384x384.webp",
  "/icons/icon-512x512.webp",
  "/apple-touch-icon.webp",
  "/icon.avif",
  "/icon.png",
  "/icon.svg",
  "/icon.webp",
  "/favicon.ico",
];

// Pre-cache only the specified static files
self.addEventListener("install", (event) => {
  console.log("[SW] Installing and caching core assets...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// Clear old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating and cleaning old caches...");
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
      )
  );
  self.clients.claim();
});

// Serve only the pre-cached assets. Never cache anything else.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle GET requests from our origin
  if (event.request.method !== "GET" || url.origin !== self.location.origin)
    return;

  // Serve core assets if matched
  if (CORE_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches
        .match(event.request)
        .then((cached) => cached || fetch(event.request))
    );
  }

  // Fallback to /offline for navigation if offline
  else if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/offline"))
    );
  }

  // Otherwise, do nothing — let the browser handle it (no caching)
});
