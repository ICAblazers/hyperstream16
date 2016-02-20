/**
 * Created by admin on 2/18/16.
 */

$(document).ready(function(){
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
            $('#header').addClass("header-sticky");
            $('.page-header').addClass("page-header-alt");
        }
        else{
            $('#header').removeClass("header-sticky");
            $('.page-header').removeClass("page-header-alt");

        }
    });
});