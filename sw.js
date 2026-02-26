const CACHE_NAME = 'my-game-center-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './OURGAMES.png',
  './games/minesearcher.html',
  './games/fruitbounceharvest.html',
  './games/neonblockpuzzle.html',
  './games/neonjewelslide.html',
  './games/pegjump.html',
  './games/snakesandladders.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching files...');
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