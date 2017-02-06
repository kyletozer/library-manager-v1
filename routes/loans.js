var models = require('../models').models;
var Book = models.book;
var Patron = models.patron;
var Loan = models.loan;


module.exports = {

	getAll: function(req, res, next) {

		res.view = 'all_loans';
		res.locals.pageTitle = 'Loans';

		var options = {
			include: [Book, Patron]
		};

		Loan
			.findAll(options)
			.then(function(data) {
				// console.log(data);

				res.locals.data = data;
				next();
			})
			.catch(function(error) {
				console.log(error);

				error.message = errorMsg.unretrievable;
				res.locals.error = error;

				next();
			});
	},

	getOverdue: function(req, res, next) {

    res.view = 'overdue_loans';
    res.locals.pageTitle = 'Overdue Loans';

    var options = {
      include: [Book, Patron],
      where: {
        returned_on: null,
        return_by: {
          lt: new Date()
        }
      }
    }

    Loan
      .findAll(options)
      .then(function(data){
        console.log(data);
        res.locals.data = data;
        next();
      })
      .catch(function(error){
        return next(error);
      });
	},

	getChecked: function(req, res, next) {

    res.view = 'checked_loans';
    res.locals.pageTitle = 'Checked Out Books';

    var options = {
      include: [Book, Patron],
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

    Loan
      .create(req.body)
      .then(function(data){

        console.log(data);
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
