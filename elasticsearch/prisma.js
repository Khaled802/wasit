const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports.getAllProducts = async() => {
  return await prisma.product.findMany();
}