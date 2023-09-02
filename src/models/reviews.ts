import { prismaSingle } from "../prisma/main";
import { ReviewValues } from "../types/review";
import { ModelList } from "./interfaces/main";

export class Review implements ModelList {
  private static prisma = prismaSingle;
  private static review = this.prisma.review;

  constructor(private userId: number, private productId: number) {}

  async create(body: ReviewValues) {
    const { rate, comment } = body;
    return Review.review.create({
      data: {
        userId: this.userId,
        productId: this.productId,
        rate,
        comment,
      },
    });
  }
  async get_all() {
    return Review.review.findMany({
      where: {
        productId: this.productId,
      },
    });
  }
}
