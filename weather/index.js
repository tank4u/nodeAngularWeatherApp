(function(weather){

	var util = require("util");
	var http = require("http");
	var mapper = require("../mapper")

	var forecastUrlFormat = "http://api.openweathermap.org/data/2.5/forecast/daily?q=%s,us&units=%s&cnt=5&mode=json&appid=e6abd0c1147e87d30da57fcc08aebdb1";
	
	weather.init = function(app){
		app.get("/api/forecast/:zipcode", function(req,res){
			
			var zipCode = req.params.zipcode;

			//read query string parameter
			var units = req.query.units;			
			if(!units) { 
				units = 'imperial'
			};

			//build final Url
			var forecastUrl = util.format(forecastUrlFormat, zipCode, units);

			//console.log(forecastUrl);

			executeHttp(forecastUrl, function(data, err){
				if(err){
					res.send(401, "bad request");
				};

				data = JSON.parse(data);
				//transform img url
				mapper.fixIconUrl(data.list);

				res.send(data); //just res.send(response) throws "TypeError: Converting circular structure to JSON"
				
			});			
		});
	}	

	function executeHttp(url, next) {
		http.get(url, function(response){	
			var data = [];
			response.on('data', function(chunk){
				data.push(chunk);
			});	
			response.on('end', function(){
				data = Buffer.concat(data).toString();
				next(data);
			});			
		})
		.on('error', function(err){
			console.log(err);
			next(null, err);
		});
	}

})(module.exports);

	/* 
	units - metric, imperial

	Image url: http://openweathermap.org/img/w/10d.png

	http://api.openweathermap.org/data/2.5/forecast?q=35244,us&units=imperial&mode=json&appid=e6abd0c1147e87d30da57fcc08aebdb1

	http://api.openweathermap.org/data/2.5/forecast/daily?q=35244,us&units=imperial&cnt=5&mode=json&appid=e6abd0c1147e87d30da57fcc08aebdb1*/
	