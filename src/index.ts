import { Request, Response, NextFunction } from "express";
import { app } from "./server";
import 'express-async-errors'; // https://www.npmjs.com/package/express-async-errors

import { CustomError } from "./errors/CustomError";

import { usersRoutes }  from "./routes/usersRoutes";

app.use("/user", usersRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  return error instanceof CustomError 
  ?
  res.status(error.statusCode).send(error.message)
  :
  res.status(500).send(error.message || error.sqlMessage)
});