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
    console.log($scope.registrationForm);
    
    $http.post('http://127.0.0.1:8000/shark/registration', { newRule: $scope.registrationForm })
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

myApp.controller('requestController',['$scope','$http', function($scope,$http){
  $scope.name='jsn';
  console.log($scope.name);
  
  $scope.requestf = function () {
    console.log($scope.request);
    $scope.request.session_id = 'asndsjk';
       console.log($scope.request);
    $http.post('http://127.0.0.1:8000/shark/request', { data: $scope.request})
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

myApp.controller('loginController',['$scope','$http', '$q',function($scope,$http,$q){
  $scope.name='jsn';
    console.log("dsnfjksjkf");
    $scope.session_id='';
  console.log($scope.name);
  $scope.login = '';
  $scope.loginf = function () {
    var result = $q.defer();
    console.log("dsnfjksjkf");
    var _this = this;
    console.log($scope.login);
    $http.post('http://127.0.0.1:8000/shark/login', {data: $scope.login}).then(function (data) {
      
      if(data.status) {
        $scope.session_id = data.session_id;
        
      }
      
      
      result.resolve(data);
      
    }, function () {
      result.reject();
    });
    
    return result.promise;
  };
}



]);