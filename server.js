var express = require("express");
var request = require("request");
var app = express();



app.use(express.static("public"));

app.listen(8080);

var validRoutes = ['6', '14', '17', '20', '23'];

app.get("/getroute", function(req, res) {
    if ((validRoutes.includes(req.query.route)) == false) {
        console.log("Not a valid route");
        return;
    }
    var URL = "http://www3.septa.org/hackathon/TransitView/" + req.query.route;
    request.get(URL, function(error, response, body) {
        res.type("application/json");
        res.send(body);
    })
})

