// Naikkan angka versi ini setiap kali kamu mengubah file aplikasi,
// supaya HP mengunduh versi terbaru.
const CACHE = "invoice-v2";
const ASSETS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./html2canvas.min.js", "./jspdf.umd.min.js",
  "./Inter-Regular.woff2", "./Inter-Medium.woff2", "./Inter-SemiBold.woff2",
  "./Inter-Bold.woff2", "./Inter-ExtraBold.woff2",
  "./icon-192.png", "./icon-512.png", "./maskable-512.png", "./apple-touch-icon.png"
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
