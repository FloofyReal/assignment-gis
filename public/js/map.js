L.mapbox.accessToken = 'pk.eyJ1IjoiZmxvb2Z5IiwiYSI6ImNpdTZxazU4czAwMmMyb3M0dHpwdGFhNjYifQ.-uNsNCTSDE3y9VSjAsKj3A';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([48.154, 17.072], 15);


var featureLayer = L.mapbox.featureLayer().addTo(map);


$('#btn_shop').on('click', function () {
    vars = {}
    vars["lng"] = "",
    vars["lat"] = "",
    vars["distance"] = "",
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/newsagents",
        datatype: "json",
        success: function (result) {
            console.log('start');
            featureLayer.setGeoJSON(parse_to_geoJSON(result));
        }
    });
});

$('#btn_parks').on('click', function () {
    vars = {}
    vars["lng"] = "",
    vars["lat"] = "",
    vars["distance"] = "",
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/newsagents",
        datatype: "json",
        success: function (result) {
            console.log('start');
            featureLayer.setGeoJSON(parse_to_geoJSON(result));
        }
    });
});

$('#btn_shop').on('click', function () {
    vars = {}
    vars["lng"] = "",
    vars["lat"] = "",
    vars["distance"] = "",
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/newsagents",
        datatype: "json",
        success: function (result) {
            console.log('start');
            featureLayer.setGeoJSON(parse_to_geoJSON(result));
        }
    });
});

function parse_to_geoJSON(geometry, description) {
    geojson = {
            "type": "FeatureCollection",
            "features": JSON.parse(geometry).map(function(g){                        
             return {
                      type: "Feature",
                      properties: {},
                      geometry: g
                    }
             })
    }
    console.log(geojson);
    return geojson;
}
