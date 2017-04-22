/**
 * @name userSettings.js
 * @author Jonathan Steele - Created: 4/22/17 | LastModified: 4/22/17 - JFS
 * @summary Is the userSettings controller that allows functionality to be added to the userSettings html.
 * ---------------------------------------------------------------------------
 * @module app.controller 'userSettingsController'
 * @function ChangeName(DisplayName)
 *  | @function post("/api/SignUp/", data).then(data, response)
 * @function ChangePassword(OldPassword, NewPassword, ConfirmNewPassword)
 *  | @function post("/api/SignUp/UpdateDisplayName", data).then(data, response)
 * ---------------------------------------------------------------------------
 * @description Is the userSettings controller allows functionality to be added to the userSettings html. It
 * also allows $scope variables to created which will then allowed to be used in the html.
 **/

app.controller('userSettingsController', function($scope, $rootScope, $http, localStorageService, $location) {
  console.log("Running UserSettings Controller");

	//Root Scope Variables
	$rootScope.authUser = localStorageService.get('authUser');

  //Scope Variables
  $scope.message = 'Change your display name, profile image, or password here';
  $scope.userInfo = localStorageService.get('authUser');
  $scope.Email = $scope.userInfo.Email;
  $scope.DisplayName = $scope.userInfo.DisplayName;
  $scope.Password = $scope.userInfo.Password;

  $scope.ChangeName = function(DisplayName) {
    console.log("userSettings: ChangeName Called");
    //console.log("userSettings: ChangeName function hit passing in (" + DisplayName + ") - If value is undefined then use current Name (" + $scope.DisplayName + ")"); //Only for Debug
    $scope.NewauthUser = localStorageService.get('authUser');

    if(DisplayName == null)
    {
        $scope.NewauthUser.DisplayName = $scope.DisplayName;
    }
    else
    {
        $scope.NewauthUser.DisplayName = DisplayName;
    }
    //console.log("userSettings: NewauthUser, ", $scope.NewauthUser); //For Debug
    $http.post("/api/UserSettings/UpdateDisplayName", $scope.NewauthUser)
    .then(function(data, response) {
      console.log("userSettings: .then return data ", data.data);
      localStorageService.set('authUser', data.data);
      location.reload();
    });
  }

  $scope.ChangePassword = function(OldPassword, NewPassword, ConfirmNewPassword) {
    console.log("userSettings: ChangePassword Called", OldPassword, NewPassword, ConfirmNewPassword);
    //console.log("userSettings: ChangeName function hit passing in (" + DisplayName + ") - If value is undefined then use current Name (" + $scope.DisplayName + ")"); //Only for Debug
    //$scope.NewauthUser = localStorageService.get('authUser');

    // if(DisplayName == null)
    // {
    //     $scope.NewauthUser.DisplayName = $scope.DisplayName;
    // }
    // else
    // {
    //     $scope.NewauthUser.DisplayName = DisplayName;
    // }
    // //console.log("userSettings: NewauthUser, ", $scope.NewauthUser); //For Debug
    // $http.post("/api/UserSettings/UpdateDisplayName", $scope.NewauthUser)
    // .then(function(data, response) {
    //   console.log("userSettings: .then return data ", data.data);
    //   localStorageService.set('authUser', data.data);
    //   location.reload();
    // });
  }

});
