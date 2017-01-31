var express = require('express');
var router = express.Router();


router.get('/', homeGet);

module.exports = router;


function homeGet(req, res, next) {

  var locals = {
    test: 'hi'
  };

  res.render('home', locals);
}
