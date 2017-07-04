var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('newsletter', { csrfToken: req.csrfToken() });
});

router.post('/', function (req, res, next) {
  var email = req.body.email;

  req.assert('email', 'Insert valid email!').notEmpty().isEmail();

  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {

    fs.appendFile('./public/subscribers.txt', email + "\n", function (err) {
      if (err) {
        return console.log(err);
      }
    });
    res.render('thankyou.ejs', { EMAIL: email, csrfTokenFromServer: req.csrfToken() });
  }
});

module.exports = router;
