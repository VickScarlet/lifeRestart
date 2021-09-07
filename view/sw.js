var CACHE_VERSION = 'sw_v1';

var CACHE_FILES = [
  '/',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION)
    .then(cache => cache.addAll(CACHE_FILES)
      .then(() => self.skipWaiting())
    ));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key, i) {
        if (key !== CACHE_VERSION) {
          return caches.delete(keys[i]);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {});