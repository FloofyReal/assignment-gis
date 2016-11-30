L.mapbox.accessToken = 'pk.eyJ1IjoiZmxvb2Z5IiwiYSI6ImNpdTZxazU4czAwMmMyb3M0dHpwdGFhNjYifQ.-uNsNCTSDE3y9VSjAsKj3A';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([48.154, 17.072], 15);


var featureLayer = L.mapbox.featureLayer().addTo(map);
