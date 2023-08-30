import { Request, Response } from "express";
import { ProductList, ProductObject } from "../models/product";
import { CError } from "../errors/custome_error";
import { StatusCodes } from "http-status-codes";

export const get_all_products = async (req: Request, res: Response) => {
  const productListRepo = new ProductList();
  const products = await productListRepo.get_all();
  if (products.length === 0)
    throw new CError("there is no products", StatusCodes.NOT_FOUND);
  return res.json(products);
};

export const create_product = async (req: Request, res: Response) => {
  const body = req.body;
  const productListRepo = new ProductList();
  const product = await productListRepo.create(body);
  res.json(product);
};

export const get_product_by_id = async (req: Request, res: Response) => {
  const id: number = Number.parseInt(req.params.id);
  const productObjectRepo = new ProductObject(id);
  const product = await productObjectRepo.get();
  if (product === null)
    throw new CError("product not found", StatusCodes.NOT_FOUND);
  res.json(product);
};

export const update_product = async (req: Request, res: Response) => {
  const id: number = Number.parseInt(req.params.id);
  const productObjectRepo = new ProductObject(id);
  const body = req.body;
  const product = await productObjectRepo.update(body);
  res.json(product);
};

export const delete_product = async (req: Request, res: Response) => {
  const id: number = Number.parseInt(req.params.id);
  const productObjectRepo = new ProductObject(id);
  const product = await productObjectRepo.delete();
  res.status(StatusCodes.NO_CONTENT).json(product);
};


export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file)
    throw new CError('No file uploaded.', StatusCodes.BAD_REQUEST);
  // You can save the file info in a database or perform other actions here
  const productId = Number.parseInt(req.body.id);
  const productObjectRepo = new ProductObject(productId);
  if (!productObjectRepo.is_found())
    throw new CError('product not found', StatusCodes.NOT_FOUND);


  const product = await productObjectRepo.add_image(req.file.filename);

  res.json(product);
}