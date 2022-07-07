import express from "express";

import { registerBandController } from "../controllers/registerBandControllers/registerBandController";

export const bandRoutes = express.Router();

bandRoutes.post("/register", registerBandController);