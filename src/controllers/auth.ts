import { Request, Response } from "express"
import { Auth } from "../models/auth";
import { CError } from "../errors/custome_error";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'
import { ProductList } from "../models/product";
import { JWT_SECRET } from "../JWT/main";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const authRepo = new Auth();
  const user = await authRepo.signup({ username, email, password });
  res.status(StatusCodes.CREATED).json({ ...user, password: undefined});
}



export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const authRepo = new Auth();
  const user = await authRepo.signin({ email, password });
  
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}