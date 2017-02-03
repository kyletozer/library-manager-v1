var express = require('express');
var handlebars = require('express-handlebars');
var logger = require('morgan');
var app = express();
var port = Number(process.env.PORT || 3000);

var sequelize = require('./models').connection;
var routes = require('./routes');
var db = require('./models');

var hbs = handlebars.create(require('./hbs-config'));


app.use('/', routes);
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));

app.engine('html', hbs.engine);
app.set('view engine', 'html');

db.connection
  .authenticate()
  .then(syncModels)
  .then(startServer)
  .catch(logError);

app.use(function(req, res, next) {
  var error = new Error();

  error.status = 404;
  error.message = 'Page Not Found';

  var locals = {
    title: error.status + ' ' + error.message,
    error: error,
    navigation: res.navigation
  };

  res.render('error', locals);
});

app.use(function(error, req, res, next) {
  console.log(error);
  res.render('error', {error: error});
});


function syncModels(){
  return sequelize.sync();
}

function startServer(){
  app.listen(port, function () {
    console.log('Express is now listening on port ' + port + '!');
  });
}

function logError(error){
  console.log(error);
}
