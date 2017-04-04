app.controller('tasksDetailsController', function($scope, $location) {
  // create a message to display in our view
  $scope.message = 'This is the tasksDetails Controller';
  console.log($location.search().id);
});
