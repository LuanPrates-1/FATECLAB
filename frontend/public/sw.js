// Service worker mínimo do FatecLab: torna o app instalável e mantém a "casca" (HTML, JS, CSS,
// fontes) disponível em cache. As chamadas à API sempre vão para a rede.
const CACHE = "fateclab-v1";

self.addEventListener("install", (evento) => {
  evento.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(["./", "./index.html"])));
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((chaves) => Promise.all(chaves.filter((c) => c !== CACHE).map((c) => caches.delete(c)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evento) => {
  const url = new URL(evento.request.url);
  if (evento.request.method !== "GET" || url.origin !== self.location.origin) return;

  // Navegação: rede primeiro, com a página em cache como reserva.
  if (evento.request.mode === "navigate") {
    evento.respondWith(fetch(evento.request).catch(() => caches.match("./index.html")));
    return;
  }

  // Arquivos estáticos com hash no nome: cache primeiro.
  evento.respondWith(
    caches.match(evento.request).then(
      (emCache) =>
        emCache ||
        fetch(evento.request).then((resposta) => {
          if (resposta.ok) {
            const copia = resposta.clone();
            caches.open(CACHE).then((cache) => cache.put(evento.request, copia));
          }
          return resposta;
        }),
    ),
  );
});
