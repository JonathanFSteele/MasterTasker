app.controller('tasksDetailsController', function($scope, $location) {
  // create a message to display in our view
  $scope.message = 'This is the tasksDetails Controller';
  $scope.myDate = new Date();

  $scope.save = function(){
    console.log("Saved: ", $scope.myDate);
  }

  console.log($location.search().id);
});
