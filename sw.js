self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open("v1").then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/assets/",
                "/assets/reset.css",
                "/assets/screen.css",
                "/js/",
                "/js/script.js",
                "/images/"
            ])
        })
    )
});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request)
    ).then(res => console.log(res))
});