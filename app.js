var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');

var app = express();
var port = Number(process.env.PORT || 3000);


var sequelize = require('./models').connection;
var routes = require('./routes');
var db = require('./models');

// handlebars for templating so I wouldn't have to convert all of the templates to jade
var hbs = handlebars.create(require('./config/handlebars'));
var staticAssets = express.static(path.join(__dirname, 'public'));


app.use(bodyParser.urlencoded({extended: true}));

app.use(staticAssets);
app.use('/book-detail', staticAssets);
app.use('/patron-detail', staticAssets);
app.use('/return-book', staticAssets);

app.use('/', routes);
app.use(logger('dev'));

app.engine('html', hbs.engine);
app.set('view engine', 'html');

// make database connection, sync models and start http server
db.connection
  .authenticate()
  .then(syncModels)
  .then(startServer)
  .catch(logError);

// catch 404 errors
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

// catch internal server errors, will render the intended view but with an error message in place
app.use(function(error, req, res, next) {
  console.log(error);
  res.render(res.view, {error: error});
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
