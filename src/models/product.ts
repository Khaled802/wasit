import { ModelList, ModelObject } from "./interfaces/main";
import { PrismaClient, Product, Prisma } from "@prisma/client";
import { ProductSafeBody } from "./interfaces/products";

export class ProductList implements ModelList {
  static prisma: PrismaClient | null = null;
  product: Prisma.ProductDelegate<any>;
  constructor() {
    if (ProductList.prisma === null) {
      ProductList.prisma = new PrismaClient();
    }
    this.product = ProductList.prisma.product;
  }

  async create(body: ProductSafeBody): Promise<Product> {
    const { name, description, amount } = body;
    return this.product.create({
      data: { name, description, amount },
    });
  }
  async get_all(): Promise<Product[]> {
    return this.product.findMany();
  }
}

export class ProductObject implements ModelObject {
  static prisma: PrismaClient | null = null;
  private product: Prisma.ProductDelegate<any>;
  readonly id: number;

  constructor(id: number) {
    if (ProductList.prisma === null) {
      ProductList.prisma = new PrismaClient();
    }
    this.product = ProductList.prisma.product;
    this.id = id;
  }

  async is_found(): Promise<boolean> {
    const count = await this.product.count({
      where: {
        id: this.id,
      },
    });

    return count > 1;
  }

  async get() {
    return this.product.findUnique({
      where: {
        id: this.id,
      },
    });
  }

  async update(data: ProductSafeBody) {
    const { name, description, amount } = data;
    return this.product.update({
      where: {
        id: this.id,
      },
      data: {
        name,
        description,
        amount,
      },
    });
  }

  async delete() {
    return this.product.delete({
      where: { 
        id: this.id
      }
    })
  }
}
