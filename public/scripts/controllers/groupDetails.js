app.controller('groupDetailsController', function($scope, $http, $location) {
  $scope.message = 'This is the group Details Controller';
  console.log($scope.message, $location.search().id);

  $http.get("/api/GroupDetails/ByID?id="+$location.search().id)
  .then(function(response) {
    console.log("GroupDetails response: ",response);
    $scope.DisplayName = response.data[0].DisplayName;
    $scope.Description = response.data[0].Description;
  });

  $http.get("/api/GroupDetails/GroupMembers?id="+$location.search().id)
  .then(function(response) {
    console.log("GroupMembers response: ", response);
    $scope.GroupMembers = response.data;
  });


  // $scope.Groups = [];







});
