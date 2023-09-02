import { body, param } from "express-validator";
import { ProductObject } from "../models/product";

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


export const reviewIdValidator = [
  param('productId').isInt().withMessage('product id should be integer').toInt()
  .custom(async (productId: number) => {
    const productObj = new ProductObject(productId);
    if (!(await productObj.is_found())) 
      throw new Error('product is not found');
    return true;
  })
]