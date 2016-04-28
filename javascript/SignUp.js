/**
 * Created by admin on 3/30/16.
 */
// Create a callback which logs the current auth state
$(document).ready(function () {
// Register the callback to be fired every time auth state changes
    var ref = new Firebase("https://ica-stem16.firebaseio.com");

    $("#register-submit").on('click', function () {
        var firstName = $("#firstname")[0].value;
        var lastName = $("#lastname")[0].value;
        var email = $("#email")[0].value;
        var pass = $("#reg-password")[0].value;
        var passConfirm = $("#confirm-password")[0].value;
        var inputData = [firstName, lastName, email, pass, passConfirm];
        var loginInfo = {
            "email": email,
            "password": pass
        };
        var output="";


        if (firstName && lastName && email && pass && passConfirm && pass == passConfirm && pass.length >= 7 && pass.length < 100) {
            ref.createUser({
                "email": email,
                "password": pass
            }, function(error, userData) {
                if (error) {
                    output += error;
                } else {
                    onReg(userData, inputData, loginInfo);
                }
                $("#output").html("<p class='error'>" + output + "</p>");
            });
        } else {
            output += inputError(inputData);
            $("#output").html("<p class='error'>" + output + "</p>");
        }
    });
    var inputError=function(inputData){
        var outputA = "";
        var outputB = "";
        var outputC = "";
        var passMatch = inputData[3] == inputData[4];
        var missingFieldsInit = false;


        if (!passMatch){
            outputB += "<br/>Please make sure the Password and Confirm Password fields match.<br/>";
        }
        switch (true) {
            case inputData[0] == "":
                if (!missingFieldsInit){
                    outputA = "Please fill out the required fields: <br/>";
                    missingFieldsInit = true;
                }
                outputA += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;First Name <br/>";
            case inputData[1] == "":

                if (!missingFieldsInit){
                    outputA = "Please fill out the required fields: <br/>";
                    missingFieldsInit = true;
                }
                outputA += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name <br/>";
            case inputData[2] == "":
                if (!missingFieldsInit){
                    outputA = "Please fill out the required fields: <br/>";
                    missingFieldsInit = true;
                }
                outputA += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email <br/>";
            case inputData[3] == "":
                if (!missingFieldsInit){
                    outputA = "Please fill out the required fields: <br/>";
                    missingFieldsInit = true;
                }
                outputA += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password <br/>";
            case inputData[4] == "":
                if (!missingFieldsInit){
                    outputA = "Please fill out the required fields: <br/>";
                    missingFieldsInit = true;
                }
                outputA += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Confirm Password <br/>";
            case inputData[3].length < 7 || inputData[4].length >= 100 :
                outputC = "<br>Your password must be more than 7 and less than 100 characters long";
            case !passMatch:
                break;
            default:
                outputA = "An error occurred.  Please make sure the fields are correctly filled and try again";
                break;
        }


        var returnOutput = outputA + outputB + outputC;
        return returnOutput;
    };





    $("#login-submit").on('click', function () {
        var email = $("#email-login")[0].value;
        var pass = $("#password-login")[0].value;
        var loginOutput = "";
        if(email && pass){
            ref.unauth();
            ref.authWithPassword({
                "email": email,
                "password": pass
            }, function(error, authData) {
                if (error) {
                    loginOutput = "Login Failed!" + error;
                } else {
                    window.location.replace('../html/Main.html');
                }
                $("#login-output").html("<p class='error'>" + loginOutput + "</p>");
            });
        } else {
            loginOutput = "Please make sure all fields are filled out and try again";
            $("#login-output").html("<p class='error'>" + loginOutput + "</p>");
        }
    });

    var onReg = function (userData, inputData, loginInfo) {
        var usersRef = new Firebase("https://ica-stem16.firebaseio.com/users");
        var uidRef = usersRef.child(userData.uid);
        uidRef.set({
            firstName: inputData[0],
            lastName: inputData[1],
            email: inputData[2],
            occupation: "",
            about: "",
            twitter: "",
            facebook: "",
            instagram: "",
            location_address: "",
            location_lat: "",
            location_lng: ""
        }, function () {
            ref.authWithPassword(loginInfo, function () {
                window.location.assign('../html/Profile.html');
            })
        });
    }
});
