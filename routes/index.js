var express = require('express');
var router = express.Router();
const Subscription = require('../models/subscription');
const INTEREST = require('../models/interest-types');
const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

/* GET home page. */
router.get('/',ensureLoggedIn('/login'), (req, res, next) => {
  validSubs= [];
  console.log(req.user.interest);

  Subscription.find({}, (err, subscription) => {
    console.log(subscription);
    if (err) { return next(err) }
  subscription.forEach(function(x){
    let validCounter = 0;
    x.interest.forEach(function(y){
    if(req.user.interest.indexOf(y) != -1)
      validCounter++;
    })
    if(validCounter > 1)
      validSubs.push(x);
  })
  console.log( "hello world", validSubs);
  res.render('index', validSubs);

});
});
router.get('/new', (req, res) => {
  res.render('subscription/show');

});

router.get("/about",(req, res, next) => {
  res.render('./about/index');
  });



module.exports = router;
