function getCartoCss(id, rules) {
    return '#' + id + ' {\n\t' +
        rules.join('\n\t')
        + '\n}'
}

var examples = {
    'cros_2011_r': {
        name: 'WorldBank CORS 2011 ST_ColorMap BLUERED',
        desc: 'Worldbank example 2011',
        sql: [
            "SELECT ST_ColorMap(the_raster_webmercator,'bluered') the_raster_webmercator",
            "FROM dens_built_up_2001_rural_tiles"
        ].join('\n'),
        cartocss: getCartoCss('cros_2011_r', [
            'raster-opacity: 0.7;'
        ]),
        center: [20, 78],
        zoom: 4
    },
    'cros_2001_r': {
        name: 'WorldBank CORS 2001 ST_ColorMap BLUERED',
        desc: 'Worldbank example 2001',
        sql: [
            "SELECT ST_ColorMap(the_raster_webmercator,'bluered') the_raster_webmercator",
            "FROM cros_2001_r"
        ].join('\n'),
        cartocss: getCartoCss('cros_2001_r', [
            'raster-opacity: 0.7;'
        ]),
        center: [20, 78],
        zoom: 4
    },
};
