var express = require('express');
var router = express.Router();
const Subscription = require('../models/subscription');
const INTEREST = require('../models/interest-types');
const User = require('../models/user');


/* GET home page. */
router.get('/', (req, res, next) => {
  Subscription.find({}, (err, subscription) => {
    if (err) { return next(err) }
  validSubs= [];
  console.log(req.user.interest);

  req.subscription.forEach(function(x){
    let validCounter = 0;
    x.interest.forEach(function(y){
    if(req.user.interest.indexOf(y) != -1)
      validCounter++;
    })
    if(validCounter > 1)
      validSubs.push(x);
  })
  res.render('index');

});
});
router.get('/new', (req, res) => {
  res.render('subscription/show');

});

router.get("/about",(req, res, next) => {
  res.render('./about/index');
  });



module.exports = router;
