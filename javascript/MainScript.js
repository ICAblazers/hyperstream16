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
});