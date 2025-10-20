// La siguiente función carga las capas de puntos de interés en el mapa
// La lógica de la función es la siguiente:
// 1. Espera a que el mapa se haya cargado completamente (evento 'load')
// 2. Añade una fuente de datos de tipo GeoJSON que contiene los puntos de interés
// 3. Añade una capa de tipo 'circle' para representar los puntos de interés en el mapa
// 4. Define el estilo de los círculos (radio, color, borde) y utiliza una expresión 'match' 
//    para asignar colores específicos según la categoría del punto de interés

export function cargarCapas(map){
    // Leer variables CSS desde :root
    const estilos = getComputedStyle(document.documentElement);

    const atencion = estilos.getPropertyValue('--support-red').trim();
    const bordeN = estilos.getPropertyValue('--neutral-dark').trim();


    map.on('load', () => { 
        map.addSource('municipios_Source', { 
            type: 'geojson',
            data: 'datos/municipios_2020_INEGI_v2.geojson',
        });
        // Añade la capa al mapa
        map.addLayer({ 
            'id': 'municipios_Layer',
            'type': 'fill',
            'source': 'municipios_Source',
            'paint': {
                'fill-color': [
                    'match',
                    ['get', 'NOM_ENT'], // atributo del GeoJSON
                    'Hidalgo', '#009688',
                    'Veracruz de Ignacio de la Llave', '#1565C0',
                    'Puebla', '#E64A19',
                    'Querétaro', '#FBC02D',
                    'San Luis Potosí', '#558B2F',
                    /* default */ '#CCCCCC'     
                ],
                'fill-opacity': 0.6,
                'fill-outline-color': '#333333'
    }       
            })
        // Evento de clic sobre la capa
        map.on('click', 'municipios_Layer', (e) => {
            // Obtiene la primera entidad seleccionada
            const feature = e.features[0];

            // Construye el contenido del popup con atributos del GeoJSON
            const nombre = feature.properties.NOMGEO || 'Sin nombre';
            const estado = feature.properties.NOM_ENT || 'Sin dato';
            const poblacion = feature.properties.pobTotal2020 || 'No disponible';
            const locAfectada = feature.properties.locAfectada || 'No disponible';
            const locSinAcceso = feature.properties.locSinAcceso || 'No disponible';

            const contenido = `
                <div style="font-family: 'Noto Sans', sans-serif; font-size: 13px; line-height: 1.4;">
                    <b style="font-size:14px;">${nombre}</b><br>
                    <b>Estado:</b> ${estado}<br>
                    <b>Población total:</b> ${poblacion.toLocaleString()}<br>
                    <b>Localidades afectadas:</b> ${locAfectada.toLocaleString()}<br>
                    <b>Localidades sin acceso:</b> ${locSinAcceso.toLocaleString()}<br>
                </div>
            `;

            // Crea el popup y lo posiciona donde se hizo clic
            new maplibregl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(contenido)
                .addTo(map);
        });


        })
}
        
        
