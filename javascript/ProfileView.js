/**
 * Created by bchal on 4/13/2016.
 */
$(document).ready(function() {
    function loadData() {
        id = getQueryVariable("id");
        if(id){
            var userRef = new Firebase("https://ica-stem16.firebaseio.com/users/" + id);
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
    loadData();
});
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}