var models = require('../models').models;
var Book = models.book;
var Loan = models.loan;
var Patron = models.patron;


module.exports = {

	getAll: function(req, res, next) {

		res.view = 'all_books';
		res.locals.pageTitle = 'Books';

		Book
			.findAll()
			.then(function(data) {
        // console.log(data);

        res.locals.data = data;
        next();
      })
      .catch(function(error){
        return next(error);
      });
	},

  getOverdue: function(req, res, next) {

    res.view = 'overdue_books';
    res.locals.pageTitle = 'Overdue Books';

    var options = {
      include: Book,
      where: {
        returned_on: null,
        return_by: {
          lt: new Date()
        }
      }
    };

    Loan
      .findAll(options)
      .then(function(data){
        console.log(data);

        res.locals.data = data;
        next();
      })
      .catch(function(error){
        error.message = errorMsg.unretrievable;
        return next(error);
      });
  },

  getChecked: function(req, res, next) {

    res.view = 'checked_books';
    res.locals.pageTitle = 'Checked Books';

    var options = {
      include: Book,
      where: {
        returned_on: null
      }
    };

    Loan
      .findAll(options)
      .then(function(data){
        // console.log(data);

        res.locals.data = data;
        next();
      })
      .catch(function(error){
        error.message = errorMsg.unretrievable;
        return next(error);
      });
  },

  getNew: function(req, res, next) {
    next();
  },

  postNew: function(req, res, next) {

    Book
      .create(req.body)
      .then(function(data) {

        console.log(data);
        res.redirect('/all-books');

      })
      .catch(function(error) {

        if(error.name === 'SequelizeValidationError') {
          res.locals.submissionFail = error;
          next();

        } else {
          res.locals.error = error;
          next(error);
        }
      });
  },

  getDetail: function(req, res, next) {

    var options = {
      include: Patron,
      where: {
        book_id: req.params.id
      }
    };

    Loan.findAll(options)
      .then(function(data){

        res.locals.loans = data;
        next();
      })
      .catch(function(error){
        return next(error);
      });
  },

  postDetail: function(req, res, next) {

    var options = {
      where: {
        id: req.params.id
      }
    };

    Book
      .update(req.body, options)
      .then(function(data){
        // console.log(data);
        res.redirect('/book-detail/' + req.params.id);
      })
      .catch(function(error){

        // console.log(error);

        if(error.name === 'SequelizeValidationError') {
          res.locals.submissionFail = error;
          next();

        } else {
          res.locals.error = error;
          next(error);
        }
      });
  },

  getReturn: function(req, res, next) {
    next();
  },

  postReturn: function(req, res, next) {

    var options = {
      where: {
        id: req.params.id
      }
    };

    Loan
      .update(req.body, options)
      .then(function(data){
        // console.log(data);
        res.redirect('/all-loans');
      })
      .catch(function(error){

        if(error.name === 'SequelizeValidationError') {
          res.locals.submissionFail = error;
          next();

        } else {
          res.locals.error = error;
          next(error);
        }
      });
  }
};
