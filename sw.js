self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const CACHE_NAME = 'my-game-center-v1.1.4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './OURGAMES.png',
  './MY-GAME-CENTER.png',
  './about/aboutthissite.html',
  './about/gamesguide.html',
  './games/minesearcher.html',
  './games/fruitbounceharvest.html',
  './games/neonblockpuzzle.html',
  './games/neonjewelslide.html',
  './games/pegjump.html',
  './games/snakesandladders.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
