const cacheName = "v1";
const files = [
    "/",
    "/index.html",
    "/assets/",
    "/assets/reset.css",
    "/assets/screen.css",
    "/js/",
    "/js/script.js",
    "/images/"
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

self.addEventListener("activate", evt => {
    let expectedCacheNames = Object.keys(CURRENT_CACHES).map( key => CURRENT_CACHES[key]);

    evt.waitUntil(
        caches.key().then(cacheNames => {
            return Promise.all(
                cacheNames.map(
                    cacheName => {
                        if(expectedCacheNames.indexOf(cacheName) === -1){
                            console.log("Deleting out of date cache: ", cacheName);
                            return caches.delete(cacheName);
                        }
                    }
                )
            )
        })
    )
});

// self.addEventListener('fetch', evt => {
//     console.log(evt.request.url);
//     evt.respondWith(async function() {
//         const cache = caches.open("v1");
//         const cachedRes = await cache.match(evt.request);
//
//         if(cachedRes){
//             event.waitUntil(cache.add(evt.request));
//             return cachedRes;
//         }
//         return fetch(evt.request);
//     })
// });