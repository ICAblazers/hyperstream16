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

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1){
            $('#header').stop().addClass("header-sticky").animate({height: '38px'}, 'fast');
            $('#header-row').html('<button class="btn btn-default col-xs-1 col-xs-offset-11 menu-btn"><img src="../images/menu.png"></button>');
            $('.page-header').addClass("page-header-alt");
        }
        else{
            $('#header').stop().animate({height: header_default_height}, 'fast').removeClass("header-sticky");
            $('#header-row').html(header_default_html);
            $('.page-header').removeClass("page-header-alt");

        }
    });
});