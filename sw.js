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
    evt.respondWith(async function() {
        const cache = caches.open("v1");
        const cachedRes = await cache.match(evt.request);

        if(cachedRes){
            event.waitUntil(cache.add(evt.request));
            return cachedRes;
        }
        return fetch(evt.request);
    })
});