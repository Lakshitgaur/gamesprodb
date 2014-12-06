

var geocoder;

var destination = 'College of Computer and Information Science Northeastern University 440 Huntington Avenue 202 West Village H Boston, Massachusetts 02115';

var pos;

var rendererOptions = {
    draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();
var map;
var map1;

var contentString = 'College of Computer and Information Science Northeastern University 440 Huntington Avenue 202 West Village H Boston, Massachusetts 02115'

var myLatlng = new google.maps.LatLng(42.3389704, -71.0920767);

function initializer() {
    geocoder = new google.maps.Geocoder();

    var mapOptions = {
        zoom: 17,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "CCIS Northeastern University"
    });


    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    }, 'directions_changed', function () {
        computeTotalDistance(directionsDisplay.directions);
    });

    geocoder = new google.maps.Geocoder();
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    }
    else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);

}


function calcRoute() {

    var selectedMode = document.getElementById('mode').value;

    var request = {
        origin: window.pos,
        destination: window.destination,
        travelMode: google.maps.TravelMode[selectedMode]
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000.
    document.getElementById('total').innerHTML = total + ' km';
}

function codeAddress(address) {

    destination = address;
    pos = 'College of Computer and Information Science Northeastern University 440 Huntington Avenue 202 West Village H Boston, Massachusetts 02115';
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            calcRoute();

            var infowindow1 = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'This is your destination'
            });


        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}


function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


google.maps.event.addDomListener(window, 'load', initializer);
