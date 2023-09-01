import { Router } from "express";
import { addCartItem, listCartItems } from "../controllers/cart";
import { addCartBodyValidator } from "../validators/cart";
import { validatorMiddleware } from "../validators/main";

const route = Router();

route
  .route("/")
  .all(addCartBodyValidator, validatorMiddleware)
  .post(addCartItem);

route.route("/list").get(listCartItems);

export default route;
