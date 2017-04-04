app.controller('tasksController', function($scope, $http, $location) {
  // create a message to display in our view
  $scope.message = 'This is the tasks Controller';
  console.log($scope.message);
   $scope.Tasks = [];

$scope.GoToTaskDetails = function(object){
  console.log("Going to Current Task Details", object.ID);
  $location.path( "/tasksDetails").search('id=' + object.ID);
}

//Go to the server ang get the json array.
$http.get("/api/Tasks/list")
.then(function(response) {
  console.log("Task response: ",response);
  $scope.Tasks = response.data;
});
});
