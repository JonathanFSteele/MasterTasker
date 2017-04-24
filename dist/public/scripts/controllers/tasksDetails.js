app.controller('taskDetailsController', function($scope, $location) {
  // create a message to display in our view
  $scope.message = 'This is the taskDetails Controller';
  console.log($location.search().id);
});
