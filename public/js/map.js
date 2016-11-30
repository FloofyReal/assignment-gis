L.mapbox.accessToken = 'pk.eyJ1IjoiZmxvb2Z5IiwiYSI6ImNpdTZxazU4czAwMmMyb3M0dHpwdGFhNjYifQ.-uNsNCTSDE3y9VSjAsKj3A';

var map = L.mapbox.map('map','mapbox.streets').setView([48.154, 17.072], 15);

var featureLayer = L.mapbox.featureLayer().addTo(map);


$('#btn_shop').on('click', function () {
    var vars = {};
    if ($('ch1').is(':checked')) {
    vars["item"] = "supermarket";
    }
    if ($('ch2').is(':checked')) {
    vars["item"] = "newsagent";
    }
    if ($('ch3').is(':checked')) {
    vars["item"] = "flowers";
    }
    vars["lng"] = "",
    vars["lat"] = "",
    vars["distance"] = "",
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/",
        data: vars,
        datatype: "json",
        success: function (result) {
            console.log('start');
            console.log(url);

            //featureLayer.setGeoJSON(result[0]);
            // map.addSource('point', {
            //     "type": "geojson",
            //     "data": result[0]
            // });
            // map.addLayer({
            //   "id": name,
            //   "type": "line",
            //   "source": 'point',
            //   "layout": {
            //       "line-join": "round",
            //       "line-cap": "round"
            //   },
            //   "paint": {
            //       "line-color": colour,
            //       "line-width": 8
            //   }
            //   });
            console.log('stop');
        }
    });
});

$('#btn_parks').on('click', function () {
    var vars = {};
    vars["item"] = "park_paths";
    vars["lng"] = "",
    vars["lat"] = "",
    vars["distance"] = "",
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/api/",
        data: vars,
        datatype: "json",
        success: function (result) {
            console.log('start');
            console.log(url);

            //featureLayer.setGeoJSON(result[0]);
            // map.addSource('point', {
            //     "type": "geojson",
            //     "data": result[0]
            // });
            // map.addLayer({
            //   "id": name,
            //   "type": "line",
            //   "source": 'point',
            //   "layout": {
            //       "line-join": "round",
            //       "line-cap": "round"
            //   },
            //   "paint": {
            //       "line-color": colour,
            //       "line-width": 8
            //   }
            //   });
            console.log('stop');
        }
    });
});
        //data: params,

function parse_to_geoJSON(geometry, description) {
    geojson = {
            "type": "Feature",
            "geometry": geometry,
            "properties": {
                "description": description,
            }
    };
    return geojson;
}
