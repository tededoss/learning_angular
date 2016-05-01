var myApp = angular.module('myModuleName', ['ngRoute']);

myApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/view1',
        {
            controller: 'FetchController',
            templateUrl: '/html/view1.html'
        })
    .when('/view2',
        {
            controller: 'SimpleController',
            templateUrl: '/html/view2.html'
        })
    .otherwise({ redirectTo: '/view1' });
    //$locationProvider.html5Mode({
      // enabled: true,
      // requireBase: false
    //});
}]);

myApp.controller('SimpleController', function ($scope) {
    $scope.customers = [
        { name: 'John Doe', city: 'New York' },
        { name: 'John Smith', city: 'San Francisco' },
        { name: 'James McJamesFace', city: 'Nowheresville' }
    ];

    $scope.addCustomer = function () {
        $scope.customers.push({ name: $scope.newCustomer.name, city: $scope.newCustomer.city });
    };
});

myApp.controller('FetchController', ['$scope', '$http', '$templateCache',
  function($scope, $http, $templateCache) {
      $scope.method = 'GET'; 
      $scope.url = ['https://api.dapulse.com:443/v1/boards/', '', '.json?api_key=',''];
      $scope.object_type = 'pulses';
      $scope.board_id = '5833760';
      $scope.auth_key = 'de681bf6c1019ddeaaac22fd5d7e6f07';

      $scope.fetch = function() {
          $scope.data = null;
          $scope.response = null;
          $scope.url[1] = $scope.board_id + '/' + $scope.object_type;
          $scope.url[3] = $scope.auth_key;
          console.log($scope.url.join("").toString());
          $http({ method: $scope.method, url: $scope.url.join("").toString(), cache: $templateCache }).
            then(function(response) {
                $scope.status = response.status;
                $scope.data = response.data;
            }, function(response) {
                $scope.data = response.data || "Request failed";
                $scope.status = response.status;
            });
      };

}]);