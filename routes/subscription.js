const express = require('express');
const router  = express.Router();
const Subscription = require('../models/subscription');
const INTEREST = require('../models/interest-types');
router.get('/new', (req, res) => {
  res.render('subscription/new');
});

router.post('/', (req, res, next) => {
  const newSubscription = new Subscription({
    title: req.body.name,
    description: req.body.description,
    interest: req.body.interest
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
  Subscription.find(
    {},
    (err, subscription) => {
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
router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Subscription.findByIdAndRemove(id, (err, subscription) => {
    if (err){ return next(err); }
    return res.redirect('subscription/show');
  });
  });

module.exports = router;
