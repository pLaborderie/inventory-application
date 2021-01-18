const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require('express-validator');
const createError = require('http-errors');

const formatPrice = price => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

module.exports = {
  itemList: async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
      const items = await prisma.item.findMany({ include: { category: true } });
      res.render('item_list', { items });
    } catch (err) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  },
  getItem: async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
      const item = await prisma.item.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { category: true },
      });
      if (!item) {
        throw createError(404, 'Item not found');
      }
      res.render('item', { item: { ...item, formattedPrice: formatPrice(item.price) } });
    } catch (err) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  },
  getItemForm: async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
      const categories = await prisma.category.findMany();
      if (req.params.id) {
        // Edit form
        const item = await prisma.item.findUnique({ where: { id: parseInt(req.params.id) }});
        res.render('item_form', { item, categories });
      } else {
        // Create form
        res.render('item_form', { categories });
      }
    } catch (err) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  },
  createOrEditItem: [
    body('name', 'The name is required').trim().isLength({ min: 1 }).escape(),
    body('description', 'The description is required').trim().isLength({ min: 1 }).escape(),
    body('category', 'The category is required').isInt({ min: 0 }).escape(),
    body('price', 'The price is required').isNumeric({ min: 0 }).escape(),
    body('stock', 'The stock is required').isNumeric({ min: 0 }).escape(),
    async (req, res, next) => {
      const errors = validationResult(req);
      const prisma = new PrismaClient();
      const { name, description, category, price, stock } = req.body;
      try {
        if(!errors.isEmpty()) {
          const categories = await prisma.category.findMany();
          return res.render('item_form', {
            item: {
              name, description, category, price, stock
            },
            categories,
            errors: errors.array()
          });
        }

        const data = {
          name,
          description,
          price: parseFloat(price),
          stock: parseInt(stock),
          category: {
            connect: { id: parseInt(category) },
          },
        };
        if (req.params.id) {
          await prisma.item.update({
            where: { id: parseInt(req.params.id) },
            data,
          });
          res.redirect(`/item/${req.params.id}`);
        } else {
          const newItem = await prisma.item.create({ data });
          res.redirect(`/item/${newItem.id}`);
        }
      } catch (err) {
        return next(err);
      } finally {
        await prisma.$disconnect();
      }
    },
  ]
}