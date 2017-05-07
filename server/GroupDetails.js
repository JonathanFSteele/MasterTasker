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

//db_getUser
router.db_getUser = function(Email)
{
  console.log("calling db_getUser, agruments: ", Email);
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.Users_tbl WHERE Email=?;";
  var query_var = [Email];
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
}; //end db_getUser()


// db_addUserToGroup
router.db_addUserToGroup = function(UserID, GroupID)
{
  console.log("updating info in groupDetails: ", UserID, GroupID);
  var deferred = q.defer(); // Use Q
  var date = new Date();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "INSERT INTO tldb.GroupMembers_tbl (UserID, GroupID) VALUES (?,?);";
  var query_var = [UserID, GroupID];
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
}; //end db_addUserToGroup()

// db_AddTag
router.db_AddTag = function(Name, Color, GroupID)
{
  console.log("Inserting New Tag: ", Name, Color, GroupID);
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "INSERT INTO tldb.Tags_tbl (Name, Color, GroupID) VALUES (?,?,?);";
  var query_var = [Name, Color, GroupID];
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
}; //end db_addUserToGroup()

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
  var query_str = "UPDATE tldb.Groups_tbl SET DeleteDT=? WHERE ID=?;";
  // "UPDATE tldb.Groups_tbl SET DeleteDT=? WHERE ID=?; "
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
}; //end db_deleteGP()

//Save Tag
router.db_SaveTag = function(Name, Color, ID)
{
   console.log("Save Tag: ", Name, Color, ID);
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "UPDATE tldb.Tags_tbl SET Name=?, Color=? WHERE ID=?;";
  var query_var = [Name, Color, ID];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
  if (err) {
        deferred.reject(err);
        console.log("Save Tag AFTER reject: ", Name, Color, ID, err);
      }
      else {
        deferred.resolve(rows);
        console.log("Save Tag AFTER resolve: ", Name, Color, ID, rows);
      }
  });
  return deferred.promise;
}; //end db_SaveTag()

//db_RemoveTag()
router.db_RemoveTag = function(ID)
{
   console.log("Remove Tag: ", ID);
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "DELETE FROM tldb.Tags_tbl WHERE ID=?;";
  var query_var = [ID];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
  if (err) {
        deferred.reject(err);
        console.log("Remove Tag AFTER reject: ", ID);
      }
      else {
        deferred.resolve(rows);
        console.log("Remove Tag AFTER resolve: ", ID);
      }
  });
  return deferred.promise;
}; //end db_RemoveTag()


//
router.db_deleteTasksOfGP = function(id, groupID)
{
   console.log("DELETING ALL TASKS FROM GROUP!!!!!: ", groupID);
  var deferred = q.defer(); // Use Q
  var date = new Date();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "UPDATE tldb.Tasks_tbl SET DeleteDT=? WHERE ID=?, GroupID=?;";
  var query_var = [date, id, groupID];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
  if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
  });
  return deferred.promise;
}; //end db_deleteTasksOfGP()



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

router.post('/AddUserToGroupFind', function (req, res) {
  var response = {
    Email: '',
    DisplayName: '',
    LocalEmailTF: ''
  }
  var badResponse = {
    authorizedTF: false,
    message: "Incorrect Parameters"
  }
    router.db_getUser(req.body.EmailName)
    .then(function(rows){
      if(rows != null)
      {
        console.log("GroupDetails, submiting: req.body items ",req.body);
        console.log("GroupDetails, printing row: ", rows);
        postTaskMember(rows[0], req.body.GroupID);
        response.Email = req.body.EmailName;
        response.DisplayName = req.body.DisplayName;
        response.LocalEmailTF = 'true';
        res.send(response);
      } else
      {
        console.log("GroupDetails, sending invite; user does not exist");
        response.Email = req.body.EmailName;
        response.DisplayName = req.body.DisplayName;
        response.LocalEmailTF = 'false';
        res.send(response);
      }
    });
})

var postTaskMember = function (User, GroupID) {
  console.log("postTaskMember called; args: ", User.ID, GroupID);
  router.db_addUserToGroup(User.ID, GroupID)
    .then(function(rows){
      console.log("postTaskMemeber, success! user found");
    });
}

// define db_removeUserFromGroup
router.db_removeUserFromGroup = function(UserID, GroupID)
{
  console.log("GroupDetails: db_removeUserFromGroup called");
  console.log("\nargs: ", UserID, GroupID);
  var deferred = q.defer();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "DELETE FROM tldb.GroupMembers_tbl WHERE UserID=? AND GroupID=?;";
  var query_var = [UserID, GroupID];
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
}; //end db_removeUserFromGroup()


//Define the deletion from groups action
router.post('/RemoveUserFromGroup', function (req, res) {
  console.log("RemoveUserFromGroup called");
  //var response = { }
  var badResponse = {
    authorizedTF: false,
    message: "Invalid Process"
  }
  console.log("GroupSettings: req.body items ",req.body);
  router.db_removeUserFromGroup(req.body.UserID, req.body.GroupID)
  .then(function(setUserRows){
    res.send(response);
  },function(error){
    console.log(error);
    res.status(500).send(error);
  });
})

//Add Tag
router.post('/AddTag', function (req, res) {
  console.log("AddTag Called");
  var response = {
    Name: '',
    Color: ''
  }
  var badResponse = {
    authorizedTF: false,
    message: "Invalid Process"
  }
  console.log("GroupDetail: req.body items ",req.body);
  router.db_AddTag(req.body.Name, req.body.Color, req.body.GroupID)
  .then(function(setUserRows){
    res.send(response);
  },function(error){
    console.log(error);
    res.status(500).send(error);
  });
})

//Save Tags
router.post('/SaveTag', function (req, res) {
  console.log("SaveTag Called");
  var response = {
    Name: '',
    Color: ''
  }
  var badResponse = {
    authorizedTF: false,
    message: "Invalid Process"
  }
  console.log("GroupDetail: req.body items ",req.body);
  router.db_SaveTag(req.body.Name, req.body.Color, req.body.ID)
  .then(function(setUserRows){
    res.send(response);
  },function(error){
    console.log(error);
    res.status(500).send(error);
  });
})

//Remove Tag
router.post('/RemoveTag', function (req, res) {
  console.log("Remove Tag Called");
  var response = {
    Name: '',
    Color: ''
  }
  var badResponse = {
    authorizedTF: false,
    message: "Invalid Process"
  }
  console.log("GroupDetail: req.body items ",req.body);
  router.db_RemoveTag(req.body.ID)
  .then(function(setUserRows){
    res.send(response);
  },function(error){
    console.log(error);
    res.status(500).send(error);
  });
})

module.exports = router
