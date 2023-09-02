import { Router } from "express";
import { makeReview } from "../controllers/reviews";
import { reviewBodyValidation, reviewIdValidator } from "../validators/reviews";
import { validatorMiddleware } from "../validators/main";

const router = Router();


router.route('/:productId')
  .all(reviewIdValidator, validatorMiddleware)
  .post(reviewBodyValidation, validatorMiddleware,makeReview)


export default router;