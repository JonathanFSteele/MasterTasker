app.controller('forgotPasswordController', function($scope, $http, localStorageService, $location, $rootScope) {
  console.log("forgotPasswordController Running");
  $scope.forgotPasswordStep = 0;

  $scope.cancel = function(){
    $location.path( "/login" );
  }

  $scope.SendConfirmation = function(){
    $scope.forgotPasswordStep = 1;
  }

  $scope.Validate = function(){
    $scope.forgotPasswordStep = 2;
  }

  $scope.ResetPassword = function(){
    $location.path( "/login" );
  }

});
