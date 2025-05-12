const CACHE_NAME = 'llamacoin-cache-v1';
const ASSETS_TO_CACHE = [
  '/', // default root
  '/index.html',
  '/css/style.css',
  '/images/llamacoin_logo_200x200.png',
  '/images/favicon-32x32.png',
  '/images/apple-touch-icon.png',
  '/script.js',
  '/manifest.json'
];

// Install Service Worker and cache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✅ Caching assets for LLAMACOIN...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('🧹 Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch assets: serve from cache first, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Serve from cache or fallback to network
      return response || fetch(event.request);
    }).catch(() => {
      // Optional: fallback HTML page or image if offline
      return caches.match('/index.html');
    })
  );
});
