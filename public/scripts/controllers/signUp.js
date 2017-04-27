/**
 * @name signUp.js
 * @author Jonathan F. Steele - Created: 2/22/17 | LastModified: 4/26/17 - JFS
 * @summary This is the Controller for creating a New user.
 * ---------------------------------------------------------------------------
 * @module app.controller('signUpController')
 * @function SignUp(DisplayName, Email, Password)
 *  | @function $http.post("/api/SignUp/", data)
 *    | @function .then(function(data, response))
 * @function cancel() -- Sends user back to login Page
 * ---------------------------------------------------------------------------
 * @description This is the Controller for creating a New user. Allows the user to input an Email, Password, and
 * DisplayName. Will send the user back to the Login Page to login with new created account after filling out
 * all the inputs.
 **/
app.controller('signUpController', function($scope, $http, localStorageService, $location, $rootScope) {
  console.log("signUpController Running");

  //root Scope Variables
  $rootScope.LoginTF = 0; //Used within Index to Hide the Header

  //Scope Variables
  $scope.BadSignUp = false; //Used for Errors on Html Side
  $scope.ErrorMessage = "";

  //signUp Function
  $scope.signUp = function(DisplayName, Email, Password, ConfirmPassword){
    console.log("signUp function called", DisplayName, Email, Password, ConfirmPassword);
    $scope.LoginClicked = true;
    if(DisplayName == null || Email == null || Password == null || ConfirmPassword == null)
    {
      console.log("signUpController: Nothing was filled in so stay on the Page");
      $scope.ErrorMessage = "All input fields needs to be filled out properly.";
      $scope.BadSignUp = true;
      return;
    }
    if(ConfirmPassword != Password)
    {
      console.log("signUpController: Passwords do not match!");
      $scope.ErrorMessage = "Passwords do not match. Please try again.";
      $scope.BadSignUp = true;
      return;
    }
    var data = {"DisplayName": DisplayName, "Email": Email, "Password": Password};
    console.log("data: ", data);
    //Create a New User Post
    $http.post("/api/SignUp/", data)
    .then(function(data, response) {
      console.log("data: ", data);
      if(data.data.authorizedTF == true)
      {
        console.log("Signing up...");
        $location.path( "/login" );
      }
      else
      {
        console.log("Error, Stay on Page!");
        $scope.ErrorMessage = "That Email already exists.";
        $scope.BadSignUp = true;
        return;
      }
    });
  };

  //cancel Function
  $scope.cancel = function(){
    $location.path( "/login" );
  }

});
