const cacheName = "v1";
const files = [
    "/",
    "/index.html",
    "/assets/",
    "/assets/reset.css",
    "/assets/screen.css",
    "/js/",
    "/js/script.js",
    "/images/",
    "/images/chucky.jpg",
    "/images/icons",
    "manifest.json",
    //"/images/favicon-16x16.png",
    //"/images/favicon-32x32.png",
    "/images/icon-72x72.png",
    "/images/icon-96x96.png",
    "/images/icon-128x128.png",
    "/images/icon-144x144.png",
    "/images/icon-152x152.png",
    "/images/icon-192x192.png",
    "/images/icon-384x384.png",
    "/images/icon-512x512.png",
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(files)
        }).catch(err => console.log(err))
    )
});

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