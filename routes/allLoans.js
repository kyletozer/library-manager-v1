var title = 'Loans';
var route = '/all-loans';
var Loan = require('../models').loan;


module.exports = {

  label: title,

  route: route,

  get: function(req, res, next) {
    var locals = {
      title: title,
      navigation: res.navigation
    };

    Loan
			.findAll()
			.then(function(data) {
        locals.loans = data;

      })
      .catch(function(error){
        return next(error);
      });
  }
};
