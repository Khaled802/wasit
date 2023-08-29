import { Request, Response, Express } from "express"
import { CError } from "../../errors/custome_error";
import { StatusCodes } from "http-status-codes";
import { Role } from "@prisma/client"

const SAFE_METHODS = ['GET']

export const isAdminOrReadOnly = async (req: Request, res: Response, next: any) => {
  if (SAFE_METHODS.includes(req.method)) {
    return next();
  }
  const user = req.user;
  if (user == undefined)
    throw new CError('should be authenticated', StatusCodes.UNAUTHORIZED);
  if ('role' in user && user.role == Role.Admin) {
    return next();
  }
  throw new CError('should be authenticated as admin', StatusCodes.UNAUTHORIZED);
}