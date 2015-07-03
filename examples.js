function getCartoCss(id, rules) {
    return '#' + id + ' {\n\t' +
        rules.join('\n\t')
        + '\n}'
}

var examples = {
    'cros_2011_r': {
        name: 'WorldBank CORS ST_ColorMap BLUERED',
        desc: 'Worldbank example',
        sql: [
            "SELECT ST_ColorMap(the_raster_webmercator,'bluered') the_raster_webmercator",
            "FROM ne2_hr_lc_sr_w_dr"
        ].join('\n'),
        cartocss: getCartoCss('ne2_hr_lc_sr_w_dr', [
            'raster-opacity: 0.5;'
        ]),
        center: [20, 0],
        zoom: 2
    }
};
