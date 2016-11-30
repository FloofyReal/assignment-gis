$(document).ready(function(lat, lng){
if (navigator.geolocation) {
    var location_timeout = setTimeout("geolocFail()", 10000);

    navigator.geolocation.getCurrentPosition(function(position) {
        clearTimeout(location_timeout);

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

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
