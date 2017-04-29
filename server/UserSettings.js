/**
 * @name UserSettings.js <- ServerSide
 * @author Jonathan Loya - Created: 4/16/17 | LastModified: 4/22/17 - JFS
 * @summary Is a list of Query Strings that call the Database to Update & Get for UserSettings.
 * ---------------------------------------------------------------------------
 * @module ~none~
 * @function router.db_getUserAccount(req)
 * @function router.use(timeLog(req, res, next))
 * @function router.get(req, res) @ '/'
 * @function router.get(req, res) @ '/Account'
 * ---------------------------------------------------------------------------
 * @description Is a list of Query Strings that call the Database to Update & Get for UserSettings, this
 * is called when a user would like to change their current info for their profile.
 **/

//Server Requirements and Initialization of Global Variables
var express = require('express');
var mysql = require("mysql");
var q = require('q');
var router = express.Router();

//SQL Query functions:
router.db_UpdateUserDisplayName = function(displayName, id)
{
  console.log("UserSettings: Updating User Display Name, ", displayName);
  var deferred = q.defer();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "UPDATE tldb.Users_tbl SET DisplayName=? WHERE ID=?;";
  var query_var = [displayName, id];
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
}; //end db_UpdateUserDisplayName()

router.db_UpdateUserPassword = function(password, id)
{
  console.log("UserSettings: Updating User Password, ", password);
  var deferred = q.defer();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "UPDATE tldb.Users_tbl SET Password=? WHERE ID=?;";
  var query_var = [password, id];
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
}; //end db_UpdateUserPassword()

router.db_DeleteUser = function(id)
{
  //console.log("UserSettings: Updating User Password, ", password);
  var deferred = q.defer();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "DELETE FROM tldb.Users_tbl WHERE ID=?;";
  var query_var = [id];
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
}; //end db_DeleteUser()

//Routes for this module:
router.use(function timeLog (req, res, next) {
  console.log('User Module Started: ', Date.now())
  next()
})

//Define the Users Update Display Name route
router.post('/UpdateDisplayName', function (req, res) {
  var response = {
    UserID: '',
    authToken: '',
    DisplayName: '',
    Email: '',
    Password: '',
    authorizedTF: true,
    message: ''
  }
  var badResponse = {
    authorizedTF: false,
    message: "Incorrect User Parameters"
  }
  console.log("UserSettings: req.body items ",req.body);
       router.db_UpdateUserDisplayName(req.body.DisplayName, req.body.UserID)
       .then(function(setUserRows){
         console.log("UserSettings: DisplayName Return, ", req.body.DisplayName);
         response.message = "Good User and Token Saved";
         response.UserID = req.body.UserID;
         response.authToken = req.body.authToken;
         response.Email = req.body.Email;
         response.Password = req.body.Password;
         response.DisplayName = req.body.DisplayName;
         res.send(response);
       },function(error){
         console.log(error);
         res.status(500).send(error);
       });
})

//Define the Users Update Display Name route
router.post('/UpdatePassword', function (req, res) {
  var response = {
    UserID: '',
    authToken: '',
    DisplayName: '',
    Email: '',
    Password: '',
    authorizedTF: true,
    message: ''
  }
  var badResponse = {
    authorizedTF: false,
    message: "Incorrect User Parameters"
  }
  console.log("UserSettings: req.body items ",req.body);
       router.db_UpdateUserPassword(req.body.Password, req.body.UserID)
       .then(function(setUserRows){
         console.log("UserSettings: Password Return, ", req.body.Password);
         response.message = "Good User and Token Saved";
         response.UserID = req.body.UserID;
         response.authToken = req.body.authToken;
         response.Email = req.body.Email;
         response.Password = req.body.Password;
         response.DisplayName = req.body.DisplayName;
         res.send(response);
       },function(error){
         console.log(error);
         res.status(500).send(error);
       });
})

//Define the Users Deletion Action
router.post('/DeleteUser', function (req, res) {
  var response = { 
    UserID: '',
    authToken: '',
    Email: '',
    authorizedTF: true
  }
  var badResponse = {
    authorizedTF: false,
    message: "Invalid Process"
  }
  console.log("UserSettings: req.body items ",req.body);
    router.db_DeleteUser(req.body.UserID)
    .then(function(setUserRows){
      //console.log("UserSettings: Password Return, ", req.body.Password);
      response.message = "Good User and Token Saved";
      response.UserID = req.body.UserID;
      response.authToken = req.body.authToken;
      response.Email = req.body.Email;
      //response.Password = req.body.Password;
      //response.DisplayName = req.body.DisplayName;
      res.send(response);
    },function(error){
      console.log(error);
      res.status(500).send(error);
    });
})

module.exports = router;
