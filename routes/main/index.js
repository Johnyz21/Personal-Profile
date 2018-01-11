var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main/index', { title: 'Jonathan Markland!', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
  req.session.success = null;
});


router.post('/', function(req,res,next){

  var name = req.params.name;
  var email = req.params.email;
  var subject = req.params.subject;
  var message = req.params.message;

  req.check('email','Invalid email address').isEmail();

  var errors = req.validationErrors();

  if(errors){
    req.session.errors = errors;
    req.session.success = false;
    // res.render('Errors');

  } else {
    req.session.success = true;
  }
  res.redirect('/');

});

module.exports = router;
