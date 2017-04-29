var express = require('express');
var authentication = require('express-authentication')
var mysql = require("mysql");
var q = require('q');
var router = express.Router();

//SQL Query functions:
router.db_getGroupsList = function(UserID)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.Groups_vw WHERE GroupUser = ?";
  var query_var = [UserID];
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
}; //end db_getGroupsList()

router.db_CreateNewGroup = function(DisplayName, OwnerID)
{
  console.log("Groups: Creating A New Group ", DisplayName, OwnerID);
  var deferred = q.defer();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "INSERT INTO tldb.Groups_tbl (DisplayName, OwnerID) VALUES ( ?, ?);";
  var query_var = [DisplayName, OwnerID];
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
}; //end db_CreateNewGroup()

router.db_AddUserToGroup = function(GroupID, OwnerID)
{
  console.log("Groups: Adding User to New Group ", GroupID, OwnerID);
  var deferred = q.defer();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "INSERT INTO tldb.GroupMembers_tbl (UserID, GroupID) VALUES ( ?, ?);";
  var query_var = [OwnerID, GroupID];
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
}; //end db_AddUserToGroup()

//Routes for this module:
router.use(function timeLog (req, res, next) {
  console.log('\nGroups Module Started: ', Date.now())
  next()
})

// define the Users default route
router.get('/', function (req, res) {
  res.send('Groups')
})

// define the List route
router.get('/List', authentication.required(), function (req, res) {
  var result = [];
  console.log("\n\n\n\nreq user record: ",req.authentication.ID); //req.authentication will tell you what user is currently logged in (req.authentication.Email - to get the current email for the logged in user.)
 console.log("req.query");
  router.db_getGroupsList(req.authentication.ID)
   .then(function(rows){
     console.log('rows result',rows);
     res.send(rows);
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})

router.post('/CreateNewGroup', function (req, res) {
  var response = {
    RowID: '',
    GroupName: '',
    UserID: '',
    message: ''
  }
  var badResponse = {
    authorizedTF: false,
    message: "Incorrect User Parameters"
  }
    router.db_CreateNewGroup(req.body.GroupName, req.body.OwnerID)
    .then(function(data){
      console.log("Groups: creating: req.body items ",req.body);
      console.log("Groups: created new task", req.body.GroupName);
      console.log("\n\nGroups: Created Group response - ", data);
      console.log("\nGroups: Created Group response insertID - ", data.insertId);
      response.RowID = data.insertId;
      response.GroupName = req.body.GroupName;
      response.message = "Group Created";
      response.UserID = req.body.OwnerID;
      console.log("\nGroups: response, ", response);
      AddUserToGroup();
      res.send(response);
    },function(error){
      console.log(error);
      res.status(500).send(error);
    });
  var AddUserToGroup = function() {
    router.db_AddUserToGroup(response.RowID, response.UserID)
    .then(function(data){
      console.log("Groups-AddUser: creating: req.body items ",req.body);
//       console.log("Groups-AddUser: created new task", req.body.GroupName);
      console.log("\n\nGroups-AddUser: Added User response - ", response);
      console.log("\nGroups-AddUser: Added User response insertID - ", response.RowID);
//       res.send(response);
    },function(error){
      console.log(error);
      res.status(500).send(error);
    });
  };
})

module.exports = router
