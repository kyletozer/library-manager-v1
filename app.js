var express = require('express');
var handlebars = require('express-handlebars');
var app = express();
var port = Number(process.env.PORT || 3000);

var sequelize = require('./models').connection;
var routes = require('./routes');
var db = require('./models');

var handlebarsConfig = {
  defaultLayout: 'main',
  extname: '.html'
};


app.use('/', routes);
app.use(express.static(__dirname + '/public'));

app.engine('html', handlebars(handlebarsConfig));
app.set('view engine', 'html');

db.connection
  .authenticate()
  .then(syncModels)
  .then(startServer)
  .catch(logError);


function syncModels(){
  return sequelize.sync({force: true});
}

function startServer(){
  app.listen(port, function () {
    console.log('Express is now listening on port ' + port + '!');
  });
}

function logError(error){
  console.log(error);
}
