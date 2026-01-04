
const CACHE_NAME = 'adquest-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap'
];

// Install: Cache static shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[AdQuest SW] Pre-caching Core Shell');
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[AdQuest SW] Static asset caching partially failed (usually due to origin):', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Strategy - Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip browser extensions and other non-standard schemes
  if (!(event.request.url.indexOf('http') === 0)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Cache successful responses for our assets and CDN resources
        if (networkResponse && networkResponse.status === 200) {
          const isInternal = event.request.url.startsWith(self.location.origin);
          const isCDN = event.request.url.includes('cdn.') || event.request.url.includes('fonts.');
          
          if (isInternal || isCDN) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
        }
        return networkResponse;
      }).catch(() => {
        // If network fails, return cached response if available
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
