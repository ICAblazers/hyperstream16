
$(document).ready(function() {
    var locationInput = document.getElementById("location");
    var locationOutput;
    var locationEdited = false
    var autocomplete = new google.maps.places.Autocomplete(locationInput);

    google.maps.event.addListener(autocomplete, "place_changed", function(){
       var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }
        locationOutput={
            _formatted_address: place.formatted_address,
            _lat: place.geometry.location.lat(),
            _lng: place.geometry.location.lng()
        };
        locationEdited = true;
    });





    var userRef;
    function authDataCallback(authData) {
        if (authData) {
            userRef = new Firebase("https://ica-stem16.firebaseio.com/users/" + authData.uid);
            userRef.on("value", function(snapshot) {
                $("#firstName").val(snapshot.val().firstName);
                $("#lastName").val(snapshot.val().lastName);
                $("#location").val(snapshot.val().location_address);
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
    ref.offAuth(function(){});
    $("#save-btn").on("click", function(){
        var inputData=[
            $("#firstName").val(),
            $("#lastName").val(),
            $("#occupation").val(),
            $("#about").val(),
            $("#twitter").val(),
            $("#facebook").val(),
            $("#instagram").val()
        ];
        if(inputData[0] && inputData[1]){
            userRef.update({
                firstName: inputData[0],
                lastName: inputData[1],
                occupation: inputData[2],
                about: inputData[3],
                twitter: inputData[4],
                facebook: inputData[5],
                instagram: inputData[6]
            });
            if(locationEdited){
                userRef.update({
                    location_address: locationOutput._formatted_address,
                    location_lat: locationOutput._lat,
                    location_lng: locationOutput._lng
                });
            }
            window.location.assign('../html/Profile.html');
        } else {
            $("#output").html("The First Name and Last Name fields must be filled out");
        }

    });
});