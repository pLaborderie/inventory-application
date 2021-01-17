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
  getCategoryForm: async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
      if (req.params.id) {
        // Edit form
        const category = await prisma.category.findUnique({ where: { id: parseInt(req.params.id) }});
        res.render('category_form', { category });
      } else {
        // Create form
        res.render('category_form');
      }
    } catch (err) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  },
  createCategory: async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
      const newCategory = await prisma.category.create({
        data: {
          title: req.body.title,
          description: req.body.description,
        },
      });
      return res.redirect('/category/' + newCategory.id);
    } catch (err) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  },
  editCategory: async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
      const editedCategory = await prisma.category.update({
        where: { id: parseInt(req.params.id) },
        data: {
          title: req.body.title,
          description: req.body.description,
        },
      });
      return res.redirect('/category/' + editedCategory.id);
    } catch (err) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  }
}