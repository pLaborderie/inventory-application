const { PrismaClient } = require('@prisma/client');
const createError = require('http-errors');

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
  }
}