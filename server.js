/**
 * @name server.js
 * @author Jonathan Steele - Created: 2/12/17 | LastModified: 4/22/17 - JFS
 * @summary Is the organization file of the server controllers for the gets, posts, deletes, and updates.
 * ---------------------------------------------------------------------------
 * @module ~none~
 * @function db_GetUserByToken(token)
 * @function router.use(timeLog(req, res, next))
 * @function app.use(myauth(req, res, next))
 * @function app.get('/secret', authentication.required() ,req, res)
 * @function app.listen()
 * ---------------------------------------------------------------------------
 * @description Is the organization file of the server controllers for the gets, posts, deletes, and
 * updates. It needs a user authentication to access with a secret code. It has what is required of the
 * server controllers while linking them all together.
 **/
// Nodejs Express Server Initialization
var express = require('express'),
    authentication = require('express-authentication'),
    app = express(),
    mysql = require("mysql"),
    q = require('q');

db_GetUserByToken = function(token)
{
  var deferred = q.defer(); // Use Q
  var connection = mysql.createConnection(dbConfig);
  var query_str = "SELECT * FROM tldb.Users_tbl WHERE AuthToken = ?";
  var query_var = [token];
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
}; //end db_getUserList()

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static('public'))
var dbConfig = require('./dbConfig');

app.use(function myauth(req, res, next) {
    // provide the data that was used to authenticate the request; if this is
    // not set then no attempt to authenticate is registered.
    req.challenge = req.get('Authorization');
    console.log("challenge: ", req.challenge);
    db_GetUserByToken(req.challenge)
    .then(function(rows){
      if(rows.length > 0)
      {
        req.authenticated = true;
        req.authentication = rows[0];
      }
      else {
        req.authenticated = false;
        req.authentication = { error: 'INVALID_AUTHORIZATION' };
      }
      console.log("authenticated: ", req.authentication);

      // Continue
      next();
    },function(error){
     console.log(error);
     res.status(500).send(error);
    });
});
//Example of secure authentication page.
app.get('/secret', authentication.required(), function(req, res) {
    res.status(200).send('Hello!');
});

//Start Example Routes for API ~~~ NOTE: Make sure to Comment out birds/Contacts as they are from the demo site - JFS
var Birds = require('./server/Birds'); //This is where the js file is.
app.use('/api/Birds', Birds); //This is the Url.

var Contacts = require('./server/Contacts'); //This is where the js file is.
app.use('/api/Contacts', Contacts); //This is the Url.
//End Example Routes for API

//Start Routes for API

  //Login API
  var Login = require('./server/Login'); //This is where the js file is.
  Login.dbConfig = dbConfig;
  app.use('/api/Login', Login); //This is the Url.

  //users API for SignUp
  var SignUp = require('./server/SignUp'); //This is where the js file is.
  SignUp.dbConfig = dbConfig;
  app.use('/api/SignUp', SignUp); //This is the Url.

  //Groups API
  var Groups = require('./server/Groups'); //This is where the js file is.
  Groups.dbConfig = dbConfig;
  app.use('/api/Groups', Groups); //This is the Url.

  //GroupDetails API
  var GroupDetails = require('./server/GroupDetails'); //This is where the js file is.
  GroupDetails.dbConfig = dbConfig;
  app.use('/api/GroupDetails', GroupDetails); //This is the Url.

  //Tasks API
  var Tasks = require('./server/Tasks'); //This is where the js file is.
  Tasks.dbConfig = dbConfig;
  app.use('/api/Tasks', Tasks); //This is the Url.

  //Tasks API
  var TaskDetails = require('./server/TaskDetails'); //This is where the js file is.
  TaskDetails.dbConfig = dbConfig;
  app.use('/api/TaskDetails', TaskDetails); //This is the Url.

  //users API for Users_tbl
  var Users = require('./server/Users'); //This is where the js file is.
  Users.dbConfig = dbConfig;
  app.use('/api/Users', Users); //This is the Url.

  //UserSettings
  var UserSettings = require('./server/UserSettings'); //This is where the js file is.
  UserSettings.dbConfig = dbConfig;
  app.use('/api/UserSettings', UserSettings); //This is the Url.

//End Routes for API

//Listening Message - To run local serve type ( node server.js ) or ( node server )
app.listen(3000, function () {
  console.log('Local Host for MasterTasker listening on port 3000!');
})
