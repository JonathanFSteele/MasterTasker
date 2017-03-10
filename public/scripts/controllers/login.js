app.controller('loginController', function($scope) {

  // create a message to display in our view
  $scope.message = 'This is the login Controller';
  console.log("loginController Running");

  $scope.login = function(email, password){
    console.log("login function called", email, password);
  };


});
