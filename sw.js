// Service Worker for EduCode PWA
const CACHE_NAME = 'educode-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/index.js',
  '/course.html',
  '/practice.html',
  '/dashboard.html',
  '/leaderboard.html',
  '/faq.html',
  '/courses_dsa.html',
  '/courses_webd.html',
  '/courese_dbms.html',
  '/courses_python.html',
  '/demo.html'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
