app.controller('groupDetailsController', function($scope, $http, $location) {
  $scope.message = 'This is the group Details Controller';
  console.log($scope.message, $location.search().id);

  $http.get("/api/GroupDetails/ByID?id="+$location.search().id)
  .then(function(response) {
    console.log("GroupDetails response: ",response);
    $scope.Tasks = response.data;
  });

  // $scope.Groups = [];







});
