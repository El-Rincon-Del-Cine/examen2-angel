//metodo de instalacio del sw e inicia la cache y muestra los archivos que no se pudieron instalar
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalado');
    event.waitUntil(
        caches.open('coffee')
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
self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['coffee'];
    console.log('Service Worker: Activado');
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

//busca en la cache donde se encuentran los archivos
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetch solicitado para', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .catch((error) => console.error('Error en la solicitud fetch', error))
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification("La Taverna del café te invita a visitarnos", {
            body: "¿Sabias que una buena lectura va acompañada de una buena bebida relajante? Descubrelo",
            icon: "./img/icono1.png"
        });
    }
});
