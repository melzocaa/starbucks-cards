const CACHE_NAME = 'haruy-cache-v8';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './assets/images/logo.png',
    './assets/images/logopwastar.png',
    './assets/images/logopwastar512.png',
    './assets/images/img1.png',
    './assets/images/whatsapp.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Preparando o Café no Cache! ☕');
            return cache.addAll(ASSETS);
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
        caches.keys().then((keys) => {
            return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});