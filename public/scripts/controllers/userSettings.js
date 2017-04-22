/**
 * @name userSettings.js
 * @author Jonathan Steele - Created: 4/22/17 | LastModified: 4/22/17 - JFS
 * @summary Is the userSettings controller that allows functionality to be added to the userSettings html.
 * ---------------------------------------------------------------------------
 * @module app.controller 'userSettingsController'
 * @function ~none~
 * ---------------------------------------------------------------------------
 * @description Is the userSettings controller allows functionality to be added to the userSettings html. It
 * also allows $scope variables to created which will then allowed to be used in the html.
 **/

app.controller('userSettingsController', function($scope, $rootScope, $http, localStorageService, $location) {
  console.log("Running UserSettings Controller");
		// Root Variables
		$rootScope.authUser = localStorageService.get('authUser');
  // create a message to display in our view
  $scope.message = 'Change your display name, profile image, or password here';
  console.log($scope.message);
  $scope.object = localStorageService.get('authUser');
  $scope.Email = $scope.object.Email;
  $scope.DisplayName = $scope.object.DisplayName;
  $scope.Password = $scope.object.Password;

  /*
app.directive('gravatar', function() {
  return {
    restrict: 'AE',
    replace: true,
      scope: {
        name: '@',
        height: '200px',
        width: '200px',
        emailHash: '@'
      },
    link: function(scope, el, attr) {
      scope.defaultImage = '/public/images/user-default.png';
    },
   template: '<img alt="{{ name }}" height="{{ height }}"  width="{{ width }}" src="https://secure.gravatar.com/avatar/{{ emailHash }}.jpg?s={{ width }}&d={{ defaultImage }}">'
  };
});
*/
  /*
  $http.get("/api/UserSettings/Account")
  .then(function(response) {
    console.log("Users response: ",response);
    $scope.displayName = response.data[0].DisplayName;
    $scope.userEmail = response.data[0].Email;
    $scope.userImage = response.date[0].ImageURL;
  });
  */
  /*
  $scope.changeUser = function(DisplayName, Email, Password, ImageURL, DeleteDT){
    console.log("User function called", DisplayName, Email, Password, ImageURL, DeleteDT);
    var data = {"DisplayName": DisplayName, "Email": Email, "Password": Password, "ImageURL": ImageURL, "DeleteDT": DeleteDT};
    console.log("data: ", data);
    var message="";
    $http.post("/api/UserSettings/Account", data)
    .then(function(data, response) {
      console.log("data: ", data);
      if(data.data.authorizedTF == true)
      {
        console.log("Updating user settings...");
        $scope.messageType = 2;
        $scope.message = "Updating user settings...";
        $location.path( "/userSettings" );
      }
      if(data.data.authorizedTF == false)
      {
        console.log("Error, Stay on Page!");
        $scope.message = "You are not authorized to change the user settings at this time.";
        $scope.messageType = 1;
      }
    });
  };
  */
});
