/**
 * @name tasks.js
 * @author Charles Choi - Created: 3/22/17 | LastModified: 4/27/17 - JFS
 * @summary This is the controller for the tasks.js page to allow users to edit and create task/groups.
 * ---------------------------------------------------------------------------
 * @module app.controller tasksController($scope, $http, $location)
 * @function CreateNewTask()
 * @function GoToTaskDetails(object)
 * @function CurrentSelectedGroup(ID)
 * @function CompleteTask()
 * @function GoToGroupsDetails()
 * @function getTasks()
 * @function $http.get("/api/Groups/List")
 *  | @function .then(response)
 * ---------------------------------------------------------------------------
 * @description This is the controller for the tasks.js page to allow users to edit and create task/groups.
 * It allows a search functionality and the user to mark off tasks with a checkbox. Users organize their
 * tasks through a group dropdown or they can just display ALL.
 **/
app.controller('tasksController', function($scope, $http, $location, $rootScope) {
  $scope.message = 'This is the tasks Controller';
  console.log($scope.message);

  //Scope Variables
   $scope.Tasks = [];
   $scope.currentGroupID = 0;
   $scope.ShowCompletedTF = false;

   //CreateNewTask function
   $scope.CreateNewTask = function() {
     console.log("tasksController: CreateNewTask Function Hit");
     bootbox.prompt({
         title: "Enter the Name of your Task",
         inputType: 'text',
         callback: function (result) {
           if(result == null)
           {
             return; //Return when Cancel was clicked so it doesnt create just random empty Tasks
           }
           console.log("tasksController: CreateNewTask callback result - ", result);
           $scope.newTask = {'TaskName': result, 'GroupID': $scope.currentGroupID, 'OwnerID': $rootScope.authUser.UserID};
           console.log("tasksController: CreateNewTask callback result - ", $scope.newTask);
           //Post for Creating a new Task
           $http.post("/api/Tasks/CreateNewTask", $scope.newTask)
            .then(function(data, response) {
              console.log("tasksController: .then response data, ", data.data, response);
              $location.path( "/tasks/taskDetails").search('id=' + data.data.RowID);
             });
         },
     });
   }

  //Initialization of GoToTaskDetails function passing in an object
  $scope.GoToTaskDetails = function(ID){
    console.log("tasksController: Going to Current Task Details, ", ID);
    $location.path( "/tasks/taskDetails").search('id=' + ID);
  }

  //Initialization of CurrentSelectedGroup function passing in an ID
  $scope.CurrentSelectedGroup = function(ID){
    $scope.currentGroupID = ID;
    console.log("tasksController: Current Group by ID, ", $scope.currentGroupID);
    $scope.getTasks();
  }

  //CompleteTaskFunction Called!
  $scope.CompleteTask = function( id, tf ) {
    console.log("Complete Task Function Called!");
    var user = $rootScope.authUser.UserID;
    $scope.newTask = {'id': id, 'UserID': user};
    console.log("tasksController: Complete Task callback result - ", $scope.newTask);
    //Post for Creating a new Task

    if ( tf == true)
    {
      $http.post("/api/Tasks/CompleteTaskT", $scope.newTask)
      .then(function(data, response) {
          $scope.getTasks();
       });
    }
    if (tf == false)
    {
      $http.post("/api/Tasks/CompleteTaskF", $scope.newTask)
      .then(function(data, response) {
          $scope.getTasks();
       });
    }
  }

  //Initialization of GoToGroupDetails function
  $scope.GoToGroupsDetails = function(){
    console.log("tasksController: Going to Current Task Details");
    $location.path( "/groups/groupDetails").search('id=0');
  }

  //Initialization of getTasks function //Go to the server ang get the json array.
  $scope.getTasks = function(){
    console.log("tasksController: ShowCompletedTF, ", $scope.ShowCompletedTF);
    console.log("tasksController: getTasks function");
    $scope.TaskData = {'currentGroupID': $scope.currentGroupID, 'ShowCompletedTF':$scope.ShowCompletedTF, "UserID": $rootScope.authUser.UserID};
    $http.post("/api/Tasks/List", $scope.TaskData)
    .then(function(response) {
      console.log("tasksController: Task response, ",response);
      $scope.Tasks = response.data;
    });
  };
  $scope.getTasks();

  //$http.get function which generates the Group Dropdown
  $http.get("/api/Groups/List")
  .then(function(response) {
    console.log("tasksController: Group response, ",response);
    var defaultGroup = {
      "ID":0,
      "DisplayName":"ALL",
      }
    response.data.unshift(defaultGroup);
    console.log("tasksController: Group response, ",response);

    $scope.Groups = response.data;
    $scope.currentGroupID = 0;
  });
});
