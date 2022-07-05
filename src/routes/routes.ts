import express from "express";

import { createCadasterController } from "../controllers/createCadasterController/createCadasterController";

export const routes = express.Router();

routes.post("/cadaster", createCadasterController);