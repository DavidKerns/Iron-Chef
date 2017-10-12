const express = require('express');
const router  = express.Router();
const multer  = require('multer')
const Product = require('../models/products');
const TYPES    = require('../models/product-types');
const TYPES2    = require('../models/tier-types');

router.get('/new', (req, res) => {
  res.render('products/new', { types: TYPES, tier: TYPES2 });
});

router.post('/', (req, res, next) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    tier: req.body.tier,
    imageUrl: req.body.imageUrl
  });


  newProduct.save( (err) => {
  if (err) {
    console.log(err);
    res.render('products/new', { products: newProduct, types: TYPES, tier: TYPES2 });
  } else {
    res.redirect(`/products/${newProduct._id}`);
  }
  });
});



module.exports = router;
