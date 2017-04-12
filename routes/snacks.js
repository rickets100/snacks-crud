var express = require('express');
var router = express.Router();
var db = require('../db/connection');

// ======= GET HOME PAGE =========
/* note: every router path here is actually prefixed with /snacks. This is done with the line in app.js that says app.use('/snacks', snacks) */
router.get('/', function(req, res, next) {
  db('snacks').select('*').orderBy('name')
  .then(snacks => {
    // this render is filling-in the hbs {{#each snacks}}
    // in views/snacks/index.hbs
    res.render('snacks/index', { snacks });
  })
});


// ===== GET ALL SNACK REVIEWS =====
router.get('/snacks', function(req, res, next) {
  db('snacks').select('review_description')
  .then(reviews => {
    console.log(reviews);
    res.render('snacks/reviews', { reviews });
  })
})

// ========= GET FORMS PAGE ========
// THIS NEEDS TO A SINGLE SNACK
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
    res.send(err);
  })
})

// ===== CREATE NEW SNACKS WITH REVIEWS ======
router.post('/', function(req, res, next) {
  var snack = {
    name: req.body.name,
    image_url: req.body['image-url'],
    review_description: req.body['review-description'],
    rating: req.body.rating
  }
  db('snacks').insert(snack, '*').then((newSnack) => {
  newId = (newSnack[0].id);
  newPath=(`snacks/${newId}`)
  console.log(newPath);
  // redirect takes the actual path as though we were typing it into a browser
  // can't do ".first" because that returns the first movie in the query results, which in this case is the entire table
  res.redirect(newPath)
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
      .catch((err) => {
        console.error(err);
      });
  }
}

// ====== UPDATE ONE SNACK REVIEW ======
// router.patch('/snacks/:id', function(req, res, next) {
//   db('snacks')
//   .where('id', selectedId)
//   .first()
//   .update({
//     review_description: 'I no longer find this tasty.',
//   })
//   .then(review_description => {
//     res.render('snacks/reviews', { reviews })
//   })
// })

module.exports = router;
