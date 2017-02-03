var fs = require('fs');
var Sequelize = require('sequelize');
var config = {
  dialect: 'sqlite',
  storage: 'library.db'
};

var connection = new Sequelize(config);
var contents = fs.readdirSync(__dirname);
var db = {};


contents = contents.filter(function(file){
  var currFileName = __filename.split('/');
  var checkOne = file.substr(file.length - 3, 3) === '.js';
  var checkTwo = file !== currFileName[currFileName.length - 1];

  return checkOne && checkTwo;
});

contents.forEach(function(file){
  var path = [__dirname, file].join('/');
  var model = connection.import(path);

  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName){
  var model = db[modelName];

  if(model.associate) {
    model.associate(db);
  }
});


db.connection = connection;
module.exports = db;
