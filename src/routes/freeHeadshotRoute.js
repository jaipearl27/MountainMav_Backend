import express from "express";
import { upload } from "../utils/multer.js";
import { freeHeadshotCheckout } from "../controller/freeHeadshotController.js";

const freeHeadshotRouter = express.Router();
freeHeadshotRouter.route("/").post(upload.array("images"),freeHeadshotCheckout);

export default freeHeadshotRouter;
