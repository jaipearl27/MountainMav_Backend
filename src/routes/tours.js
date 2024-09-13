import express from "express";

import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
import { upload } from "../utils/multer.js";
import { addTour, deleteTour, getTour, getTours, updateTour } from "../controller/tours.js";

const toursRouter = express.Router();

toursRouter
  .route("/")
  .get(getTours)
  .post(verifyTokenMiddleware, upload.array("banner"), addTour);
toursRouter
  .route("/:id")
  .get(getTour)
  .patch(upload.array("banner"), updateTour)
  .delete(verifyTokenMiddleware, deleteTour);

export default toursRouter;
