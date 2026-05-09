const CACHE = 'mercado-facil-v2';
const ASSETS_CACHE = 'mercado-facil-assets-v2';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE && k !== ASSETS_CACHE)
            .map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  // Assets estáticos (JS, CSS, fontes, imagens) — Cache First
  if (
    url.pathname.startsWith('/build/') ||
    request.destination === 'font' ||
    request.destination === 'image'
  ) {
    e.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(ASSETS_CACHE).then((c) => c.put(request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  // Chamadas de API — NetworkFirst com fallback para cache
  if (url.pathname.startsWith('/api/')) {
    e.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(request, clone));
          }
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Navegação de página — NetworkFirst com fallback para última versão em cache
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(request, clone));
          }
          return res;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match('/purchase-lists'))
        )
    );
    return;
  }
});
