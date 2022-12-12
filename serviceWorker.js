const staticChicagoApp = "check-chicago-app-v1";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "Final/index.html",
  "Final/camera.js",
  "Final/chicagoArticles.js",
  "Final/database.js",
  "Final/displayFilter.js",
  "Final/final-style.css",
  "Final/final.js",
  "Final/map.js",
  "Final/images/chicagoView.jpeg",
  "Final/images/theBean.jpg",
  "Final/images/chicago-tower.png",
  "NavigationDrawer/drawer.js",
  "NavigationDrawer/index.html",
  "NavigationDrawer/style2.css"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticChicagoApp).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});