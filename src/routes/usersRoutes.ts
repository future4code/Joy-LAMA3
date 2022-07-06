import express from "express";

import { createCadasterUserController } from "../controllers/usersControllers/createCadasterUserController";

import { makeLoginUserController } from './../controllers/usersControllers/makeLoginUserController';


export const usersRoutes = express.Router();

usersRoutes.post("/cadaster", createCadasterUserController);
usersRoutes.post("/singup", makeLoginUserController);