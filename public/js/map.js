L.mapbox.accessToken = 'pk.eyJ1IjoiZmxvb2Z5IiwiYSI6ImNpdTZxazU4czAwMmMyb3M0dHpwdGFhNjYifQ.-uNsNCTSDE3y9VSjAsKj3A';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([48.154, 17.072], 15);


var featureLayer = L.mapbox.featureLayer().addTo(map);
var shopLayer = L.mapbox.featureLayer().addTo(map);
var floristLayer = L.mapbox.featureLayer().addTo(map);
var gasLayer = L.mapbox.featureLayer().addTo(map);
var newsagentsLayer = L.mapbox.featureLayer().addTo(map);


$('#btn_shop').on('click', function () {
    var supermarket = document.getElementById("chs01").checked;
    var newsagents = document.getElementById("chs02").checked;
    var flowers = document.getElementById("chs03").checked;
    var gas = document.getElementById("chs04").checked;
    vars = {}
    vars["lng"] = "";
    vars["lat"] = "";
    vars["distance"] = "";
    if(supermarket) {
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/supermarkets",
        datatype: "json",
        success: function (result) {
            console.log('start');
            shopLayer.setGeoJSON(parse_to_geoJSON(result, 'spm'));
        }
    });
    };
    if(newsagents) {
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/newsagents",
        datatype: "json",
        success: function (result) {
            console.log('start');
            newsagentsLayer.setGeoJSON(parse_to_geoJSON(result, 'nws'));
        }
    });
    };
    if(flowers) {
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/flowers",
        datatype: "json",
        success: function (result) {
            console.log('start');
            floristLayer.setGeoJSON(parse_to_geoJSON(result, 'flw'));
        }
    });
    };
    if(gas) {
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/gas",
        datatype: "json",
        success: function (result) {
            console.log('start');
            gasLayer.setGeoJSON(parse_to_geoJSON(result, 'gas'));
        }
    });
    };
});

$('#btn_parks').on('click', function () {
    vars = {}
    vars["lng"] = "",
    vars["lat"] = "",
    vars["distance"] = "",
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/parks",
        datatype: "json",
        success: function (result) {
            console.log('start');
            featureLayer.setGeoJSON(parse_to_geoJSON(result));
        }
    });
});

$('#btn_parks_water').on('click', function () {
    var distance = document.getElementById("input_dist_water_parks").value;
    console.log(distance);
    var url = "http://localhost:8080/api/parks_water/";
    var new_url = url.concat(distance);
    console.log(new_url);
    $.ajax({
        type: 'GET',
        url: new_url,
        datatype: "json",
        success: function (result) {
            console.log('start');
            featureLayer.setGeoJSON(parse_to_geoJSON(result));
        }
    });
});

$(document).ready(function(lat, lng){
if (navigator.geolocation) {
    var location_timeout = setTimeout("geolocFail()", 10000);

    navigator.geolocation.getCurrentPosition(function(position) {
        clearTimeout(location_timeout);

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var meGeo = {
      "type": "Feature",
      "properties": {
        "title": "Som TU!",
        "marker-color": "#000000",
        "marker-size": "medium",
        "marker-symbol": "circle-stroked"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
            lng,
            lat
        ]
      }
    };
        console.log(meGeo);
        featureLayer.setGeoJSON(meGeo);

        document.getElementById("location_id").innerHTML = '[' + lat.toFixed(3) +
            ' : ' + lng.toFixed(3) + ']'; 
    }, function(error) {
        clearTimeout(location_timeout);
        geolocFail();
    });
} else {
    // Fallback for no geolocation
    geolocFail();
}
});


function parse_to_geoJSON(geometry, title) {
    var spm = 'spm';
    var nws = 'nws';
    var flw = 'flw';
    var gas = 'gas';
    if(title === spm){
    geojson = {
            "type": "FeatureCollection",
            "features": JSON.parse(geometry).map(function(g){                        
             return {
                      "type": "Feature",
                      "properties": {
                        "title": "Supermarket",
                        "marker-color": "#d71f1f",
                        "marker-size": "medium",
                        "marker-symbol": "shop",
                        "fill": "#d71f1f",
                        "fill-opacity": 0.5,
                        "stroke": "#555555",
                        "stroke-width": 2,
                        "stroke-opacity": 0.2
                      },
                      "geometry": g
                    }
             })
    }
    } else if(title === nws){
    geojson = {
            "type": "FeatureCollection",
            "features": JSON.parse(geometry).map(function(g){                        
             return {
                      "type": "Feature",
                      "properties": {
                        "title": "Trafika",
                        "marker-color": "#3d68a5",
                        "marker-size": "medium",
                        "marker-symbol": "library",
                        "fill": "#3d68a5",
                        "fill-opacity": 0.5,
                        "stroke": "#555555",
                        "stroke-width": 2,
                        "stroke-opacity": 0.2
                      },
                      "geometry": g
                    }
             })
    }
    } else if(title === flw){
    geojson = {
            "type": "FeatureCollection",
            "features": JSON.parse(geometry).map(function(g){                        
             return {
                      "type": "Feature",
                      "properties": {
                        "title": "Kvetinárstvo",
                        "marker-color": "#23983e",
                        "marker-size": "medium",
                        "marker-symbol": "garden",
                        "fill": "#23983e",
                        "fill-opacity": 0.5,
                        "stroke": "#555555",
                        "stroke-width": 2,
                        "stroke-opacity": 0.2
                      },
                      "geometry": g
                    }
             })
    }
    } else if(title === gas){
    geojson = {
            "type": "FeatureCollection",
            "features": JSON.parse(geometry).map(function(g){                        
             return {
                      "type": "Feature",
                      "properties": {
                        "title": "Pumpa",
                        "marker-color": "#e9c33a",
                        "marker-size": "medium",
                        "marker-symbol": "fuel",
                        "fill": "#e9c33a",
                        "fill-opacity": 0.5,
                        "stroke": "#555555",
                        "stroke-width": 2,
                        "stroke-opacity": 0.2
                      },
                      "geometry": g
                    }
             })
    }
    } else {
    geojson = {
            "type": "FeatureCollection",
            "features": JSON.parse(geometry).map(function(g){                        
             return {
                      "type": "Feature",
                      "properties": {
                        "fill": "#704688",
                        "fill-opacity": 0.4,
                        "stroke": "#555555",
                        "stroke-width": 2,
                        "stroke-opacity": 0.2
                      },
                      "geometry": g
                    }
             })
    }
    }
    return geojson;
}
