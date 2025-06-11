/// <reference lib="webworker" />

const CACHE_NAME = "Kargo_v1";
const DYNAMIC_CACHE_NAME = `Kargo_dynamic_v1`;
const DYNAMIC_CACHE_LIMIT = 50;
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

function isCoreAsset(request) {
  const url = new URL(request.url);
  return CORE_ASSETS.includes(url.pathname);
}

async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    await limitCacheSize(cacheName, maxItems);
  }
}

async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(CORE_ASSETS);
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.warn("[SW] Cache-first fetch failed:", error);
    return await cache.match("/offline");
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request)
    .then(async (response) => {
      if (response && response.status === 200) {
        await cache.put(request, response.clone());
        await limitCacheSize(DYNAMIC_CACHE_NAME, DYNAMIC_CACHE_LIMIT);
      }
      return response;
    })
    .catch((error) => {
      console.warn("[SW] Network fetch failed:", error);
      return null;
    });
  return cached || fetchPromise;
}

self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");
  event.waitUntil(cacheCoreAssets());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== DYNAMIC_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
      self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET") {
    return;
  }
  if (url.origin === self.location.origin) {
    if (isCoreAsset(event.request)) {
      event.respondWith(cacheFirst(event.request));
    } else {
      event.respondWith(
        (async () => {
          const cached = await caches
            .open(DYNAMIC_CACHE_NAME)
            .then((c) => c.match(event.request));
          if (cached) {
            event.waitUntil(staleWhileRevalidate(event.request));
            return cached;
          } else {
            try {
              const response = await fetch(event.request);
              if (response && response.status === 200) {
                const cache = await caches.open(DYNAMIC_CACHE_NAME);
                await cache.put(event.request, response.clone());
                await limitCacheSize(DYNAMIC_CACHE_NAME, DYNAMIC_CACHE_LIMIT);
              }
              return response;
            } catch (error) {
              console.warn("[SW] Dynamic fetch failed:", error);
              return await caches.match("/offline");
            }
          }
        })()
      );
    }
  }
});
