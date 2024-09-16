import express from "express";

import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
import { upload } from "../utils/multer.js";
import {  addTrek, deleteTrek, getTrek, getTreks, updateTrek } from "../controller/treks.js";

const treksRouter = express.Router();

treksRouter
  .route("/")
  .get(getTreks)
  .post(verifyTokenMiddleware, upload.array("banner"), addTrek);
treksRouter
  .route("/:id")
  .get(getTrek)
  .patch(upload.array("banner"), updateTrek)
  .delete(verifyTokenMiddleware, deleteTrek);

export default treksRouter;
