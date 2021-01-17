var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');
/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/category');
});

router.get('/category', categoryController.categoryList);
router.get('/category/:id', categoryController.getCategory);
router.get('/item', itemController.itemList);

module.exports = router;
