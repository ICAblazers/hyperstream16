/**
 * Created by bchal on 4/24/2016.
 */
$(document).ready(function () {
    var usersRef = new Firebase("https://ica-stem16.firebaseio.com/users");
    usersRef.on("value", function(snapshot){
        var output = "";
        for (var i in snapshot.val()){
            var userRef = new Firebase("https://ica-stem16.firebaseio.com/users/" + i);
            userRef.on("value", function(snapshot){
                var twitter="";
                var facebook="";
                var insta="";
                props = [
                    snapshot.val().firstName,
                    snapshot.val().lastName,
                    snapshot.val().locationInput,
                    snapshot.val().occupation,
                    snapshot.val().about,
                    snapshot.val().twitter,
                    snapshot.val().facebook,
                    snapshot.val().instagram
                ];

                if(props[5]){
                    twitter = '<a href="https://www.twitter.com/' + props[5] + '"><img src="http://www.kcdsg.org/images/site/Twitter-logo21.png" alt="Twitter"  class="social-media-btn" id="twitter-btn"></a>'
                }
                if(props[6]){
                    facebook = '<a href="https://www.facebook.com/' + props[6] + '"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/2000px-F_icon.svg.png" alt="Facebook" class="social-media-btn" id="facebook-btn"></a>'
                }
                if(props[7]){
                    insta = '<a href="https://www.instagram.com/' + props[7] + '"><img src="https://5a5a57ff32a328601212-ee0df397c56b146e91fe14be42fa361d.ssl.cf1.rackcdn.com/icon/logos_glyph/Oxi2BIzyfeN5INYU7lta/Glyph_Logo_thumbnail200.png" alt="Instagram" class="social-media-btn" id="instagram-btn"></a>'
                }
                output += '<div class="jumbotron text-center"> \
                                <div class="row"> \
                                    <div class="col-xs-6"> \
                                        <img src="http://www.learnly.org/wp-content/themes/wplms/images/avatar.jpg" alt="Your Profile Picture" class="profile-pic"> \
                                    </div> \
                                    <div class="text-center col-xs-6"> \
                                        <h1 id="name">'+ props[0] + " " + props[1] + '</h1> \
                                        <a href="../html/ProfileView.html?id='+ i + '" id="profile-link">Visit Profile</a> \
                                        <div class="row social-media"> \
                                             ' + twitter
                                             + facebook
                                             + insta +
                                        '</div> \
                                    </div> \
                                </div> \
                            </div>';
            });
        }
        $("#profiles").html(output);
    });







});