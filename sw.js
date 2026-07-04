const BASE = new URL('./', self.location.href).href
const CACHE_NAME = 'love-story-v3'

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        BASE,
        BASE + 'index.html',
        BASE + 'manifest.json',
        BASE + 'icon-192x192.png',
        BASE + 'icon-512x512.png',
        BASE + 'icon-heart.svg',
      ]).catch(() => {})
    )
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((resp) => {
        if (resp.ok) {
          const clone = resp.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
        }
        return resp
      })
      .catch(() => caches.match(event.request))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
      ),
      clients.claim(),
    ])
  )
})
