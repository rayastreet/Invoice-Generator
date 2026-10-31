// Naikkan angka versi ini setiap kali kamu mengubah file aplikasi,
// supaya HP mengunduh versi terbaru.
const CACHE = "invoice-v1";
const ASSETS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./lib/html2canvas.min.js", "./lib/jspdf.umd.min.js",
  "./fonts/Inter-Regular.woff2", "./fonts/Inter-Medium.woff2", "./fonts/Inter-SemiBold.woff2",
  "./fonts/Inter-Bold.woff2", "./fonts/Inter-ExtraBold.woff2",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request)));
});
