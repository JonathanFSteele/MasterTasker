var express = require('express')
var authentication = require('express-authentication')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('birds module started: ', Date.now())
  next()
})
// define the home page route
router.get('/', authentication.required(), function (req, res) {
  res.send('user:' + req.authentication.user);
  //res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
