//metodo de instalacio del sw e inicia la cache y muestra los archivos que no se pudieron instalar
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalado');
    event.waitUntil(
        caches.open('Icecream-Store-PWA')
            .then((cache) => {
                return cache.addAll([
                    './',
                    './index.html',
                    './css/style.css',
                    './manifest.json',
                    './productos.html',
                    './galeria.html',
                    './nosotros.html',
                    './contacto.html',
                    './img/atendiendo2.jpg',
                    './img/cafe2.jpg',
                    './img/cafe3.jpg',
                    './img/cafe4.jpg',
                    './img/cafe1.jpg',
                    './img/icono1.png',
                    './img/icono2.png',
                    './img/cafeteria.jpg',
                    './img/capuccino.jpg',
                    './img/latte.jpg',
                    './img/chocolate-caliente.jpg',
                    './img/contacto.jpg',
                    './img/croissant.jpg',
                    './img/espresso.jpeg',
                    './img/frappe.jpg',
                    './img/gal1.jpg',
                    './img/gal2.jpg',
                    './img/granos.jpg',
                    './img/hero.jpg',
                    './img/leyendo.jpeg',
                    './img/mokaccino.jpg',
                    './img/panecillos.jpg',
                    './img/personal.jpg',
                    './img/preparando.jpg',
                    './img/snacks.jpg'
                                        
                ]);
            })
       );
});

//metodo para activar el sw y elimina las cache antiguas
self.addEventListener('activate', function(e) {
    console.log('Service Worker: Activado');
    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(thisCacheName) {
                    if (thisCacheName !== CACHE_NAME) {
                        console.log('Service Worker: Cache viejo eliminado', thisCacheName);
                        return caches.delete(thisCacheName);
                    }
                })
            );
        })
    );
});

//busca la cache donde se encuentra los archivos
self.addEventListener('fetch', function(e) {
    console.log('Service Worker: Fetching', e.request.url);

    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response) {
                console.log('Cache encontrada', e.request.url);
                return response;
            }
            return fetch(e.request).then(function(networkResponse) {
                return caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(e.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(function(err) {
                console.log('Error al hacer fetch', err);
            });
        })
    );
});

self.addEventListener('push', async event => {
    const data = event.data.json();
    console.log('Service Worker: Notificación push recibida', data);

    const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });

    let isPWAActive = false;
    allClients.forEach(client => {
        if (client.visibilityState === 'visible') {
            isPWAActive = true;
        }
    });

    if (!isPWAActive) {
        const options = {
            body: data.body,
            icon: 'icon.png',
            badge: 'badge.png'
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    } else {
        console.log('Notificación ignorada porque la PWA está en primer plano.');
    }
});
