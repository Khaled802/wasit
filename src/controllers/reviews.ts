import { Request, Response } from "express";
import { get_user } from "./helepers/user";
import { Review } from "../models/reviews";
import { StatusCodes } from "http-status-codes";
import { CError } from "../errors/custome_error";
import { dbErrorHandler } from "./helepers/db";

export const makeReview = async (req: Request, res: Response) => {
  const user = await get_user(req);
  const userId = user.id;
  const productId = Number.parseInt(req.params.productId);

  const reviewRepo = new Review(userId, productId);
  const { comment, rate } = req.body;
  const review = await dbErrorHandler(async ()=>  await reviewRepo.create({ rate, comment}), 'review');
  res.status(StatusCodes.CREATED).json(review);
}