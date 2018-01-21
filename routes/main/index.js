var express = require('express');
var nodemailer = require('nodemailer');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config.properties');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main/index', {
    title: 'Jonathan Markland',
    success: req.session.success,
    errors: req.session.errors
  });
  req.session.errors = null;
  req.session.success = null;
});


router.post('/', function(req, res, next) {

  var myEmail = properties.get('email.address');
  var myEmailPassword = properties.get('email.password');

  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.subject;
  var message = req.body.message;

  var transporter = nodemailer.createTransport( {
    service: "hotmail",
    auth: {
      user: myEmail,
      pass: myEmailPassword
    }
  });

  var mailOptions = {
    from: myEmail,
    to: myEmail,
    subject: 'Website Email ' + subject  ,
    text: 'Name:' + name + '\nEmail ' + email + '\nMessage:' +message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      req.session.errors = true;
      req.session.success = false;
    } else {
      console.log('Email sent: ' + info.response);

      req.session.success = true;
    }
  });

  res.redirect('/');

});

module.exports = router;
