import { Request, Response } from "express";
import { CError } from "../errors/custome_error";
import { StatusCodes } from "http-status-codes";
import { Cart } from "../models/cart";
import { UserJWT } from "../types/users";
import { get_user } from "./helepers/user";

export const addCartItem = async (req: Request, res: Response) => {
  const user = await get_user(req);
  const userId = user.id;
  const { productId } = req.body;

  const cart = new Cart(userId);
  try {
    await cart.create({ productId });
    res.json({ msg: "added successfully" });
  } catch (error) {
    const err = error as Error;
    if (!("code" in err) || err.code != "P2002") throw err;
    throw new CError("the product is added before", StatusCodes.BAD_REQUEST);
  }
};

export const listCartItems = async (req: Request, res: Response) => {
  const user = await get_user(req);
  const userId = user.id;

  const cart = new Cart(userId);

  const cartItems = await cart.get_all();
  res.json(cartItems);
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const user = await get_user(req);
  const userId = user.id;
  const cartItemId = Number.parseInt(req.params.id);
  if (cartItemId == undefined)
    throw new CError("cart item is not found", StatusCodes.NOT_FOUND);

  const cart = new Cart(userId);
  try {
    const cartItem = await cart.delete(cartItemId);
    res.status(StatusCodes.NO_CONTENT).json({ msg: "deleted successfully", cartItemId: cartItem.id });
  } catch (error) {
    const err = error as Error;
    if (!("code" in err) || err.code != "P2025") throw err;
    throw new CError("id is wrong", StatusCodes.BAD_REQUEST);
  }
};
