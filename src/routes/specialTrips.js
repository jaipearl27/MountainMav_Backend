import express from "express";

import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
import { upload } from "../utils/multer.js";
import { addSpecialTrip, deleteSpecialTrip, getSpecialTrip, getSpecialTrips, updateSpecialTrip } from "../controller/specialTrips.js";

const specialTripsRouter = express.Router();

specialTripsRouter
  .route("/")
  .get(getSpecialTrips)
  .post(verifyTokenMiddleware, upload.array("banner"), addSpecialTrip);
specialTripsRouter
  .route("/:id")
  .get(getSpecialTrip)
  .patch(upload.array("banner"), updateSpecialTrip)
  .delete(verifyTokenMiddleware, deleteSpecialTrip);

export default specialTripsRouter;
