const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  // Delete all data
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();
  // Create categories
  const blackTea = await prisma.category.create({
    data: {
      title: 'Black Tea',
      description: 'Black tea is a type of tea that is more oxidized than oolong, yellow, white and green teas. Black tea is generally stronger in flavor than other teas. All four types are made from leaves of the shrub (or small tree) Camellia sinensis.',
    }
  });
  const greenTea = await prisma.category.create({
    data: {
      title: 'Green tea',
      description: 'Green tea is a type of tea that is made from Camellia sinensis leaves and buds that have not undergone the same withering and oxidation process used to make oolong teas and black teas.[1] Green tea originated in China, but its production and manufacture has spread to other countries in East Asia.'
    }
  });
  const oolongTea = await prisma.category.create({
    data: {
      title: 'Oolong tea',
      description: 'Oolong ( /ˈuːlʊŋ/; simplified Chinese: 乌龙; traditional Chinese: 烏龍 (wūlóng, "black dragon") is a traditional semi-oxidized Chinese tea (Camellia sinensis) produced through a process including withering the plant under strong sun and oxidation before curling and twisting.[1] Most oolong teas, especially those of fine quality, involve unique tea plant cultivars that are exclusively used for particular varieties. The degree of oxidation, which varies according to the chosen duration of time before firing, can range from 8 to 85%,[2] depending on the variety and production style. Oolong is especially popular in south China and among Chinese expatriates in Southeast Asia[3] as is the Fujian preparation process known as the Gongfu tea ceremony.'
    }
  });

  // Create teas
  await prisma.item.create({
    data: {
      name: 'Earl Grey',
      description: 'Earl Grey is cool',
      price: 6.5,
      stock: 20,
      category: {
        connect: { id: blackTea.id }
      },
    }
  });
  await prisma.item.create({
    data: {
      name: 'Thé des neiges',
      description: 'C\'est le 🔥 (enfin la ❄️ plutôt)',
      price: 4.3,
      stock: 10,
      category: {
        connect: { id: blackTea.id }
      },
    }
  });
  await prisma.item.create({
    data: {
      name: 'Thé sencha',
      description: 'Du thé japonais avec le goût de gazon',
      price: 10.99,
      stock: 45,
      category: {
        connect: { id: greenTea.id }
      },
    }
  });
  await prisma.item.create({
    data: {
      name: 'Milky Oolong',
      description: 'C\'est le 🔥, je sais pas en fait mdr',
      price: 15.50,
      stock: 5,
      category: {
        connect: { id: oolongTea.id }
      },
    }
  });
}

seed()
  .catch(e => {
    throw e;
  }).finally(async () => {
    await prisma.$disconnect();
  });