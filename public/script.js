document.getElementById("submit").addEventListener("click", function() {
    route = document.getElementById("routes").value;
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerHTML = "Fetching Route Information for Route #" + route;
    document.getElementById("message")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            displayRoutes(json.bus)
            document.getElementById("message").innerHTML = "Route Info for Route #" + route + " OBTAINED";
            document.getElementById("message").style.color = "green";
        }
    }
    var URL = "./getroute?" + "route=" + route;
    xhttp.open("GET",URL,true);
    xhttp.setRequestHeader("Content-Type", "applications/json/charset=UTF-8");
    xhttp.send();
    
})

function displayRoutes(json) {
    document.getElementById("display").innerHTML = "";
    for (i = 0; i < json["length"]; i++) {
        var pId = "ontime"
        var delay = ""
        var direction = json[i]["Direction"];
        var destination = json[i]["destination"];
        var late = json[i]["late"];
        var message = "Direction: " + direction + ", Destination: " + destination
        if (late < 0) {
            pId = "early"
            message += ", Early: " + Math.abs(late) + " minutes";
        } else if (late > 0) {
            pId = "late"
            message += ", Delay: " + late + " minutes";
        } else {
            message += ", On Time"
        }
        var newP = document.createElement("p");
        newP.id = pId;
        newP.innerHTML = message;
        document.getElementById("display").appendChild(newP);
    }
}