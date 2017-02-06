var models = require('./models').models;
var Book = models.book;
var Patron = models.patron;
var Loan = models.loan;


// custom middleware function for sharing data between routes, check index.js to see what function in what order is handled by each route
module.exports = {

  newBookShared: function(req, res, next) {

    res.view = 'new_book';
    res.locals.pageTitle = 'New Book';
    res.locals.formAction = '/new-book';
    res.locals.formSubmitLabel = 'Create New Book';

    next();
  },

  bookDetailShared: function(req, res, next) {

    res.view = 'book_detail';

    Book
      .findById(req.params.id)
      .then(function(data){

        res.locals.formAction = req.url;
        res.locals.formSubmitLabel = 'Update';

        res.locals.book = data;
        res.locals.pageTitle = 'Book: ' + data.dataValues.title;

        next();
      })
      .catch(function(error){
        return next(error);
      });
  },

  bookReturnShared: function(req, res, next) {

    res.view = 'return_book';
    res.locals.pageTitle = 'Patron: Return Book';

    var options = {
      include: [ Book, Patron ]
    };

    Loan
      .findById(req.params.id, options)
      .then(function(data){
        // console.log(data);
        res.locals.data = data;
        next();
      })
      .catch(function(error){
        return next(error);
      });
  },

  newLoanShared: function(req, res, next){

    res.view = 'new_loan';
    res.locals.pageTitle = 'New Loan';
    res.locals.formAction = '/new-loan';
    res.locals.formSubmitLabel = 'Create New Loan';

    Book
      .findAll()
      .then(function(data){
        res.locals.books = data;
        return Patron.findAll();
      })
      .then(function(data){

        var date = new Date().getTime();
        var currentDate = date;
        var futureDate = date + 604800000;

        function formatDate(timestamp) {

          var d = new Date(timestamp);

          var year = d.getFullYear();
          var month = d.getMonth() + 1;
          var day = d.getDate();

          var dateArr = [year, month, day];

          dateArr = dateArr
            .map(function(val){
              val = val.toString();

              if(val.length === 1) {
                val = '0' + val;
              }
              return val;
            })
            .join('-');

          return dateArr;
        }

        res.locals.patrons = data;
        res.locals.loaned_on = formatDate(currentDate);
        res.locals.return_by = formatDate(futureDate);

        next();
      })
      .catch(function(error){
        return next(error);
      });
  },

  patronDetailShared: function(req, res, next) {

    res.view = 'patron_detail';
    res.locals.formAction = '/patron-detail/' + req.params.id;
    res.locals.formSubmitLabel = 'Update';

    Patron
      .findById(req.params.id)
      .then(function(data){

        res.locals.pageTitle = 'Patron: ' + data.dataValues.first_name + ' ' + data.dataValues.last_name;
        res.locals.patron = data;

        next();
      })
      .catch(function(error){
        return next(error);
      });
  },

  newPatronShared: function(req, res, next) {

    res.view = 'new_patron';
    res.locals.pageTitle = 'New Patron';
    res.locals.formAction = '/new-patron';
    res.locals.formSubmitLabel = 'Create New Patron';

    next();
  },

  renderView: function(req, res, next) {
    res.render(res.view, res.locals);
  }
};
