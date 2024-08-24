const STATIC_CACHE_NAME = 'pwa-v-2';

const ASSETS_URL = [
    'index.html',
    'offline.html'
];

self.addEventListener('install', async (event) => {
    console.log('installed')
    const cache = await caches.open(STATIC_CACHE_NAME);
    self.skipWaiting();
    await cache.addAll(ASSETS_URL);
});

self.addEventListener('activate',  async (event) => {
    console.log('activated');
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames
            .filter((name) => name !== STATIC_CACHE_NAME)
            .map(name => caches.delete(name))
    );

});

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(req) {
    const cached = await caches.match(req);
    return cached ?? await fetch(req);
}
