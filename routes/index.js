var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/about",(req, res, next) => {
  res.render('./about/index');
  });
router.get("/tier",(req, res, next) => {
    res.render('./subscriptions/tier');
    });
module.exports = router;
