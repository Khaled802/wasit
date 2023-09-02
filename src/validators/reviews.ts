import { body, param } from "express-validator";
import { ProductObject } from "../models/product";
import { ReviewObject } from "../models/reviews";
import { get_user } from "../controllers/helepers/user";
import { Request } from "express";

export const reviewBodyValidation = [
  body("rate")
    .isInt()
    .withMessage("rate should be integer")
    .toInt()
    .custom(async (rate: number) => {
      if (rate > 5 || rate < 1)
        throw new Error("review rate should be integer between 1 to 5");
      return true;
    }),
  body("comment").notEmpty().withMessage("comment should't be empty"),
];


export const productReviewIdValidator = [
  param('productId').isInt().withMessage('product id should be integer').toInt()
  .custom(async (productId: number) => {
    const productObj = new ProductObject(productId);
    if (!(await productObj.is_found())) 
      throw new Error('product is not found');
    return true;
  })
]

export const reviewIdValidator = [
  param('reviewId').isInt().withMessage('product id should be integer').toInt()
  .custom(async (reviewId: number, { req }) => {
    const userId = (await get_user(req as Request)).id;
    const reviewObjRepo = new ReviewObject(reviewId, userId);
    if (!(await reviewObjRepo.is_found())) 
      throw new Error('review is not found');
    return true;
  })
]