import { Router } from "express";
import {
  create_product,
  delete_product,
  get_all_products,
  get_product_by_id,
  update_product,
  uploadImage,
} from "../controllers/products";
import "express-async-errors";
import { bodyValidator } from "../validators/products";
import { validatorMiddleware } from "../validators/main";
import { validateIdParam } from "../validators/object";
import { ProductObject } from "../models/product";
import { isfoundObjMiddleware } from "../middlewares/check_object";
import { upload } from "../uploading_files/main";

const router = Router();

router.route('/:id/image')
    .post(upload.single('image'), uploadImage)

router
  .route("/")
  .get(get_all_products)
  .post(bodyValidator, validatorMiddleware, create_product);

router
  .route("/:id")
  .all(
    validateIdParam,
    validatorMiddleware,
    isfoundObjMiddleware(ProductObject, "product")
  )
  .get(get_product_by_id)
  .put(bodyValidator, validatorMiddleware, update_product)
  .delete(delete_product);




export default router;
