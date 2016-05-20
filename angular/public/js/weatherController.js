(function(){
	weatherApp.controller('weatherController', ["$scope", "$http", function($scope, $http){

		var apiUrl = "http://localhost:4000/api/forecast/";
		$scope.zipCode = "35244";
		$scope.forecast = {};

		$scope.getForecast = function(){
			//clear forecast
			$scope.forecast = {};
			//alert("getting forecast for :" + $scope.zipCode);
			var url = apiUrl + $scope.zipCode;
			//alert(url);
			$http.get(url)
			.then(function(response){
				$scope.forecast = response.data;
				//alert(angular.toJson($scope.forecast));
			})
			.catch(function(err){
				alert("failed to retrieve forecast: " + angular.toJson(err));
			});
		}

	}]);
})();