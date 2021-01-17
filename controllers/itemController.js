const { PrismaClient } = require('@prisma/client');
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
}