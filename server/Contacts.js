var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Contacts module started: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Contacts')
})
// define the about route
router.get('/List', function (req, res) {
  var Contacts = [
    {
      Name: "Jonathan",
      Email: "jonathan@steeleconsult.com",
    },
    {
      Name: "Charles",
      Email: "Charles@nmsu.edu",
    },
    {
      Name: "Zach",
      Email: "Zach@nmsu.edu",
    },
    {
      Name: "Loya",
      Email: "Loya@nmsu.edu",
    }
  ];
  res.send(Contacts);
})

module.exports = router
