import { Router } from "express";
import { deleteReview, getProductReviews, getReview, makeReview, updateReview } from "../controllers/reviews";
import {
  reviewBodyValidation,
  productReviewIdValidator,
  reviewIdValidator,
} from "../validators/reviews";
import { validatorMiddleware } from "../validators/main";

const router = Router();

router
  .route("/product/:productId")
  // ----- middlewares -------- //
  .all(productReviewIdValidator, validatorMiddleware)
  // ------- methods ---------- //
  .get(getProductReviews)
  .post(reviewBodyValidation, validatorMiddleware, makeReview)


router
  .route("/:reviewId")
  // ----- middlewares -------- //
  .all(reviewIdValidator, validatorMiddleware)
  // ------- methods ---------- //
  .get(getReview)
  .put(reviewBodyValidation, validatorMiddleware, updateReview)
  .delete(deleteReview);

export default router;
