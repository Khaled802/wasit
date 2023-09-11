import { Request, Response } from "express";
import { getProductSub, removeSub } from "./grpc/main";
import { CError } from "../errors/custome_error";
// import protoLoader from "@grpc/proto-loader";
import "express-async-errors";


export const basicSearch = async (req: Request, res: Response) => {
    (await getProductSub()).find({ q: req.query.q }, async (err: any, products: any)=> {
      if(err) {
        await removeSub();
        return res.status(500).json({ msg: 'search problem'})
      } 
      res.json(products);
    })
};

