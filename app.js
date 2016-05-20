var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//opt for services
app.use(bodyParser.urlencoded({ extend: false }));
app.use(express.static(__dirname + "/angular/public"));

//intialize custom services
var weather = require("./weather");
weather.init(app);

app.get("/", function(req,res){
	res.sendFile("angular/views/forecast.html", {root: __dirname });
});

http.createServer(app).listen(4000);

console.log("listening on 4000");