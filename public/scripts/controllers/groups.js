scotchApp.controller('groupsController', function($scope, $http) {
  $scope.message = 'This is the groups Controller';

  $scope.contacts = [];

  //Go to the server ang get the json array.
  $http.get("/api/users/list")
  .then(function(response) {
    console.log("response: ",response);
    $scope.contacts = response.data;
  });

  //Local JSON array
  // $scope.contacts = [
  //   {
  //     Name: "Jonathan",
  //     Email: "jonathan@steeleconsult.com",
  //   },
  //   {
  //     Name: "Charles",
  //     Email: "Charles@nmsu.edu",
  //   },
  //   {
  //     Name: "Zach",
  //     Email: "Zach@nmsu.edu",
  //   },
  //   {
  //     Name: "Loya",
  //     Email: "Loya@nmsu.edu",
  //   }
  // ]





});
