const CACHE_NAME = 'llamacoin-cache-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './css/style.css',
  './script.js',
  './manifest.json',
  './offline.html', // ✅ Add offline page
  './burn_tracker.html',
  './images/llamacoin_logo_200x200.png',
  './images/favicon-32x32.png',
  './images/apple-touch-icon.png'
];

// ✅ Install event – Cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ✅ Activate event – Cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ✅ Fetch event – Serve cache, fallback to network or offline.html
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match('./offline.html')
      )
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) =>
        response || fetch(event.request)
      )
    );
  }
});
