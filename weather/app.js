var app = angular.module('weatherApp', []);

app.controller('weatherCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
  function fetchWeather(city) {
    weatherService.getWeather(city).then(function(data){
      $scope.place = data;
    }); 
  }
  
  fetchWeather('bangalore,in');
  
  $scope.findWeather = function(city) {
    $scope.place = '';
    fetchWeather(city);
  };
}]);

app.factory('weatherService', ['$http', '$q', function ($http, $q){
  function getWeather (city) {
    var deferred = $q.defer();
    $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text=%27' + city + '%27)&format=json&callback=')
      .success(function(data){
console.log(data);
        deferred.resolve(data.query.results.channel);
      })
      .error(function(err){
        console.log('Error retrieving weather');
console.log(err);
        deferred.reject(err);
      });
    return deferred.promise;
  }
  
  return {
    getWeather: getWeather
  };
}]);


                
