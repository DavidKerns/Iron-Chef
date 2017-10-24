var express = require('express');
var router = express.Router();
const Subscription = require('../models/subscription');
const INTEREST = require('../models/interest-types');
const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

/* GET home page. */
router.get('/', (req, res, next) => {
  validSubs= [];


  Subscription.find({}, (err, subscription) => {

    if (err) { return next(err); }
    if (req.user) {


      subscription.forEach(function(x){
        let validCounter = 0;
        x.interest.forEach(function(y){
          if(req.user.interest.indexOf(y) != -1)
            validCounter++;
        })
        if(validCounter > 1) {
          validSubs.push(x);
        }
      })

      return res.render('index', validSubs);
    }

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
