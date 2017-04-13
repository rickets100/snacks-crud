var express = require('express')
var router = express.Router()
var db = require('../database/connection')
var hbs = require('hbs')

// ======= GET HOME PAGE (AKA GET ALL)=========
/* note: every router path here is actually prefixed with /snacks. This is done with the line in app.js that says app.use('/snacks', snacks) */
router.get('/', function(req, res, next) {
  db('snacks').select('*').orderBy('name')
  .then(snacks => {
    // this render is filling-in the hbs {{#each snacks}}
    // in views/snacks/index.hbs
    res.render('snacks/index', { snacks });
  })
  .catch(err => {
    next(err);
  })
});


// ===== GET ALL SNACKS =====
router.get('/snacks', function(req, res, next) {
  db('snacks').select('review_description')
  .then(reviews => {
    console.log(reviews);
    res.render('snacks/reviews', { reviews });
  })
  .catch(err => {
    next(err);
  })
})

// ========= GET FORMS PAGE ========
router.get('/new', (req, res, next) => {
  res.render('snacks/new')
})

// ===== GET A SINGLE SNACK WITH ITS REVIEW =====
router.get('/:id', function (req, res, next) {
  selectedId = req.params.id;
  db('snacks').select('*')
  .where('id', selectedId)
  .first()
  .then(snack => {
    res.render('snacks/show', { snack })
  })
  .catch(err => {
    next(err);
  })
})

// ===== EDIT A SINGLE SNACK WITH ITS REVIEW =====
router.get('/:id/edit', function (req, res, next) {
  selectedId = req.params.id;
  db('snacks').select('*')
  .where('id', selectedId)
  .first()
  .then(snack => {
    res.render('snacks/edit', { snack })
  })
  .catch(err => {
    next(err);
  })
})

// ===== CREATE A NEW SNACK ======
router.post('/', function(req, res, next) {
  var rating =  parseInt(req.body.year)
  var snack = {
    name: req.body.name,
    image_url: req.body['image-url'],
    review_description: req.body['review-description'],
    rating: req.body.rating
  }
  db('snacks').insert(snack, '*')
  .then((newSnack) => {
  var newId = (newSnack[0].id)
  newPath=(`snacks/${newId}`)
  // redirect takes the actual path as though we were typing it into a browser
  // can't do ".first" because that returns the first movie in the query results, which in this case is the entire table
  res.redirect(newPath)
  })
  .catch(err => {
    next(err);
  })
})

// ===== DELETE AN EXISTING SNACK =====
router.delete('/snacks/:id', deleteOneSnack)
function deleteOneSnack() {
  return function(req, res, next) {
    let toBeDeleted = req.params.id;
    db('movies')
      .del()
      .where('id', toBeDeleted)
      .then((result) => {
        res.redirect('/snacks')
      })
      .catch(err => {
        next(err);
      })
  }
}

// ====== UPDATE ONE SNACK REVIEW ======
router.put('/:id', function(req, res, next) {
  var id = req.params.id
  var snack = {
    name: req.body.name,
    image_url: req.body['image-url'],
    review_description: req.body['review-description'],
    rating: req.body.rating
  }
  db('snacks')
  .update(snack, '*')
  .where({ id })
  .then(updatedSnack => {
    var id = updatedSnack[0].id
    res.redirect(`/snacks/${id}`)
  })
  .catch(err => {
    next(err);
  })
})

module.exports = router;
