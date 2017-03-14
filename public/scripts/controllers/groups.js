app.controller('groupsController', function($scope, $http) {
  $scope.message = 'This is the groups Controller';
  console.log($scope.message);
  // $scope.Groups = [];

  // //Go to the server ang get the json array.
  // $http.get("/api/Groups/list")
  // .then(function(response) {
  //   console.log("group response: ",response);
  //   $scope.Groups = response.data;
  // });

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
