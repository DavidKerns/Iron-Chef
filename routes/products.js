const express = require('express');
const router  = express.Router();
var multer  = require('multer');
const Product = require('../models/products');
const TYPES    = require('../models/product-types');
const INTEREST = require('../models/interest-types');
var upload = multer({ dest: './public/uploads' });

router.get('/new', (req, res) => {
  res.render('products/new', { types: TYPES, interest: INTEREST});
});

router.post('/', upload.single('imageUrl'), (req, res, next) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    interest: req.body.interest,
    imageUrl: `uploads/${req.file.filename}`,
  });
  newProduct.save( (err) => {
  if (err) {
    console.log(err);
    res.render('products/new', { products: newProduct, types: TYPES, interest:INTEREST});
  } else {
    res.redirect(`/products/${newProduct._id}`);
  }
  });
});
router.get('/show', (req, res, next) => {
  Product.find(
    {},
    (err, products) => {
      if (err){ return next(err);}

    return res.render('products/show', {pros: products})
  });
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, (err, products) => {
    if (err){ return next(err);}
  return res.render('products/show', {products: products});

});
});

router.get('/:id/edit', (req, res, next) => {
  Product.findById(req.params.id, (err, products) => {
    if (err)       { return next(err) }
    if (!products) { return next(new Error("404")) }
    return res.render('products/edit', { products, types: TYPES, interest: INTEREST })
  });
});
router.post('/:id', (req, res, next) => {
  const updates = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      interest: req.body.interest,
      imageUrl: `uploads/${req.file.filename}`,
  };

Product.findByIdAndUpdate(req.params.id, updates, (err, products) => {
    if (err) {
      return res.render('products/edit', {
        subscription,
        errors: products.errors
      });
    }
    if (!subscription) {
      return next(new Error('404'));
    }
    return res.redirect(`/products/${products._id}`);
  });
  });


router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id, (err, products) => {
    if (err){ return next(err); }
    return res.redirect('/show');
  });
  });


module.exports = router;
