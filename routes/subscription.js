const express = require('express');
const router  = express.Router();
var multer  = require('multer');
const Subscription = require('../models/subscription');
const User = require('../models/user');
const INTEREST = require('../models/interest-types');
var upload = multer({ dest: './public/uploads' });
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/new', (req, res) => {
  res.render('subscription/new');
});

router.post('/', upload.single('subImageUrl'), (req, res, next) => {
  const newSubscription = new Subscription({
    title: req.body.name,
    description: req.body.description,
    interest: req.body.interest,
    subImageUrl: `uploads/${req.file.filename}`,
  });
  newSubscription.save( (err) => {
  if (err) {
    console.log(err);
    res.render('subscription/new', { subscription: newSubscription, types: INTEREST});
  } else {
    res.redirect(`/subscription/${newSubscription._id}`);
  }
  });
});

router.get('/show', (req, res, next) => {
  Subscription.find({},  (err, subscription) => {
      if (err){ return next(err);}

    return res.render('subscription/show', {subs: subscription})
  });
});

router.get('/:id', (req, res, next) => {
  Subscription.findById(req.params.id, (err, subscription) => {
    if (err){ return next(err);}

  return res.render('subscription/show', {subscription: subscription});


  });
});



router.post('/user/:id/subscription', ensureLoggedIn('/'), (req, res, next) =>{
  console.log("INSIDE POST /user/:id/subscription");

  if (req.user) {
  User.findById(req.user._id, (err, ReturnedUser) => {
    if (err) { return next(err); }
    console.log(ReturnedUser.username);
  console.log("USER DEF", ReturnedUser);
  ReturnedUser.pendingSubscriptions.push(req.params.id);
  ReturnedUser.nextOrder = req.params.id;

console.log("ReturnedUser", ReturnedUser);
  ReturnedUser.save((err) =>{
    if(err){
    return next(err);
  }else {
    return res.redirect("/");
  }
});
 //  User.findById(req.user._id, (err, User) =>{
 //    if (err) {
 //      return next (new Error("404"));
 // }
    });
};
});


router.get('/:id/edit', (req, res, next) => {
  Subscription.findById(req.params.id, (err, subscription) => {
    if (err)       { return next(err) }
    if (!subscription) { return next(new Error("404")) }
    return res.render('subscription/edit', { subscription, types: INTEREST })
  });
});

router.post('/:id', (req, res, next) => {
  const updates = {
    title: req.body.title,
    description: req.body.description,
    interest: req.body.interest,
    subImageUrl: `uploads/${req.file.filename}`,
  };

Subscription.findByIdAndUpdate(req.params.id, updates, (err, subscription) => {
    if (err) {
      return res.render('subscription/edit', {
        subscription,
        errors: subscription.errors
      });
    }
    if (!subscription) {
      return next(new Error('404'));
    }
    return res.redirect(`/subscription/${subscription._id}`);
  });
  });


router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Subscription.findByIdAndRemove(id, (err, subscription) => {
    if (err){ return next(err); }
    return res.redirect('/');
  });
  });

module.exports = router;
