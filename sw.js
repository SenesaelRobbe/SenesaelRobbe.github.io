


self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open("v2").then(cache => {
            return cache.addAll([
                "/sw.js",
                "/index.html",
                "/assets/reset.css",
                "/assets/screen.css",
                "/assets/js/script.js",
                "https://senesaelrobbe.github.io/assets/images/chucky.jpg",
                "/manifest.json",
                "https://senesaelrobbe.github.io/assets/images/icons/favicon-16x16.png",
                "https://senesaelrobbe.github.io/assets/images/icons/favicon-32x32.png",
                "https://senesaelrobbe.github.io/assets/images/icons/icon-72x72.png",
                "https://senesaelrobbe.github.io/assets/images/icons/icon-96x96.png",
                "https://senesaelrobbe.github.io/assets/images/icons/icon-128x128.png",
                "https://senesaelrobbe.github.io/assets/images/icons/icon-144x144.png",
                "https://senesaelrobbe.github.io/assets/images/icons/icon-152x152.png",
                "https://senesaelrobbe.github.io/assets/images/icons/icon-192x192.png",
                "https://senesaelrobbe.github.io/assets/images/icons/icon-384x384.png",
                "https://senesaelrobbe.github.io/assets/images/icons/icon-512x512.png"
            ])
        }).catch(err => console.log(err))
    )
});

self.addEventListener('fetch', evt => {
    if (evt.request === 'https://api.themoviedb.org/3/discover/movie?with_cast=51576&api_key=8d86f5dc121d85f4a4651ede8a2fca3c') {
        evt.respondWith(
            caches.match(evt.request).then(function(res) {
                return res ||fetch(evt.request).then(function(response){
                    return caches.open("v2").then(function(cache){
                        cache.put(evt.request, response.clone());
                        return response;
                    })
                    })
            })
        )
    }
});