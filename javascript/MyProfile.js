/**
 * Created by bchal on 4/13/2016.
 */
$(document).ready(function() {

    function authDataCallback(authData) {
        if (authData) {
            var userRef = new Firebase("https://ica-stem16.firebaseio.com/users/" + authData.uid);
            userRef.on("value", function(snapshot) {
                console.log(snapshot.val());
                $("#name").html(snapshot.val().firstName + " " + snapshot.val().lastName);
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