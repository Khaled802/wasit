import { Router } from 'express';
import { create_product, get_all_products } from '../controllers/products';
import 'express-async-errors';
import { bodyValidator } from "../validators/products";
import { validatorMiddleware } from "../validators/main";

const router = Router();

router.route('/')
  .get(get_all_products)
  .post(bodyValidator, validatorMiddleware, create_product);

export default router;