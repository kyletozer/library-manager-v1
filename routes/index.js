var express = require('express');
var router = express.Router();

var home = require('./home');
var allBooks = require('./allBooks');
var allPatrons = require('./allPatrons');
var allLoans = require('./allLoans');
var overdueBooks = require('./overdueBooks');
var checkedBooks = require('./checkedBooks');


router.get('*', function(req, res, next) {
  res.navigation = {
    top: [allBooks, allPatrons, allLoans],
    bookFilter: [allBooks, overdueBooks, checkedBooks]
  }
  next();
});

router.get(home.route, home.get);

router.get(allBooks.route, allBooks.get);

router.get(allPatrons.route, allPatrons.get);

router.get(allLoans.route, allLoans.get);

module.exports = router;
