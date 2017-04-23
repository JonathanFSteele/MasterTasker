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
      connection.end();
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
      connection.end();
  });
  return deferred.promise;
}; //end db_getGroupsList()


router.db_getTags = function(GroupID)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.Tags_tbl WHERE GroupID=?";
  var query_var = [GroupID];
  //var query_var; //null
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


router.db_submitND = function(displayName, description, id, UserID)
{
  console.log("updating info in groupDetails: ", displayName, description);
  var deferred = q.defer(); // Use Q
  var date = new Date();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "UPDATE tldb.Groups_tbl SET DisplayName=?, Description=?, LastUpdateUser=?, LastUpdateDT=?  WHERE ID=?;";
  var query_var = [displayName, description, UserID,  date, id];
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
}; //end db_SetUserToken()



router.db_createND = function(displayName, description, Ownerid)
{
  console.log("creating info in groupDetails: ", displayName, description, Ownerid);
  var deferred = q.defer(); // Use Q
  var date = new Date();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "INSERT INTO tldb.Groups_tbl ( DisplayName, OwnerID, Description, CreatedDT, LastUpdateDT, LastUpdateUser) VALUES ( ?, ?, ?, ?, ?, ?);";
  var query_var = [displayName, Ownerid , description, date, date, Ownerid];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
  });
  return deferred.promise;
}; //end db_SetUserToken()


router.db_deleteGP = function(id)
{
   console.log("DELETING GROUP!!!!!: ", id);
  var deferred = q.defer(); // Use Q
  var date = new Date();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "UPDATE tldb.Groups_tbl SET DeleteDT= ? WHERE ID=?;";
  var query_var = [date, id];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
  if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
  });
  return deferred.promise;
}; //end db_SetUserToken()



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

router.get('/Tags', function (req, res) {
  var result = [];
  console.log("req Tags req.query.id: ",req.query.id); //req.authentication will tell you what user is currently logged in (req.authentication.Email - to get the current email for the logged in user.)

  var GroupID = req.query.id;

  router.db_getTags(GroupID)
   .then(function(rows){
     console.log('rows result',rows);
     res.send(rows);
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})

router.post('/submitND', function (req, res) {
  var response = {
    DisplayName: '',
    Description: '',
    id: '',
    message: ''
  }
  var badResponse = {
    authorizedTF: false,
    message: "Incorrect User Parameters"
  }

  if (req.body.ID == 0){
    router.db_createND(req.body.DisplayName, req.body.Description, req.body.CurrUser)
    .then(function(setgrouprows){
      console.log("UserSettings, creating: req.body items ",req.body);
      console.log("created new group!!! YAY!", req.body.Email);
      response.message = "Good User and Token Saved";
      response.DisplayName = req.body.DisplayName;
      response.Description = req.body.Description;
      response.id = req.body.CurrUser;
      res.send(response);
    },function(error){
      console.log(error);
      res.status(500).send(error);
    });
  }
  else {
    router.db_submitND(req.body.DisplayName, req.body.Description, req.body.ID, req.body.CurrUser);
    console.log("UserSettings, submiting: req.body items ",req.body);
    response.message = "Good User and Token Saved";
    response.DisplayName = req.body.DisplayName;
    response.Description = req.body.Description;
    response.id = req.body.CurrUser;
    res.send(response);
     }
})


router.post('/deleteGP', function (req, res) {
  var response = {
    GroupID: '',
    message: ''
  }
  var badResponse = {
    authorizedTF: false,
    message: "Incorrect Parameters"
  }

    router.db_deleteGP(req.body.ID);
    console.log("UserSettings, submiting: req.body items ",req.body);
    response.message = "Group is gone FOREVER!";
    response.GroupID = req.body.ID;
    res.send(response);
})



module.exports = router
