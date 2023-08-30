import { ModelList, ModelObject } from "./interfaces/main";
import { PrismaClient, Product, Prisma } from "@prisma/client";
import { ProductSafeBody } from "./interfaces/products";
import { prismaSingle } from "../prisma/main";

export class ProductList implements ModelList {
  static prisma: PrismaClient = prismaSingle;
  product: Prisma.ProductDelegate<any>;
  constructor() {
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
  static prisma: PrismaClient = prismaSingle;
  private product: Prisma.ProductDelegate<any>;
  readonly id: number;

  constructor(id: number) {
    this.product = ProductList.prisma.product;
    this.id = id;
  }

  async is_found(): Promise<boolean> {
    const count = await this.product.count({
      where: {
        id: this.id,
      },
    });

    return count > 0;
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
        id: this.id,
      },
    });
  }

  async add_image(image: string) {
     const product = await this.get();
    if (product == null) return false;
    
    product.image.push(image);
    
    return await this.product.update({
      where: {
        id: this.id,
      },
      data: {
        image: product.image
      }
    })
  }
}
