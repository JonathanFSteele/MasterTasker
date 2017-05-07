/**
 * @name Tasks.js
 * @author Charles Choi - Created: 3/10/17 | LastModified: 4/27/17 - JFS
 * @summary This is the server controller for tasks.js which sends posts, gets, and deletes to the server.
 * ---------------------------------------------------------------------------
 * @module ~None~
 * @function router.db_getTasksList(GroupID, UserID)
 * @function router.db_CreateNewTask(TaskName, GroupID, OwnerID)
 * @function router.use(function timeLog(req, res, next))
 * @function router.get('/', function(req, res))
 * @function router.get('/List', function(req, res))
 *  | @function .then(function(rows)), function(error)
 * @function router.post('/CreateNewTask', function(req, res))
 *  | @function .then(function(rows)), function(error)
 * ---------------------------------------------------------------------------
 * @description This is the server controller for tasks.js which sends posts, gets, and deletes to the server.
 **/
var express = require('express');
var authentication = require('express-authentication')
var mysql = require("mysql");
var q = require('q');
var router = express.Router();

//SQL Query functions:
router.db_getTasksList = function(GroupID, ShowCompletedTF, UserID)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  if ( ShowCompletedTF == true) {
  if(GroupID == 0)
    {
        var query_str = "SELECT * FROM tldb.Tasks_vw WHERE GroupUserID = ? AND CompletedTF = 1";
        var query_var = [UserID];
    }
  else
    {
        var query_str = "SELECT * FROM tldb.Tasks_vw WHERE GroupID = ? AND GroupUserID = ? AND CompletedTF = 1";
        var query_var = [GroupID, UserID];
    }
  }
  else {
    if(GroupID == 0)
    {
       var query_str = "SELECT * FROM tldb.Tasks_vw WHERE GroupUserID = ? AND CompletedTF = 0";
       var query_var = [UserID];
   }
else
    {
       var query_str = "SELECT * FROM tldb.Tasks_vw WHERE GroupID = ? AND GroupUserID = ? AND CompletedTF = 0";
       var query_var = [GroupID, UserID];
   }
}

  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
      connection.end();
  });
  return deferred.promise;
}; //end db_getTasksList()

router.db_CreateNewTask = function(TaskName, GroupID, OwnerID)
{
  console.log("Tasks: Creating A New Task ", TaskName, GroupID, OwnerID);
  var deferred = q.defer();
  var date = new Date();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "INSERT INTO tldb.Tasks_tbl (TaskName, GroupID, OwnerID, CompletedTF, DueDT) VALUES ( ?, ?, ?, 'false', ?);";
  var query_var = [TaskName, GroupID, OwnerID, date];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
      connection.end();
  });
  return deferred.promise;
}; //end db_CreateNewTask()

router.db_CompleteTaskT = function(id, UserID)
{
  var deferred = q.defer();
  var connection = mysql.createConnection(router.dbConfig);
  var date = new Date();
  var query_str = "UPDATE `tldb`.`Tasks_tbl` SET `LastUpdateUser`=?, `LastUpdateDT`=?, `CompletedTF`=1 WHERE `ID`= ?;";
  var query_var = [ UserID, date, id];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
      connection.end();
  });
  return deferred.promise;
}; //end db_CreateNewTask()


router.db_CompleteTaskF = function(id, UserID)
{
  var deferred = q.defer();
  var connection = mysql.createConnection(router.dbConfig);
  var date = new Date();
  var query_str = "UPDATE `tldb`.`Tasks_tbl` SET `LastUpdateUser`=?, `LastUpdateDT`=?, `CompletedTF`=0 WHERE `ID`= ?;";
  var query_var = [ UserID, date, id];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
      connection.end();
  });
  return deferred.promise;
}; //end db_CreateNewTask()


//Routes for this module:
router.use(function timeLog (req, res, next) {
  console.log('Tasks Module Started: ', Date.now())
  next()
})

// define the Users default route
router.get('/', function (req, res) {
  res.send('Tasks')
})

// define the List route
router.post('/List', function (req, res) {
  var result = [];
  //console.log("req user record: ",req.authentication);
  router.db_getTasksList( req.body.currentGroupID, req.body.ShowCompletedTF, req.body.UserID)
   .then(function(rows){
     console.log('rows result',rows);
     res.send(rows);
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})

router.post('/CreateNewTask', function (req, res) {
  var response = {
    RowID: '',
    TaskName: '',
    GroupID: '',
    UserID: '',
    message: ''
  }
  var badResponse = {
    authorizedTF: false,
    message: "Incorrect User Parameters"
  }
    router.db_CreateNewTask(req.body.TaskName, req.body.GroupID, req.body.OwnerID)
    .then(function(data){
      console.log("Tasks: creating: req.body items ",req.body);
      console.log("Tasks: created new task", req.body.TaskName);
      console.log("\n\nTasks: Created Task response - ", data);
      console.log("\nTasks: Created Task response insertID - ", data.insertId);
      response.RowID = data.insertId;
      response.TaskName = req.body.TaskName;
      response.message = "Task Created";
      response.GroupID = req.body.GroupID;
      response.UserID = req.body.OwnerID;
      res.send(response);
    },function(error){
      console.log(error);
      res.status(500).send(error);
    });
})

router.post('/CompleteTaskT', function (req, res) {
  var response = {
    id: '',
    UserID: '',
  }
  var badResponse = {
    authorizedTF: false,
    message: "Incorrect User Parameters"
  }
    router.db_CompleteTaskT(req.body.id, req.body.UserID)
    .then(function(data){
      console.log("Tasks: completeing: task req.ID ", req.body.id);
      response.id = req.body.id;
      response.UserID = req.body.UserID;
      res.send(response);
    },function(error){
      console.log(error);
      res.status(500).send(error);
    });
    })

    router.post('/CompleteTaskF', function (req, res) {
      var response = {
        id: '',
        UserID: '',
      }
      var badResponse = {
        authorizedTF: false,
        message: "Incorrect User Parameters"
      }
        router.db_CompleteTaskF(req.body.id, req.body.UserID)
        .then(function(data){
          console.log("Tasks: completeing: task req.ID ", req.body.id);
          response.id = req.body.id;
          response.UserID = req.body.UserID;
          res.send(response);
        },function(error){
          console.log(error);
          res.status(500).send(error);
        });
    })


module.exports = router
