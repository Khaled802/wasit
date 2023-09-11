import express, { Request, Response } from "express";
import productsRouter from "./routes/product";
import authRouter from "./routes/auth";
import cartRouter from "./routes/cart";
import reviewsRouter from "./routes/reviews";
import searchRouter from "./routes/search";
import { CError } from "./errors/custome_error";
import dotenv from "dotenv";
import passport from "passport";
import { ErrorMessage } from "./types/error";
import { jwtStrategy } from "./JWT/main";
import { isAdminOrReadOnly } from "./middlewares/permissions/admin";
import { upload } from "./uploading_files/main";
import { basicSearch } from "./controllers/search";
var bodyParser = require("body-parser");
import "express-async-errors";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use()

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/uploads", express.static("uploads"));

app.use(
  "/products",
  passport.authenticate("jwt", { session: false }),
  isAdminOrReadOnly,
  productsRouter
);
app.use("/auth", authRouter);
app.use("/cart", passport.authenticate("jwt", { session: false }), cartRouter);
app.use("/reviews", passport.authenticate("jwt", { session: false }), reviewsRouter);
app.use('/search', searchRouter)

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
    console.log(err);
    res.status(c_err.status_code).json(result);
  }
);

app.listen(port, () => {
  console.log(`Server is running on port [${port}]`);
});
