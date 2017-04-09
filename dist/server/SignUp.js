var express = require('express')
var authentication = require('express-authentication')
var mysql = require("mysql");
var q = require('q');
var router = express.Router()

router.db_FindUser = function(email, password)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "SELECT * FROM tldb.Users_tbl WHERE Email = ? AND Password = ?";
  var query_var = [email, password];
  var query = connection.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(rows);
      }
  });
  return deferred.promise;
}; //end db_FindUser()

router.db_SetUserToken = function(email, token)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(router.dbConfig);
  var query_str = "UPDATE tldb.Users_tbl SET AuthToken = ? WHERE Email = ?";
  var query_var = [token, email];
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

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Login module started: ', Date.now())
  next()
})

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// define the home page route
// router.get('/', function (req, res) {
//   res.send('user:' + req.authentication.user);
//   //res.send('Birds home page')
// })

router.post('/', function (req, res) {

  var response = {
    authToken: guid(),
    DisplayName: '',
    Email: '',
    ImageUrl: '',
    authorizedTF: true,
    message: ""
  }
  var badResponse = {
    authToken: null,
    authorizedTF: false,
    message: "Missing user or bad password"
  }
  console.log("LoginPostReceived req.body: ",req.body);
  router.db_FindUser(req.body.Email, req.body.Password)
   .then(function(rows){
     console.log('Login Post Received Looking up User: ',rows);
     if(rows.length > 0) {
      router.db_SetUserToken(req.body.Email, response.authToken)
      .then(function(setUserRows){
        console.log("New Token Generated For this user: ", response.authToken);
        console.log("Login Post Received. Setting New Token for User: ", req.body.Email);
        response.message = "Good User and Token Saved";
        console.log("rows: ",rows);
        response.DisplayName = rows[0].DisplayName;
        response.Password = rows[0].Password;
        response.Email = rows[0].Email;
        response.ImageUrl = rows[0].ImageUrl;
        res.send(response);
      },function(error){
        console.log(error);
        res.status(500).send(error);
      });
     }
     else {
       res.send(badResponse);
     }
    },function(error){
     console.log(error);
     res.status(500).send(error);
   });
})

module.exports = router
