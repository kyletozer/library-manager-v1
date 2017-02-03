var title = 'Overdue Books';
var route = '/overdue-books';
var filterLabel = 'Overdue';
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

    res.render('overdue_books', locals);
  }
};
