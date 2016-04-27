/**
 * Created by bchal on 4/13/2016.
 */
$(document).ready(function() {

    function authDataCallback(authData) {
        if (authData) {
            var userRef = new Firebase("https://ica-stem16.firebaseio.com/users/" + authData.uid);
            userRef.on("value", function(snapshot) {
                var snap = snapshot.val();
                console.log((snap));
                $("#name").html((snap).firstName + " " + snap.lastName);
                $("#location").html(snap.location_address);
                $("#occupation").html(snap.occupation);
                $("#info").html(snap.about);
                if(snap.twitter){
                    $("#tw").html('<a href = https://www.twitter.com/'+ snap.twitter +'<img src="http://www.kcdsg.org/images/site/Twitter-logo21.png" alt="Twitter"  class="social-media-btn">');
                    $("#fb").html('<a href = https://www.facebook.com/'+ snap.facebook +'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/2000px-F_icon.svg.png" alt="Facebook" class="social-media-btn">');
                    $("#ig").html('<a href = https://www.instagram.com/'+ snap.instagram +'<img src="https://5a5a57ff32a328601212-ee0df397c56b146e91fe14be42fa361d.ssl.cf1.rackcdn.com/icon/logos_glyph/Oxi2BIzyfeN5INYU7lta/Glyph_Logo_thumbnail200.png" alt="Instagram" class="social-media-btn">');
                }
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
                window.location.assign('../html/Main.html');
            });


        } else {
            window.location.assign('../html/Main.html');
        }
    }

    var ref = new Firebase("https://ica-stem16.firebaseio.com");

    ref.onAuth(authDataCallback);

    $("#logout-btn").on('click', function () {
        ref.unauth();
        window.location.assign('../html/Main.html');

    });
});