var express = require('express');
var router = express.Router();
var hbs = require('hbs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Snacks!' });
});

// Show all existing snack reviews
// View a single snack review
// Create new snacks with a review
// Edit existing snack reviews
// Delete existing snack reviews

module.exports = router;
