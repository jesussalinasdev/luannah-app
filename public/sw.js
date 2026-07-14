self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Basic pass-through to satisfy PWA requirements
  event.respondWith(fetch(event.request));
});
