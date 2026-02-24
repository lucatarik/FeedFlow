/* FeedFlow Service Worker v1.4 */
const CACHE_NAME = 'feedflow-v1.4';
const STATIC_ASSETS = ['./index.html', './manifest.json'];
const PROXY_URLS = ['https://corsproxy.io/', 'https://api.allorigins.win/raw?url='];

// ── Install ──────────────────────────────────────────────────────────────────
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS).catch(() => {}))
  );
});

// ── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── Fetch Strategy ───────────────────────────────────────────────────────────
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Cache-first for static assets
  if (STATIC_ASSETS.some(a => url.pathname.endsWith(a.replace('./', '')))) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      }))
    );
    return;
  }
  // Network-first for RSS/API calls
  if (PROXY_URLS.some(p => e.request.url.startsWith(p))) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  // Default: network then cache
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// ── Periodic Background Sync ──────────────────────────────────────────────────
self.addEventListener('periodicsync', e => {
  if (e.tag === 'feedflow-refresh') {
    e.waitUntil(backgroundRefresh());
  }
});

async function backgroundRefresh() {
  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  clients.forEach(client => client.postMessage({ type: 'BG_REFRESH' }));
  // If no clients open, store a flag to refresh on next open
  if (clients.length === 0) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put('__bg_refresh_pending__', new Response('1'));
  }
}

// ── Message Handler ───────────────────────────────────────────────────────────
self.addEventListener('message', async e => {
  if (e.data?.type === 'CHECK_PENDING') {
    const cache = await caches.open(CACHE_NAME);
    const pending = await cache.match('__bg_refresh_pending__');
    if (pending) {
      await cache.delete('__bg_refresh_pending__');
      e.source.postMessage({ type: 'BG_REFRESH' });
    }
  }
  if (e.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
