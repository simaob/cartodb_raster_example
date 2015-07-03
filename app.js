var map = L.map('map', {
  scrollWheelZoom: false,
  center: [-18, -46],
  zoom: 8
});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '<a href="http://cartodb.com">CartoDB</a> © 2014',
    maxZoom: 18
}).addTo(map);

var sqlEditor = CodeMirror.fromTextArea(document.getElementById('sql_editor'), {
    theme: 'monokai',
    lineNumbers: true,
    mode:  "text/x-plsql",
    height: "100px"
});

var cssEditor = CodeMirror.fromTextArea(document.getElementById('css_editor'), {
    theme: 'monokai',
    lineNumbers: true,
    mode: "text/x-scss",
    height: "200px"
});


var rasterLayer = null;

function updateMap(example) {
    if (rasterLayer) {
        map.removeLayer(rasterLayer);
    }

    if (example) {
        map.setView(example.center, example.zoom);
    }

    var config = {
        "version": "1.2.0",
        "layers": [
            {
                "type": "cartodb",
                "options": {
                    "sql": sqlEditor.getValue(),
                    "cartocss": cssEditor.getValue(),
                    "cartocss_version": "2.3.0",
                    "geom_column": "the_raster_webmercator",
                    "geom_type": "raster"
                }
            }
        ]
    };

    var request = new XMLHttpRequest();
    request.open('POST', currentEndpoint(), true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onload = function() {
        if (this.status >= 200 && this.status < 400){
            var layergroup = JSON.parse(this.response);

            var tilesEndpoint = currentEndpoint() + '/' + layergroup.layergroupid + '/{z}/{x}/{y}.png';

            var protocol = 'https:' == document.location.protocol ? 'https' : 'http';
            if (layergroup.cdn_url && layergroup.cdn_url[protocol]) {
                var domain = layergroup.cdn_url[protocol];
                if ('http' === protocol) {
                    domain = '{s}.' + domain;
                }
                tilesEndpoint = protocol + '://' + domain + '/' + currentUser() + '/api/v1/map/' + layergroup.layergroupid + '/{z}/{x}/{y}.png';
            }

            rasterLayer = L.tileLayer(tilesEndpoint, {
                maxZoom: 18
            }).addTo(map);
        } else {
            throw 'Error calling server: Error ' + this.status + ' -> ' + this.response;
        }
    };
    request.send(JSON.stringify(config));
}

function currentExample() {
    return examples[examplesSelector.value];
}

function currentUser() {
    return currentEndpoint().match(/http[s]*:\/\/([^.]*).*/)[1];
}

function currentEndpoint() {
    return document.getElementById('endpoint').value;
}

function loadExample() {
    var example = currentExample();
    cssEditor.setValue(example.cartocss);
    sqlEditor.setValue(example.sql);

    updateMap(example);
}

CodeMirror.commands.save = function() {
    updateMap();
};


var examplesSelector = document.getElementById('examples');
examplesSelector.addEventListener('change', loadExample, false);

Object.keys(examples).forEach(function(k) {
    var option = document.createElement('option');
    option.value = k;
    option.innerText = examples[k].name;

    examplesSelector.appendChild(option);
});


document.getElementById('endpoint').addEventListener('blur', updateMap, false);


loadExample();
