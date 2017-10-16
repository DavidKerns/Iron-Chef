const express = require('express');
const router  = express.Router();
const Subscription = require('../models/subscription');

router.get('/new', (req, res) => {
  res.render('subscriptions/new');
});

router.post('/', (req, res, next) => {
  const newSubscription = new Subscription({
    title: req.body.name,
    description: req.body.description,
    tier: req.body.tier,
  });
});

module.exports = router;
