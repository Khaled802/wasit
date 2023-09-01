import { prismaSingle } from "../prisma/main";
import { ModelList } from "./interfaces/main";

export class Cart implements ModelList {
  private cartItem = prismaSingle.cartItem;

  constructor(private userId: number) {}
  
  async create(body: any): Promise<any> {
    const { productId } = body;
    return this.cartItem.create({
      data: {
        productId,
        userId: this.userId,
      },
    });
  }

  async get_all(): Promise<any[]> {
    return this.cartItem.findMany({
      where: {
        userId: this.userId,
      },
    });  
  }

  async delete(id: number) {
    return this.cartItem.delete({
      where: {
        id,
        userId: this.userId
      }
    })
  }
}
