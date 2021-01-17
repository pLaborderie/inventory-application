const { PrismaClient } = require('@prisma/client');
const createError = require('http-errors');

module.exports = {
  categoryList: async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
      const categories = await prisma.category.findMany();
      res.render('category_list', { categories: categories });
    } catch (err) {
      next(err);
    } finally {
      await prisma.$disconnect();
    }
  },
  getCategory: async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
      const id = parseInt(req.params.id, 10);
      const category = await prisma.category.findFirst({ where: { id }, include: { items: true } });
      if (!category) {
        throw createError(404, 'Category not found');
      }
      res.render('category', { category });
    } catch (err) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  },
  getItem: async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
      const id = parseInt(req.params.id, 10);
      const item = await prisma.item.findFirst({ where: { id }, include: { category: true } });
      if (!item) {
        throw createError(404, 'Item not found');
      }
      res.render('item', { item });
    } catch (err) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  },
}