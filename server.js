// Nodejs Express Server Initialization
var express = require('express'),
    authentication = require('express-authentication'),
    app = express();
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
    req.authenticated = req.challenge === 'secret';
    console.log("authenticated: ", req.authentication);
    // provide the result of the authentication; generally some kind of user
    // object on success and some kind of error as to why authentication failed
    // otherwise.
    if (req.authenticated) {
        req.authentication = { user: 'bob' };
    } else {
        req.authentication = { error: 'INVALID_API_KEY' };
    }

    // That's it! You're done!
    next();
});
//Example of secure authentication page.
app.get('/secret', authentication.required(), function(req, res) {
    res.status(200).send('Hello!');
});

//Start Example Routes for API ~~~ NOTE: Make sure to Comment out birds/contacts as they are from the demo site - JFS
var birds = require('./server/birds'); //This is where the js file is.
app.use('/api/birds', birds); //This is the Url.

var contacts = require('./server/contacts'); //This is where the js file is.
app.use('/api/contacts', contacts); //This is the Url.
//End Example Routes for API

//Start Routes for API

  //Login API
  var login = require('./server/login'); //This is where the js file is.
  login.dbConfig = dbConfig;
  app.use('/api/login', login); //This is the Url.

  //users API for Users_tbl
  var users = require('./server/users'); //This is where the js file is.
  users.dbConfig = dbConfig;
  app.use('/api/users', users); //This is the Url.

//End Routes for API

//Listening Message - To run local serve type ( node server.js ) or ( node server )
app.listen(3000, function () {
  console.log('Local Host for MasterTasker listening on port 3000!');
})
