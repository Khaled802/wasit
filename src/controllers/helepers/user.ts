import { Request } from "express";
import { CError } from "../../errors/custome_error";
import { StatusCodes } from "http-status-codes";
import { UserJWT } from "../../types/users";

export const get_user = async (req: Request) => {
  if (!req.user) throw new CError("should be auth", StatusCodes.UNAUTHORIZED);
  if (!("id" in req.user)) throw new Error("user has no id");
  return req.user as UserJWT;
}