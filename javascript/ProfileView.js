/**
 * Created by bchal on 4/13/2016.
 */
$(document).ready(function() {
    function loadData() {
            var userRef = new Firebase("https://ica-stem16.firebaseio.com/users/" + window.location.hash);
            userRef.on("value", function(snapshot) {
                console.log(snapshot.val());
                $("#name").html(snapshot.val().firstName + " " + snapshot.val().lastName);
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
                window.location.assign('../html/Main.html');
            });
        };


    loadData();
});