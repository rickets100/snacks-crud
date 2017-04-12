var express = require('express');
var router = express.Router();
var db = require('../db/connection');

// ======= GET HOME PAGE =========
/* note: every router path here is actually prefixed with /snacks. This is done with the line in app.js that says app.use('/snacks', snacks) */
router.get('/', function(req, res, next) {
  db('snacks').select('*')
  .then(snacks => {
    // this render is filling-in the hbs {{#each snacks}}
    // in routes/snacks.js
    res.render('snacks/index', { snacks });
  })
});

// ===== GET ALL SNACK REVIEWS =====
router.get('/snacks', function(req, res, next) {
  db('snacks').select('review_description')
  .then(reviews => {
    res.render('snacks/reviews', { reviews });
  })
})


// ===== GET A SINGLE SNACK REVIEW =====
router.get('/:id', function (req, res, next) {
  selectedId = req.params.id;
  db('snacks').select('*')
  .where('id', selectedId)
  .first()
  .then(review_description => {
    res.render('snacks/reviews', { reviews })
  })
  .catch(err => {
    res.send(err);
  })
})

// ===== CREATE NEW SNACKS WITH REVIEWS ======
// Edit existing snack reviews
// Delete existing snack reviews

module.exports = router;
