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
    }
)
