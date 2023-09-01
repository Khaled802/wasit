import { Router } from "express";
import {
  addCartItem,
  deleteCartItem,
  listCartItems,
} from "../controllers/cart";
import { addCartBodyValidator } from "../validators/cart";
import { validatorMiddleware } from "../validators/main";
import { validateIdParam } from "../validators/object";

const route = Router();

route.post("/", addCartBodyValidator, validatorMiddleware, addCartItem);

route.delete("/:id", validateIdParam, validatorMiddleware, deleteCartItem);

route.route("/list").get(listCartItems);

export default route;
