var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/category');
});

router.get('/category', categoryController.categoryList);
router.get('/category/:id', categoryController.getCategory);

module.exports = router;
