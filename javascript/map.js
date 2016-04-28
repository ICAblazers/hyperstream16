/**
 * Created by admin on 4/6/16.
 */



$(document).ready(function(){
    function init_map() {
        var styles =[
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ];

        var styledMap = new google.maps.StyledMapType(styles, {name:"Styled Map"});

        var myOptions = {zoom:5,center:new google.maps.LatLng(41.5667771,-93.676555641),mapTypeControlOptions:{mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']}};

        map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
    }

    google.maps.event.addDomListener(window, 'load', init_map);

    var prev_infoWindow = "";
    function createMarker(markers, snapshot, ref){
        markers.push(new google.maps.Marker({
            map: map,
            position: {lat: snapshot.val().location_lat,lng: snapshot.val().location_lng},
            title: snapshot.val().firstName + snapshot.val.lastName,
            icon: "../images/pin.png"
        }));
        var infowindow = new google.maps.InfoWindow({content:'<a href="../html/ProfileView.html?id='+ ref.key() +'"<strong>'+ snapshot.val().firstName +' ' + snapshot.val().lastName +'</strong>' + '<br>' + snapshot.val().location_address+'<br></a>'});

        google.maps.event.addListener(markers[markers.length-1], 'click', function(){
            if (prev_infoWindow){
                prev_infoWindow.close();
            }
            prev_infoWindow = infowindow;
            infowindow.open(map,this);
        });
    }
    var usersRef;
    usersRef = new Firebase("https://ica-stem16.firebaseio.com/users");
    usersRef.on("value", function(snapshot) {
        var markers = [];
        for (var i in snapshot.val()) {
            var userRef = new Firebase("https://ica-stem16.firebaseio.com/users/" + i);
            userRef.on("value", function(snapshot){
                if(snapshot.val().location_lat && snapshot.val().location_lng) {
                    createMarker(markers, snapshot, userRef);
                }
            });
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        window.location.assign('../html/Main.html');
    });
});