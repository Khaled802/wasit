import { Request, Response } from "express";
import { productsStub } from "./grpc/main";
import { CError } from "../errors/custome_error";
// import protoLoader from "@grpc/proto-loader";


export const basicSearch = async (req: Request, res: Response) => {
  productsStub.find({ q: req.query.q }, (err: any, products: any)=> {
    if(err) throw new CError(err);
    res.json(products);
  })
};
