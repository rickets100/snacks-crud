var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET home page. */
/* note: every path here is actually prefixed with /snacks. This is done with the line in app.js that says app.use('/snacks', snacks) */
router.get('/', function(req, res, next) {
  res.render('/snacks/index');
});

// Show all existing snack reviews
// View a single snack review
// Create new snacks with a review
// Edit existing snack reviews
// Delete existing snack reviews

module.exports = router;
