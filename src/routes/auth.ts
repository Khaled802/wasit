import { Router } from "express";
import { signin, signup } from "../controllers/auth";
import { authBodyValidators, singinValidators } from "../validators/users";
import { validatorMiddleware } from "../validators/main";
import "express-async-errors";


const router = Router();

router.post('/signup', authBodyValidators, validatorMiddleware, signup);
router.post('/signin', singinValidators, validatorMiddleware, signin);


export default router;