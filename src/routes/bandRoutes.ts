import express from "express";

import { registerBandController } from "../controllers/BandControllers/registerBandController";
import { ViewBandDetailsController } from "../controllers/BandControllers/ViewBandDetailsController";
import { scheduleBandShowController } from "../controllers/BandControllers/scheduleBandShowController";
import { catchAllTheShowsOfTheDayController } from "../controllers/BandControllers/CatchAllTheShowsOfTheDayController";

export const bandRoutes = express.Router();

bandRoutes.get("/search-shows-day", catchAllTheShowsOfTheDayController);
bandRoutes.get("/:bandName", ViewBandDetailsController);

bandRoutes.post("/register", registerBandController);
bandRoutes.post("/schedule/:id", scheduleBandShowController);