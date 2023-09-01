import { Request, Response } from "express";
import { CError } from "../errors/custome_error";
import { StatusCodes } from "http-status-codes";
import { Cart } from "../models/cart";
import { UserJWT } from "../types/users";

export const addCartItem = async (req: Request, res: Response) => {
  if (!req.user) throw new CError("should be auth", StatusCodes.UNAUTHORIZED);
  if (!("id" in req.user)) throw new Error("user has no id");
  const user = req.user as UserJWT;
  const userId = user.id;
  const { productId } = req.body;

  const cart = new Cart(userId);
  try {
    await cart.create({ productId });
    res.json({ msg: "added successfully"  });
  } catch (error) {
    const err = error as Error;
    if (!("code" in err) || err.code != "P2002") throw err;
    throw new CError("the product is added before", StatusCodes.BAD_REQUEST);
  }
};


export const listCartItems = async (req: Request, res: Response) => {
  if (!req.user) throw new CError("should be auth", StatusCodes.UNAUTHORIZED);
  if (!("id" in req.user)) throw new Error("user has no id");
  const user = req.user as UserJWT;
  const userId = user.id;

  const cart = new Cart(userId);

  const cartItems = await cart.get_all();
  res.json(cartItems);

}