import { StatusCodes } from "http-status-codes";
import { CError } from "../../errors/custome_error";

const ErrorCodes = {
  UNIQUE_CONSTRAINT: "P2002",
  NOT_FOUND_RECORD: "P2025",
};

export const dbErrorHandler = async (func: any, modelName='') => {
  try {
    return await func();
  } catch (error) {
    const err = error as Error;
    if (!("code" in err)) throw err;
    if (err.code === ErrorCodes.UNIQUE_CONSTRAINT)
      throw new CError(`the ${modelName} is added before`, StatusCodes.BAD_REQUEST);
    if (err.code != ErrorCodes.NOT_FOUND_RECORD)
      throw new CError("id is wrong", StatusCodes.BAD_REQUEST);
    throw err;
  }
};
