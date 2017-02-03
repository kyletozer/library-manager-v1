var title = 'Patrons';
var route = '/all-patrons';
var Patron = require('../models').patron;


module.exports = {

  label: title,

  route: route,

  get: function(req, res, next) {
    var locals = {
      title: title,
      navigation: res.navigation
    };

    Patron
			.findAll()
			.then(function(data) {
        locals.patrons = data;
        res.render('all_patrons', locals);
      })
      .catch(function(error){
        return next(error);
      });
  }
};
