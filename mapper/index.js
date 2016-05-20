(function(mapper){

	var util = require("util");
	var _ = require("lodash");

	var imageUrlFormat = "http://openweathermap.org/img/w/%s.png";

	mapper.fixIconUrl = function(list){
		_.forEach(list, function(item){
					//console.log(item.weather[0].icon);
					item.weather[0].icon = util.format(imageUrlFormat,item.weather[0].icon);
					//console.log(item.weather[0].icon);
					item.dt = item.dt * 1000;
				});
	};

})(module.exports);