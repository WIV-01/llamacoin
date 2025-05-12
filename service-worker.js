// service-worker.js
self.addEventListener('install', (event) => {
  console.log('LLAMACOIN service worker installed.');
});

self.addEventListener('fetch', (event) => {
  // Let network handle it for now; can be cached later
});
