import { body } from "express-validator";
import { ProductObject } from "../models/product";
import { CError } from "../errors/custome_error";


export const addCartBodyValidator = [
  body('productId')
    .isInt().withMessage('productId should be integer')
    .custom(async (productId)=> {
      const productObjRepo = new ProductObject(productId);
      if (!(await productObjRepo.is_found()))
        throw new CError('the product is not found');
      return true;
    })
]