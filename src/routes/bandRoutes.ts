import express from "express";

import { registerBandController } from "../controllers/BandControllers/registerBandController";
import { ViewBandDetailsController } from "../controllers/BandControllers/ViewBandDetailsController";
import { scheduleBandShowController } from "../controllers/BandControllers/ScheduleBandShowController";

export const bandRoutes = express.Router();

bandRoutes.get("/:bandName", ViewBandDetailsController);
bandRoutes.post("/register", registerBandController);
bandRoutes.post("/schedule/:id", scheduleBandShowController);