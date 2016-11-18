var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function($routeProvider) {
  console.log("hello");
  $routeProvider
  .when("/", {
    templateUrl : "index.htm"
  })
  .when("/login.html", {
    templateUrl : "pages/login.html"
  });
});

myApp.controller('registerController',['$scope','$http', function($scope,$http){
  $scope.name='jsn';
  $scope.registrationForm = '';
  console.log($scope.name);
  
  $scope.completeRegistration = function () {
    console.log("dnjskhsjk");
    console.log($scope.registrationForm);
    
    $http.post('http://127.0.0.1:8000/shark/registration', $scope.registrationForm )
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

myApp.controller('loginController',['$scope','$http','caching','$rootScope' ,function($scope,$http,caching,$rootScope){
  
  $rootScope.man='';
  $scope.loginf = function () {
    $rootScope.man="fkjrjtjkrt";
    $scope.man = caching.name;
    $http.post('http://127.0.0.1:8000/shark/login', $scope.login).then(function (response) {
      console.log(response.data.sessionId);
      caching.set(response.data.sessionId);
      var c = caching.get();
      console.log(c);
      console.log("he");
      
      
      
    });
  };
  
}]);

myApp.controller('requestController',['$scope','$http','caching','$rootScope' ,function($scope,$http,caching,$rootScope){
  
  var c = caching.get();
  console.log(c);
  $scope.requestf = function () {
    
    console.log($rootScope.man);
    console.log(caching.name);
    $http.post('http://127.0.0.1:8000/shark/request',  $scope.request)
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



myApp.service('caching', function () {
  var saveData = null;
  
  console.log("welcome");
  
  return {
    get:function(){
      console.log(saveData);
      return saveData;
    },
    set:function(value){
      saveData = value;
      
    }
  };
  
});