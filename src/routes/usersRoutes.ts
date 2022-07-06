import express from "express";

import { createCadasterUserController } from "../controllers/usersControllers/createCadasterUserController";

export const usersRoutes = express.Router();

usersRoutes.post("/cadaster", createCadasterUserController);