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
router.db_UpdateUserDisplayName = function(displayName, email)
{
  console.log("UserSettings: Updating User Display Name, ", displayName);
  var deferred = q.defer();
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "UPDATE tldb.Users_tbl SET DisplayName=? WHERE Email=?;";
  var query_var = [displayName, email];
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
       router.db_UpdateUserDisplayName(req.body.DisplayName, req.body.ID)
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

module.exports = router;
