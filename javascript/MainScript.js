/**
 * Created by admin on 2/18/16.
 */

$(document).ready(function(){

    function authDataCallback(authData) {
        if (authData) {
            $('.signUp').addClass('invis');
            $('.profile').removeClass('invis');
        } else {
            $('.signUp').removeClass('invis');
            $('.profile').addClass('invis');
        }
    }

    var ref = new Firebase("https://ica-stem16.firebaseio.com");
    ref.onAuth(authDataCallback);

    var header_default_height = 68;
    var compact_header = false;
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1 && compact_header == false){
            compact_header = true;
            $('#header-fixed').stop(true,true).addClass("header-sticky").animate({height: '0'}, {queue:false, duration:'fast', easing:'linear', complete:function(){
                $('#nav-default').addClass("invis");
                $('#nav-compressed').removeClass("invis");
                $('#header-fixed').animate({height: '38px'}, {queue:false, duration:'fast'});
            }});
        }
        else if ($(this).scrollTop() == 0 && compact_header == true){
            compact_header = false;
            $('#header-fixed').stop(true,true).animate({height: '0'}, {queue:false, duration:'fast', easing:'linear', complete:function(){
                $('#nav-default').removeClass("invis");
                $('#nav-compressed').addClass("invis");
                $('.dropdown').removeClass("open");
                $(".menu-btn").blur();
                $('#header-fixed').animate({height: header_default_height + "px"}, {queue:false, duration:'fast', complete:function(){
                    $('#header-fixed').removeClass("header-sticky");
                }});
            }})
        }
    });
    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    if($("#scrollable").height() < 1080) {
        $("#scrollable").css({"height":1080 + "px"});
    }
});
