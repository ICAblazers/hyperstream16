/**
 * Created by admin on 2/18/16.
 */

$(document).ready(function(){

    var header_default_html = $('#header-row').html();
    var header_default_height = $('#header').css('height');
    var compact_header = false;
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1 && compact_header == false){
            compact_header = true;
            $('#header-fixed').stop(true,true).addClass("header-sticky").animate({height: '0'}, {queue:false, duration:'fast', easing:'linear', complete:function(){
                $('#header-row').html('<button class="btn btn-default col-xs-1 col-xs-offset-11 menu-btn"><img src="../images/menu.png"></button>');
                $('#header-fixed').animate({height: '38px'}, {queue:false, duration:'fast'});
            }});
        }
        else if ($(this).scrollTop() == 0 && compact_header == true){
            compact_header = false;
            $('#header-fixed').stop(true,true).animate({height: '0'}, {queue:false, duration:'fast', easing:'linear', complete:function(){
                $('#header-row').html(header_default_html);
                $('#header-fixed').animate({height: header_default_height}, {queue:false, duration:'fast', complete:function(){
                    $('#header-fixed').removeClass("header-sticky");
                }});
            }})
        }
    });
    $(".menu-btn").onclick(function(){

    })
});
function init_map(){var myOptions = {zoom:10,center:new google.maps.LatLng(51.5073509,-0.12775829999998223),mapTypeId: google.maps.MapTypeId.ROADMAP};map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(51.5073509,-0.12775829999998223)});infowindow = new google.maps.InfoWindow({content:'<strong>Title</strong>' +
'<br>London, United Kingdom<br>'});google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});infowindow.open(map,marker);}google.maps.event.addDomListener(window, 'load', init_map);