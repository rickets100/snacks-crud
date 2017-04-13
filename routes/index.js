var express = require('express');
var router = express.Router();
var hbs = require('hbs');

// ======== SHOW HOME PAGE ========
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Snacks!' });
});

module.exports = router;
