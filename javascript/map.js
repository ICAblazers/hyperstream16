/**
 * Created by admin on 4/6/16.
 */
function init_map() {
    var myOptions = {zoom:10,center:new google.maps.LatLng(51.5073509,-0.12775829999998223),mapTypeId: google.maps.MapTypeId.ROADMAP};

    map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);

    marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(51.5073509,-0.12775829999998223)});

    infowindow = new google.maps.InfoWindow({content:'<strong>Title</strong>' + '<br>London, United Kingdom<br>'});

    google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});

    infowindow.open(map,marker);
}

google.maps.event.addDomListener(window, 'load', init_map);

$(document).ready(function(){




})