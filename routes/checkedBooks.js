var title = 'Checked Out Books';
var route = '/checked-out-books';
var filterLabel = 'Checked Out';
var Book = require('../models').book;


module.exports = {

  label: title,

  filterLabel: filterLabel,

  route: route,

  get: function(req, res, next) {
    var locals = {
      title: title,
      navigation: res.navigation
    };

    res.render('checked_books', locals);
  }
};
