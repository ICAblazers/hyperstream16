/**
 * Created by admin on 3/30/16.
 */
// Create a callback which logs the current auth state
$(document).ready(function() {
    function authDataCallback(authData) {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
            console.log("User is logged out");
        }
    }

// Register the callback to be fired every time auth state changes
    var ref = new Firebase("https://sizzling-fire-7136.firebaseio.com");
    ref.onAuth(authDataCallback);

    $("#register-submit").onclick = function(){
            ref.createUser({
                email: $("#email").value,
                password: $("#reg-password").value
            }, function(error, userData) {
                if (error) {
                    switch (error.code) {
                        case "EMAIL_TAKEN":
                            console.log("The new user account cannot be created because the email is already in use.");
                            break;
                        case "INVALID_EMAIL":
                            console.log("The specified email is not a valid email.");
                            break;
                        default:
                            console.log("Error creating user:", error);
                    }
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                }
            });



    }


    }
)
