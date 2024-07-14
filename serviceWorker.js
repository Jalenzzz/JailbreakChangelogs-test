const CACHE_NAME = "jailbreak-changelog-cache-v1";
const urlsToCache = [
  "/",
  "/styles.css",
  "/changelogViewer.js",
  "/image_urls.json",
  "https://raw.githubusercontent.com/Jalenzzz/JailbreakChangelogs-test/master/changelogs/21-6-24.txt",
];

self.addEventListener("install", (event) => {
  //   console.log("Service Worker: Install Event");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return fetch("image_urls.json")
          .then((response) => {
            return response.json();
          })
          .then((imageUrls) => {
            urlsToCache.push(...imageUrls);
            return cache.addAll(urlsToCache);
          })
          .catch((error) => {
            console.error("Error fetching/parsing image URLs:", error);
          });
      })
      .catch((error) => {
        console.error("Error opening cache:", error);
      })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
