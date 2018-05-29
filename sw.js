


self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open("v1").then(cache => {
            return cache.addAll([
                // "/",
                "/index.html",
                // "/assets/",
                "/assets/reset.css",
                "/assets/screen.css",
                // "/assets/js/",
                "/assets/js/script.js",
                // "https://senesaelrobbe.github.io/assets/images/icons/assets/images/",
                "https://senesaelrobbe.github.io/assets/images/icons/assets/images/chucky.jpg",
                "https://senesaelrobbe.github.io/assets/images/icons/assets/images/icons",
                "/manifest.json",
                "https://senesaelrobbe.github.io/assets/images/icons/assets/icons/images/favicon-16x16.png",
                "https://senesaelrobbe.github.io/assets/images/icons/assets/icons/images/favicon-32x32.png",
                "https://senesaelrobbe.github.io/assets/images/icons/assets/icons/images/icon-72x72.png",
                "https://senesaelrobbe.github.io/assets/images/icons/assets/icons/images/icon-96x96.png",
                "https://senesaelrobbe.github.io/assets/images/icons/assets/icons/images/icon-128x128.png",
                "https://senesaelrobbe.github.io/assets/images/icons/assets/icons/images/icon-144x144.png",
                "https://senesaelrobbe.github.io/assets/images/icons/assets/icons/images/icon-152x152.png",
                "https://senesaelrobbe.github.io/assets/images/icons/assets/icons/images/icon-192x192.png",
                "https://senesaelrobbe.github.io/assets/images/icons/assets/icons/images/icon-384x384.png",
                "https://senesaelrobbe.github.io/assets/images/icons/assets/icons/images/icon-512x512.png"
            ])
        }).catch(err => console.log(err))
    )
});

// self.addEventListener('fetch', function(event) {
//     if(!(event.request === "https://api.themoviedb.org/3/discover/movie?with_cast=51576&api_key=8d86f5dc121d85f4a4651ede8a2fca3c"))
//     { event.respondWith(
//         caches.match(event.request).then(function(response) {
//             return response || fetch(event.request);
//         })
//         )
//     ;}
// });

self.addEventListener('fetch', evt => {
    if (evt.request === 'https://api.themoviedb.org/3/discover/movie?with_cast=51576&api_key=8d86f5dc121d85f4a4651ede8a2fca3c') {
        evt.respondWith(
            caches.match(evt.request).then(function(res) {
                return res ||fetch(evt.request).then(function(response){
                    return caches.open("v1").then(function(cache){
                        cache.put(evt.request, response.clone());
                        return response;
                    })
                    })
            })
        )
    }
});

//     self.addEventListener('activate', function(event) {
//         // Delete all caches that aren't named in CURRENT_CACHES.
//         // While there is only one cache in this example, the same logic will handle the case where
//         // there are multiple versioned caches.
//         var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
//             return CURRENT_CACHES[key];
//         });
//
//     event.waitUntil(
//         caches.key().then(cacheNames => {
//             return Promise.all(
//                 cacheNames.map(
//                     cacheName => {
//                         if(expectedCacheNames.indexOf(cacheName) === -1){
//                             console.log("Deleting out of date cache: ", cacheName);
//                             return caches.delete(cacheName);
//                         }
//                     }
//                 )
//             )
//         })
//     )
// });