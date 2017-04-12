<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

var express = require('express');
var router = express.Router();
var db = require('../db/connection');

// ===== DELETE AN EXISTING SNACK =====
function deleteOneSnack() {
  return function(req, res, next) {
    let toBeDeleted = req.params.id;
    db('snacks')
      .del()
      .where('id', toBeDeleted)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
