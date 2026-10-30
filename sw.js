/* MariClin — Service Worker
   Para publicar uma atualização do site, aumente o número em VERSION
   (ex.: 'mariclin-v2'). Isso limpa o cache antigo nos aparelhos dos clientes. */
const VERSION = 'mariclin-v1';
const CORE_CACHE = VERSION + '-core';
const RUNTIME_CACHE = VERSION + '-runtime';

const CORE_ASSETS = [
  './',
  'index.html',
  'styles.css',
  'script.js',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png'
];

// Instalação: guarda o essencial. Se algum arquivo falhar, a instalação NÃO quebra.
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CORE_CACHE).then(function (cache) {
      return Promise.all(
        CORE_ASSETS.map(function (url) {
          return cache.add(url).catch(function () { /* ignora arquivo ausente */ });
        })
      );
    }).then(function () { return self.skipWaiting(); })
  );
});

// Ativação: apaga caches de versões antigas.
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key.indexOf(VERSION) !== 0; })
          .map(function (key) { return caches.delete(key); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

function staleWhileRevalidate(request) {
  return caches.open(RUNTIME_CACHE).then(function (cache) {
    return cache.match(request).then(function (cached) {
      var network = fetch(request).then(function (response) {
        if (response && (response.status === 200 || response.type === 'opaque')) {
          cache.put(request, response.clone());
        }
        return response;
      }).catch(function () { return cached; });
      return cached || network;
    });
  });
}

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  var url = new URL(request.url);
  var sameOrigin = url.origin === self.location.origin;
  var isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

  // Páginas: tenta a internet primeiro (sempre a versão mais nova); sem internet, usa o cache.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(function (response) {
        if (response && response.ok) {
          var copy = response.clone();
          caches.open(CORE_CACHE).then(function (cache) { cache.put('index.html', copy); });
        }
        return response;
      }).catch(function () {
        return caches.match(request).then(function (cached) {
          if (cached) return cached;
          return caches.match('index.html').then(function (page) {
            return page || caches.match('./');
          });
        });
      })
    );
    return;
  }

  // Arquivos do próprio site (css, js, fotos dos produtos, ícones) e fontes: cache rápido + atualiza em segundo plano.
  if (sameOrigin || isFont) {
    event.respondWith(staleWhileRevalidate(request));
  }
  // Todo o resto (mapa do Google, WhatsApp etc.) segue direto pela internet.
});
