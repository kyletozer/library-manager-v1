var title = 'Library Manager';
var route = '/';


module.exports = {

  label: title,

  route: route,

  get: function(req, res, next) {
    var locals = {
      title: title,
      navigation: res.navigation
    };

    res.render('home', locals);
  }
};
