
$(document).ready(function() {

    var userRef;
    function authDataCallback(authData) {
        if (authData) {
            userRef = new Firebase("https://ica-stem16.firebaseio.com/users/" + authData.uid);
            userRef.on("value", function(snapshot) {
                $("#firstName").val(snapshot.val().firstName);
                $("#lastName").val(snapshot.val().lastName);
                $("#location").val(snapshot.val().locationInput);
                $("#occupation").val(snapshot.val().occupation);
                $("#about").val(snapshot.val().about);
                $("#twitter").val(snapshot.val().twitter);
                $("#facebook").val(snapshot.val().facebook);
                $("#instagram").val(snapshot.val().instagram);
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
                window.location.assign('../html/Main.html');
            });


        } else {
            //window.location.assign('../html/Main.html');
        }
    }

    var ref = new Firebase("https://ica-stem16.firebaseio.com");

    ref.onAuth(authDataCallback);
    ref.offAuth(function(){

    });
    $("#save-btn").on("click", function(){
        var inputData=[
            $("#firstName").val(),
            $("#lastName").val(),
            $("#location").val(),
            $("#occupation").val(),
            $("#about").val(),
            $("#twitter").val(),
            $("#facebook").val(),
            $("#instagram").val()
        ];
        if(inputData[0] && inputData[1]){
            updaterRef.update({
                firstName: inputData[0],
                lastName: inputData[1],
                locationInput: inputData[2],
                occupation: inputData[3],
                about: inputData[4],
                twitter: inputData[5],
                facebook: inputData[6],
                instagram: inputData[7]
            });
        } else {
            $("#output").html("The First Name and Last Name fields must be filled out");
        }

    });
});