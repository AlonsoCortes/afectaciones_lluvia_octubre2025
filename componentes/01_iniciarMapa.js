// La siguiente función inicia el mapa centrado en las coordenadas del usuario
// La lógica de la función es la siguiente:
// 1. crea en objeto de tipo maplibregl.Map
// 2. define el contenedor del mapa (div con id "map")
// 3. define el estilo del mapa (en este caso, un estilo de MapTiler basado en OpenStreetMap)
// 4. define la posición inicial del mapa (coordenadas del usuario)
// 5. define el nivel de zoom inicial del mapa (12)

export function inicializarMapa() {
    return new maplibregl.Map({
        container: 'map', // container id
        style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=856Op4RTOftvrOLrid4O', // style URL
        center: [-98.21838061648327, 20.347883529256716], // starting position [lng, lat] 20.347883529256716, -98.21838061648327
        zoom: 6.4 // starting zoom
    });
}