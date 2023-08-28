import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CError } from "../errors/custome_error";
import { StatusCodes } from "http-status-codes";

export const validatorMiddleware = async (
  req: Request,
  res: Response,
  next: any
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CError(
      "validation error",
      StatusCodes.BAD_REQUEST,
      errors.array()
    );
  }
  next();
};
