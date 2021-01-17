const { PrismaClient } = require('@prisma/client');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/category', async function(req, res, next) {
  try {
    const prisma = new PrismaClient();
    const categories = await prisma.category.findMany();
    res.render('category_list', { categories: categories });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
