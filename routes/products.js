const express = require('express');
const router  = express.Router();
var multer  = require('multer')
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

    return res.render('products/show', {products: products})
  });
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, (err, products) => {
    if (err){ return next(err);}
  return res.render('products/show', {products: products});

});
});
router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id, (err, products) => {
    if (err){ return next(err); }
    return res.redirect('products/show');
  });
  });


module.exports = router;
