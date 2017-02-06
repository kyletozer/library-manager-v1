var models = require('../models').models;
var Book = models.book;
var Patron = models.patron;
var Loan = models.loan;


module.exports = {

  getAll: function(req, res, next) {

    res.view = 'all_patrons';
    res.locals.pageTitle = 'Patrons';

    Patron
			.findAll()
			.then(function(data) {
        // console.log(data);

        res.locals.data = data;
        next();
      })
      .catch(function(error){
        console.log(error);

        error.message = errorMsg.unretrievable;
        res.locals.error = error;

        next();
      });
  },

  getDetail: function(req, res, next) {

    var options = {
      include: Book,
      where: {
        patron_id: req.params.id
      }
    };

    Loan.findAll(options)
      .then(function(data){
        // console.log(data);
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

    Patron
      .update(req.body, options)
      .then(function(data){
        res.redirect('/all-patrons');
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
  },

  getNew: function(req, res, next) {
    next();
  },

  postNew: function(req, res, next) {

    Patron
      .create(req.body)
      .then(function(data){

        res.redirect('/all-patrons');
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
