const VERSION = 'v1.1.1';
const PRECACHE = `precache-${VERSION}`;
const RUNTIME = `runtime-${VERSION}`;
const RUNTIME_MAX_ENTRIES = 100;
const RUNTIME_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

const CORE_ASSETS = [
  '/',
  '/offline',
  '/manifest.webmanifest',
  '/fonts/AirbnbCereal_W_Bd.otf',
  '/fonts/Inter-VariableFont_opsz,wght.ttf',
  '/fonts/Montserrat-Regular.ttf',
  '/icons/icon-16x16.webp',
  '/icons/icon-32x32.webp',
  '/icons/icon-48x48.webp',
  '/icons/icon-64x64.webp',
  '/icons/icon-72x72.webp',
  '/icons/icon-76x76.webp',
  '/icons/icon-96x96.webp',
  '/icons/icon-114x114.webp',
  '/icons/icon-120x120.webp',
  '/icons/icon-128x128.webp',
  '/icons/icon-144x144.webp',
  '/icons/icon-152x152.webp',
  '/icons/icon-180x180.webp',
  '/icons/icon-192x192.webp',
  '/icons/icon-196x196.webp',
  '/icons/icon-228x228.webp',
  '/icons/icon-256x256.webp',
  '/icons/icon-384x384.webp',
  '/icons/icon-512x512.webp',
  '/apple-touch-icon.webp',
  '/icon.avif',
  '/icon.png',
  '/icon.svg',
  '/icon.webp',
  '/favicon.ico',
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== PRECACHE && key !== RUNTIME).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Helper: prune runtime cache by age and max entries
async function pruneRuntimeCache() {
  const cache = await caches.open(RUNTIME);
  const requests = await cache.keys();
  const now = Date.now();

  const entries = [];
  for (const req of requests) {
    const res = await cache.match(req);
    const fetchedTime = res && res.headers.get('SW-Fetched-Time');
    entries.push({ req, time: fetchedTime ? parseInt(fetchedTime) : 0 });
  }

  // Remove old entries by age
  for (const entry of entries) {
    if (now - entry.time > RUNTIME_MAX_AGE) {
      await cache.delete(entry.req);
    }
  }

  // Remove excess entries beyond max entries
  entries.sort((a, b) => a.time - b.time);
  while (entries.length > RUNTIME_MAX_ENTRIES) {
    const entry = entries.shift();
    if (entry) await cache.delete(entry.req);
  }
}

// Fetch
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (CORE_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request)
          .then((response) => {
            caches.open(PRECACHE).then((cache) => cache.put(request, response.clone()));
            return response;
          })
          .catch(() => cached);

        return cached || networkFetch;
      })
    );
  } else if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('/offline')));
  } else {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request)
          .then(async (response) => {
            const cloned = response.clone();
            const headers = new Headers(cloned.headers);
            headers.set('SW-Fetched-Time', Date.now().toString());
            const modifiedResponse = new Response(await cloned.blob(), { headers });
            const cache = await caches.open(RUNTIME);
            await cache.put(request, modifiedResponse);
            await pruneRuntimeCache();
            return response;
          })
          .catch(() => {});
      })
    );
  }
});

// Skip waiting via client message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
