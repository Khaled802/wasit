import express, { Request, Response } from "express";
import productsRouter from "./routes/product";
import { CError } from "./errors/custome_error";
import dotenv from "dotenv";
import "express-async-errors";
import { ErrorMessage } from "./types/error";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/products", productsRouter);

app.use(
  async (
    err: Error | CError,
    req: Request,
    res: Response,
    next: any
  ): Promise<undefined> => {
    let c_err;
    if (!(err instanceof CError)) {
      c_err = new CError("server problem");
    } else {
      c_err = err;
    }
    const result: ErrorMessage = { msg: c_err.message };
    if (c_err.is_there_message_details()) {
      result.msg_details = c_err.message_details;
    }
    res.status(c_err.status_code).json(result);
  }
);

app.listen(port, () => {
  console.log(`Server is running on port [${port}]`);
});
