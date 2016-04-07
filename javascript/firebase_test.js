/**
 * Created by admin on 3/30/16.
 */
// Create a callback which logs the current auth state
$(document).ready(function () {
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

    $("#register-submit").on('click', function () {
        var firstName = $("#firstname")[0].value;
        var lastName = $("#lastname")[0].value;
        var userName = $("#username")[0].value;
        var email = $("#email")[0].value;
        var pass = $("#reg-password")[0].value;
        var passConfirm = $("#confirm-password")[0].value;

        var inputData = [firstName, lastName, userName, email, pass, passConfirm];

        if (firstName && lastName && userName && email && pass && passConfirm && pass == passConfirm) {
            ref.createUser({
                "email": email,
                "password": pass
            }, function (error, userData) {
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
        } else {

        }
    });
    var inputError=function(inputData){
        var outputA = "Please fill out the required fields: \n";
        var outputB;
        var output;

        switch (false) {
            case inputData[0]:
                outputA += "     First Name \n";
            case inputData[1]:
                outputA += "     Last Name \n";
            case inputData[2]:
                outputA += "     Username \n";
            case inputData[3]:
                outputA += "     Email \n";
            case inputData[4]:
                outputA += "     Password \n";
            case inputData[5]:
                outputA += "     Confirm Password \n";
            case inputData[4] == inputData[5]:
                outputB += "\nPlease make sure the Password and Confirm Password fields match.";
                break;
            default:
                outputA = "An error occurred.  Please make sure the fields are correctly filled and try again";
                break;

            output = outputA + outputB;
            return output;
        }
    }
});
