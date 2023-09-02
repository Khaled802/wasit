import { prismaSingle } from "../prisma/main";
import { ReviewValues } from "../types/review";
import { ModelList, ModelObject } from "./interfaces/main";

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
      select: {
        id: true,
        rate: true,
        comment: true,
        productId: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
}

export class ReviewObject implements ModelObject {
  private static prisma = prismaSingle;
  private static review = this.prisma.review;

  constructor(private reviewId: number, private userId: number) {}

  async is_found() {
    const cnt = await ReviewObject.review.count({
      where: {
        id: this.reviewId,
      },
    });
    return cnt > 0;
  }

  async get() {
    return ReviewObject.review.findUnique({
      where: {
        id: this.reviewId,
      },
    });
  }
  async update(body: ReviewValues) {
    return ReviewObject.review.update({
      where: {
        userId: this.userId,
        id: this.reviewId,
      },
      data: {
        rate: body.rate,
        comment: body.comment,
      },
    });
  }
  async delete(): Promise<any> {
    return ReviewObject.review.delete({
      where: {
        id: this.reviewId,
        userId: this.userId,
      },
    });
  }
}
