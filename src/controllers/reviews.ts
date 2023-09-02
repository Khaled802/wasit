import { Request, Response } from "express";
import { get_user } from "./helepers/user";
import { Review, ReviewObject } from "../models/reviews";
import { StatusCodes } from "http-status-codes";
import { CError } from "../errors/custome_error";
import { dbErrorHandler } from "./helepers/db";
import "express-async-errors";

export const makeReview = async (req: Request, res: Response) => {
  const user = await get_user(req);
  const userId = user.id;
  const productId = Number.parseInt(req.params.productId);

  const reviewRepo = new Review(userId, productId);
  const { comment, rate } = req.body;
  const review = await dbErrorHandler(async ()=>  await reviewRepo.create({ rate, comment}), 'review');
  res.status(StatusCodes.CREATED).json(review);
}


export const getProductReviews = async (req: Request, res: Response) => {
  const user = await get_user(req);
  const userId = user.id;
  const productId = Number.parseInt(req.params.productId);

  const reviewRepo = new Review(userId, productId);
  const reviews = await reviewRepo.get_all();
  res.json(reviews);
}

export const getReview = async (req: Request, res: Response) => {
  const user = await get_user(req);
  const userId = user.id;
  const reviewId = Number.parseInt(req.params.reviewId);

  const reviewObjRepo = new ReviewObject(reviewId, userId);
  const review = await reviewObjRepo.get();
  if (review == null)
    throw new CError('not found review', StatusCodes.NOT_FOUND);
  res.json(review);
}

export const updateReview = async (req: Request, res: Response) => {
  const user = await get_user(req);
  const userId = user.id;
  const reviewId = Number.parseInt(req.params.reviewId);
  const { rate, comment } = req.body;

  const reviewObjRepo = new ReviewObject(reviewId, userId);
  const review = await dbErrorHandler(async()=> await reviewObjRepo.update({ rate, comment }));
  res.json(review);
}

export const deleteReview = async (req: Request, res: Response) => {
  const user = await get_user(req);
  const userId = user.id;
  const reviewId = Number.parseInt(req.params.reviewId);
  
  const reviewObjRepo = new ReviewObject(reviewId, userId);
  const review = await dbErrorHandler(async()=> await reviewObjRepo.delete())
  res.status(StatusCodes.NO_CONTENT).json(review);
}