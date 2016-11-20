var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function ($routeProvider) {
  console.log("hello");
  $routeProvider
    .when("/", {
      templateUrl: "index.htm"
    })
    .when("/login.html", {
      templateUrl: "login.html"
    })
    .when("/request", {
      templateUrl: "request.html"
    });
});

myApp.controller('registerController', ['$scope', '$http', function ($scope, $http) {
  $scope.name = 'jsn';
  $scope.registrationForm = '';
  console.log($scope.name);

  $scope.completeRegistration = function () {
    console.log("dnjskhsjk");
    console.log($scope.registrationForm);

    $http.post('/shark/registration', $scope.registrationForm)
      .success(function (result) {
        console.log("1");
        console.log(result);
      })
      .error(function (data, status) {
        console.log("2");
        console.log(status);
        console.log(data);
      });
  };
}
]);

myApp.controller('loginController', ['$scope', '$http', function ($scope, $http) {


  $scope.loginf = function () {

    $http.post('/shark/login', $scope.login).then(function (response) {
        console.log("1");
        console.log(response);
        localStorage.setItem('session',response.data.sessionId);
    });
  };

}]);

myApp.controller('requestController', ['$scope', '$http', function ($scope, $http) {

  $scope.requestf = function () {

    
    console.log(localStorage.getItem('session'));
      
      var sessionId = localStorage.getItem('session');
        $scope.request.session_id = sessionId;

    $http.post('/shark/request', $scope.request)
      .success(function (result) {
        console.log("1");
        console.log(result);

      })
      .error(function (data, status) {
        console.log("2");
        console.log(status);
        console.log(data);
      });
  };
}]);

