import { Router } from "express";
import route from "./cart";
import { basicSearch } from "../controllers/search";
import "express-async-errors";

const router = Router();


router.get('/basic', basicSearch);

export default router;