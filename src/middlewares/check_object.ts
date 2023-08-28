import { StatusCodes } from "http-status-codes";
import { CError } from "../errors/custome_error";
import { ModelObject } from "../models/interfaces/main";
import { Request, Response } from "express";

export const isfoundObjMiddleware = (
  ModelRepo: new (id: number) => ModelObject,
  modelName: string
) => {
  return async (req: Request, res: Response, next: any) => {
    const id = Number.parseInt(req.params.id);
    const modelRepo = new ModelRepo(id);
    if (!(await modelRepo.is_found()))
      throw new CError(`not found ${modelName}`, StatusCodes.NOT_FOUND);
    next();
  };
};
