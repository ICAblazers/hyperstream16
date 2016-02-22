/**
 * Created by admin on 2/18/16.
 */

$(document).ready(function(){
    var header_default_html = $('#header-row').html();
    var header_default_height = $('#header').css('height');
    $('p').click(function(){
        $(this).hide();
    });

    $('button').click(function() {
            $(this).animate(
                {
                    opacity: 'hide'
                }
                , 'fast');
        }
    );




    var compact_header = false;
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1 && compact_header == false){
            compact_header = true;
            $('#header-filler').addClass("header-filler");
            $('#header').stop(true,true).addClass("header-sticky").animate({height: '0'}, {queue:false, duration:'fast', complete:function(){
                $('#header-row').html('<button class="btn btn-default col-xs-1 col-xs-offset-11 menu-btn"><img src="../images/menu.png"></button>');
                $('#header').animate({height: '38px'}, {queue:false, duration:'fast'});
            }});
        }
        else if ($(this).scrollTop() == 0 && compact_header == true){
            compact_header = false;
            $('#header').stop(true,true).animate({height: '0'}, {queue:false, duration:'fast', complete:function(){
                $('#header-row').html(header_default_html);
                $('#header').animate({height: header_default_height}, {queue:false, duration:'fast', complete:function(){
                    $('#header').removeClass("header-sticky");
                    $('#header-filler').removeClass("header-filler");
                }});
            }})
        }
    });
});