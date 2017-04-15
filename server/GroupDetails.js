var express = require('express');
var mysql = require("mysql");
var q = require('q');
var router = express.Router();

//SQL Query functions:
router.db_getGroupByID = function(GroupID)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.Groups_vw WHERE ID=?";
  var query_var = [GroupID];
  //var query_var; //null
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
  });
  return deferred.promise;
}; //end db_getGroupsList()

router.db_getGroupMembersByID = function(GroupID)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.GroupMembers_vw WHERE GroupID=?";
  var query_var = [GroupID];
  //var query_var; //null
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
  });
  return deferred.promise;
}; //end db_getGroupsList()


//Routes for this module:
router.use(function timeLog (req, res, next) {
  console.log('Groups Module Started: ', Date.now())
  next()
})

// define the users default route
router.get('/', function (req, res) {
  res.send('GroupMembers')
})

// define the list route
router.get('/ByID', function (req, res) {
  var result = [];
  console.log("req Group Details req.query.id: ",req.query.id); //req.authentication will tell you what user is currently logged in (req.authentication.Email - to get the current email for the logged in user.)

  var GroupID = req.query.id;

  router.db_getGroupByID(GroupID)
   .then(function(rows){
     console.log('rows result',rows);
     res.send(rows);
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})
// define the list route
router.get('/GroupMembers', function (req, res) {
  var result = [];
  console.log("req Group members req.query.id: ",req.query.id); //req.authentication will tell you what user is currently logged in (req.authentication.Email - to get the current email for the logged in user.)

  var GroupID = req.query.id;

  router.db_getGroupMembersByID(GroupID)
   .then(function(rows){
     console.log('rows result',rows);
     res.send(rows);
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})




module.exports = router
