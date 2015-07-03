function getCartoCss(id, rules) {
    return '#' + id + ' {\n\t' +
        rules.join('\n\t')
        + '\n}'
}

var examples = {
    'natural_earth_inverted': {
        name: 'Natural Earth II Invert layer order',
        desc: 'Natural Earth II with Shaded Relief, Water, and Drainages',
        sql: [
            "SELECT ST_Band(the_raster_webmercator,'{3,2,1}'::integer[]) the_raster_webmercator",
            "from ne2_hr_lc_sr_w_dr"
        ].join('\n'),
        cartocss: getCartoCss('ne2_hr_lc_sr_w_dr', [
            'raster-opacity: 1.0;'
        ]),
        center: [20, 0],
        zoom: 2
    },
    'pop': {
        name: 'Population',
        desc: 'Planet Ortho',
        sql: 'select * from pop',
        cartocss: getCartoCss('pop', [
            'raster-opacity: 1.0;'
        ]),
        center: [20, 0],
        zoom: 2
    },
    'pop_fire': {
        name: 'Population ST_Color fire',
        desc: 'Planet Ortho',
        sql: [
            "select ST_ColorMap(the_raster_webmercator, 'fire') the_raster_webmercator",
            "from pop"
        ].join('\n'),
        cartocss: getCartoCss('pop', [
            'raster-opacity: 1.0;'
        ]),
        center: [-0.74, 112.67],
        zoom: 5
    },
    'pop_bluered': {
        name: 'Population ST_Color bluered',
        desc: 'Planet Ortho',
        sql: [
            "select ST_ColorMap(the_raster_webmercator, 'bluered') the_raster_webmercator",
            "from pop"
        ].join('\n'),
        cartocss: getCartoCss('pop', [
            'raster-opacity: 1.0;'
        ]),
        center: [-0.74, 112.67],
        zoom: 5
    },
    'planet_ortho': {
        name: 'Planet Ortho',
        desc: 'Planet Ortho',
        sql: 'select * from demo_planet_ortho',
        cartocss: getCartoCss('demo_planet_ortho', [
            'raster-opacity: 1.0;'
        ]),
        center: [-18.39, -45.36],
        zoom: 12
    },
    'planet_ortho_colormap': {
        name: 'Planet Ortho ST_ColorMap INTERPOLATE',
        desc: 'Planet Ortho',
        sql: [
            "SELECT ST_ColorMap(the_raster_webmercator,'100% 255 0 0",
            "    75% 200 0 0",
            "    50% 100 0 0",
            "    25% 50 0 0",
            "    10% 10 0 0",
            "nv 0 0 0', 'INTERPOLATE') the_raster_webmercator",
            "from demo_planet_ortho"
        ].join('\n'),
        cartocss: getCartoCss('demo_planet_ortho', [
            'raster-opacity: 1.0;'
        ]),
        center: [-18.39, -45.36],
        zoom: 12
    },
    'planet_ortho_colormap_nearest': {
        name: 'Planet Ortho ST_ColorMap NEAREST',
        desc: 'Planet Ortho',
        sql: [
            "SELECT ST_ColorMap(the_raster_webmercator,'100% 255 0 0",
            "    75% 200 0 0",
            "    50% 100 0 0",
            "    25% 50 0 0",
            "    10% 10 0 0",
            "nv 0 0 0', 'NEAREST') the_raster_webmercator",
            "from demo_planet_ortho"
        ].join('\n'),
        cartocss: getCartoCss('demo_planet_ortho', [
            'raster-opacity: 1.0;'
        ]),
        center: [-18.39, -45.36],
        zoom: 12
    },
    'natural_earth': {
        name: 'Natural Earth II',
        desc: 'Natural Earth II with Shaded Relief, Water, and Drainages',
        sql: [
            'select ST_Band(the_raster_webmercator,1) the_raster_webmercator',
            'from ne2_hr_lc_sr_w_dr'
        ].join('\n'),
        cartocss: getCartoCss('ne2_hr_lc_sr_w_dr', [
            'raster-opacity: 0.5;',
            'raster-scaling:lanczos;',
            'raster-colorizer-default-mode: linear;',
            'raster-colorizer-default-color: transparent;',
            'raster-colorizer-stops:',
                '\tstop(0, #fff)',
                '\tstop(255, #000);'
        ]),
        center: [20, 0],
        zoom: 2
    },
    'natural_earth_bluered': {
        name: 'Natural Earth II ST_ColorMap BLUERED',
        desc: 'Natural Earth II with Shaded Relief, Water, and Drainages',
        sql: [
            "SELECT ST_ColorMap(the_raster_webmercator,'bluered') the_raster_webmercator",
            "FROM ne2_hr_lc_sr_w_dr"
        ].join('\n'),
        cartocss: getCartoCss('ne2_hr_lc_sr_w_dr', [
            'raster-opacity: 0.5;'
        ]),
        center: [20, 0],
        zoom: 2
    },
    'shaded_relief': {
        name: 'Shaded Relief',
        desc: '1:10m Shaded Relief - Grayscale shaded relief of land areas',
        sql: 'select * from sr_hr',
        cartocss: getCartoCss('sr_hr', [
            'raster-opacity: 1.0;',
            'raster-scaling:lanczos;',
            'raster-colorizer-default-mode: linear;',
            'raster-colorizer-default-color: transparent;',
            'raster-colorizer-stops:',
              '\tstop(42,#47443e)',
              '\tstop(70, #77654a)',
              '\tstop(100, rgb(85,107,50))',
              '\tstop(200, #47443e)',
              '\tstop(255, #47443e);'
        ]),
        center: [20, 0],
        zoom: 3
    }
};