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
      .then((cache) => Promise.allSettled(CORE_ASSETS.map((asset) => cache.add(asset))))
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

// Runtime cache pruning
async function pruneRuntimeCache() {
  const cache = await caches.open(RUNTIME);
  const requests = await cache.keys();
  const now = Date.now();

  let entries = await Promise.all(
    requests.map(async (req) => {
      const res = await cache.match(req);
      const fetchedTime = res?.headers.get('SW-Fetched-Time');
      return { req, time: fetchedTime ? parseInt(fetchedTime) : 0 };
    })
  );

  // Remove old entries by age
  await Promise.all(
    entries.map(async (entry) => {
      if (now - entry.time > RUNTIME_MAX_AGE) {
        await cache.delete(entry.req);
        entry.deleted = true;
      }
    })
  );

  // Filter out deleted entries
  entries = entries.filter((entry) => !entry.deleted);

  // Remove excess entries beyond max entries
  entries.sort((a, b) => a.time - b.time);
  while (entries.length > RUNTIME_MAX_ENTRIES) {
    const entry = entries.shift();
    if (entry) await cache.delete(entry.req);
  }
}

// Fetch handler
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Core assets: cache-first
  if (CORE_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              caches.open(PRECACHE).then((cache) => cache.put(request, response.clone()));
            }
            return response;
          })
          .catch((err) => {
            console.error('Fetch failed for core asset:', request.url, err);
            return cached || caches.match('/offline') || new Response('Service unavailable', { status: 503 });
          });

        return cached || networkFetch;
      })
    );
  }
  // Navigation requests: network-first, fallback offline
  else if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch((err) => {
        console.error('Navigation fetch failed:', request.url, err);
        return caches.match('/offline') || new Response('Offline', { status: 503 });
      })
    );
  }
  // Other runtime requests: network-first, runtime cache
  else {
    event.respondWith(
      caches.match(request).then(async (cached) => {
        if (cached) return cached;

        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            const cloned = response.clone();
            const headers = new Headers(cloned.headers);
            headers.set('SW-Fetched-Time', Date.now().toString());
            const modifiedResponse = new Response(await cloned.blob(), { headers });
            const cache = await caches.open(RUNTIME);
            await cache.put(request, modifiedResponse);
            await pruneRuntimeCache();
          }
          return response;
        } catch (err) {
          console.error('Runtime fetch failed:', request.url, err);
          return caches.match('/offline') || new Response('Service unavailable', { status: 503 });
        }
      })
    );
  }
});

// Skip waiting via client message
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
