/**
 * @name forgotPassword.js
 * @author Jonathan F. Steele - Created: 2/22/17 | LastModified: 4/26/17 - JFS
 * @summary This is the controller for the resetting of ones password.
 * ---------------------------------------------------------------------------
 * @module app.controller('forgotPasswordController')
 * @function cancel()
 * @function SendConfirmation()
 * @function Validate()
 * @function ResetPassword()
 * ---------------------------------------------------------------------------
 * @description This is the controller for the resetting of ones password.
 **/
app.controller('forgotPasswordController', function($scope, $http, localStorageService, $location, $rootScope) {
  console.log("forgotPasswordController Running");
  $scope.forgotPasswordStep = 0;

  //root Scope Variables
  $rootScope.LoginTF = 0; //Used within Index to Hide the Header

  //cancel function
  $scope.cancel = function(){
    $location.path( "/login" );
  }

  //SendConfirmation function
  $scope.SendConfirmation = function(){
    $scope.forgotPasswordStep = 1;
  }

  //Validate function
  $scope.Validate = function(){
    $scope.forgotPasswordStep = 2;
  }

  //ResetPassword function
  $scope.ResetPassword = function(){
    $location.path( "/login" );
  }

});
