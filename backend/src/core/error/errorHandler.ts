import { Request, Response } from "express";
import { CustomError } from "./index";

export const errorHandler = (err: Error, req: Request, res: Response) => {
  switch (true) {
    case err instanceof CustomError:
      {
        const { statusCode, errors, logging } = err;

        if (logging) {
          console.error(JSON.stringify({
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          }, null, 2));
        }
        return res.status(statusCode).send({ errors });
      }

    default:
      console.error(JSON.stringify(err, null, 2));
      return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
  }
};