var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

router.get('/', function(req, res) {
  res.redirect('/category');
});

router.get('/category', categoryController.categoryList);
router.get('/category/create', categoryController.getCategoryForm);
router.get('/category/:id', categoryController.getCategory);
router.get('/category/:id/edit', categoryController.getCategoryForm);
router.post('/category/:id/edit', categoryController.editCategory);
router.post('/category', categoryController.createCategory);


router.get('/item', itemController.itemList);
router.get('/item/create', itemController.getItemForm);
router.get('/item/:id', itemController.getItem);
router.get('/item/:id/edit', itemController.getItemForm);
router.get('/item/:id/delete', itemController.getDeleteItem);
router.post('/item', itemController.createOrEditItem);
router.post('/item/:id/edit', itemController.createOrEditItem);
router.post('/item/:id/delete', itemController.deleteItem);

module.exports = router;
