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



router.post('/new/:id', ensureLoggedIn('/'), (req, res, next) =>{

  Subscription.findById(req.params.id, (err, currentSub) => {
    console.log('IN THE FIRST FINDBYID!!!!', currentSub);
    if (err) { return next(err); }

    // if user has a subscription in subscriptions.next
    if (req.user.subscriptions.nextOrder) {


      // if current sub is the same as .next
      if (req.user.subscriptions.nextOrder.title === currentSub.title) {
        console.log('CURRENT SUB TITLE',currentSub.title)
        return res.redirect('/');
      }

      // if current sub is different than .next
      const updates = {
        $push: { subscriptions: { pending: req.user.subscriptions.nextOrder } },
        $set: { subscriptions: { nextOrder: currentSub } }
      };

      User.findByIdAndUpdate(
        req.user._id,
        updates,
        (err, newSub) => {
          console.log('FIRST USER FIND BYIDUPDATE IF DIFFERENT');

          if (err) { return next(err); }

          return res.redirect('/');
        }
      );
      return;
    } // end the if user has a subscription in subscriptions.next


    // if no subscriptions.next is found
 console.log('req.user.subscriptions.nextOrder~~~~~~~~~',req.user.subscriptions.nextOrder);
    const newUpdate = {
       $set: { subscriptions : { nextOrder: currentSub } }
      // $push: { 'req.user.subscriptions.pending': currentSub}
    };

    // console.log('NEW UPDATE!!!!!!~~~~',newUpdate);

    User.findByIdAndUpdate(
      req.user._id,
      newUpdate,
      (err, user) => {
        console.log('SECOND USER FINDBYIDUPDATE IF NO SUB', user);
        if (err) { return next(err); }


        console.log('NOT GETTING AN ERROR~~~~~~');
        return res.redirect('/');
      }
    );

  });
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
