import { param } from "express-validator";
import { ModelObject } from "../models/interfaces/main";

export const validateIdParam = [
  param("id").isInt().withMessage("id should be integer"),
];
