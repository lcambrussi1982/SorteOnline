/* Cambrussi Systems — SW básico para GitHub Pages
 * Estratégias:
 * - Precache do shell (install)
 * - Cache-first p/ imagens e fontes
 * - Stale-while-revalidate p/ CSS/JS
 * - Fallback offline p/ páginas
 */
const VERSION = 'v1.0.0';
const PRECACHE = `precache-${VERSION}`;
const RUNTIME  = `runtime-${VERSION}`;

const PRECACHE_URLS = [
  './',                // GitHub Pages serve index.html
  './index.html',
  './styles.css',
  './script.js',
  './baralho.js',
  './logo.png',
  './icon.svg',
  './favicon.ico',
  './apple-touch-icon.png',
  './og-image.png',
  './site.webmanifest',
  './offline.html'     // crie esse arquivo (modelo abaixo)
];

// Instala e pré-cacheia o shell
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(PRECACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

// Ativa e limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => k !== PRECACHE && k !== RUNTIME)
        .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

// Utilitários de estratégia
const isSameOrigin = (url) => new URL(url, self.location.href).origin === self.location.origin;

async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(request, { ignoreVary: true });
  if (cached) return cached;
  try {
    const response = await fetch(request, { credentials: 'same-origin' });
    // Clona e guarda se ok
    if (response && (response.status === 200 || response.type === 'opaque')) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    // offline fallback para imagens ou páginas
    const accept = request.headers.get('accept') || '';
    if (accept.includes('text/html')) {
      const off = await caches.match('./offline.html');
      if (off) return off;
    }
    throw err;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(request, { ignoreVary: true });
  const networkPromise = fetch(request, { credentials: 'same-origin' })
    .then((res) => {
      if (res && res.status === 200) cache.put(request, res.clone());
      return res;
    })
    .catch(() => null);
  return cached || networkPromise || fetch(request);
}

// Roteamento simples por tipo/origem
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Só trata GET
  if (request.method !== 'GET') return;

  // Google Fonts
  if (url.origin === 'https://fonts.googleapis.com') {
    // CSS dos fonts: SWR
    return event.respondWith(staleWhileRevalidate(request));
  }
  if (url.origin === 'https://fonts.gstatic.com') {
    // Arquivos de fonte: Cache First (responses opacas são ok)
    return event.respondWith(cacheFirst(request));
  }

  // Mesmo domínio do site
  if (isSameOrigin(request.url)) {
    // Imagens: Cache First
    if (/\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico)$/i.test(url.pathname)) {
      return event.respondWith(cacheFirst(request));
    }
    // CSS/JS: SWR
    if (/\.(?:css|js)$/i.test(url.pathname)) {
      return event.respondWith(staleWhileRevalidate(request));
    }
    // Navegação (HTML): tenta rede → cache → offline
    if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
      return event.respondWith((async () => {
        try {
          const fresh = await fetch(request);
          // Opcional: salva última navegação no runtime
          const cache = await caches.open(RUNTIME);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(request);
          if (cached) return cached;
          const off = await caches.match('./offline.html');
          if (off) return off;
          return new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } });
        }
      })());
    }
  }

  // Outros domínios (ex.: CDNs de imagens): tenta Cache First
  if (/\.(?:png|jpg|jpeg|gif|svg|webp|avif)$/i.test(url.pathname)) {
    return event.respondWith(cacheFirst(request));
  }

  // Padrão: SWR
  return event.respondWith(staleWhileRevalidate(request));
});
