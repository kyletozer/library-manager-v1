var title = 'Books';
var route = '/all-books';
var filterLabel = 'All';
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

		Book
			.findAll()
			.then(function(data) {
        locals.books = data;
        res.render('all_books', locals);
      })
      .catch(function(error){
        return next(error);
      });
	}
};
