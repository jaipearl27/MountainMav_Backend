import express from "express";

import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
import { upload } from "../utils/multer.js";
import { addSpecialProgram, deleteSpecialProgram, getSpecialProgram, getSpecialPrograms, updateSpecialProgram } from "../controller/specialPrograms.js";

const specialProgramsRouter = express.Router();

specialProgramsRouter
  .route("/")
  .get(getSpecialPrograms)
  .post(verifyTokenMiddleware, upload.array("banner"), addSpecialProgram);
specialProgramsRouter
  .route("/:id")
  .get(getSpecialProgram)
  .patch(upload.array("banner"), updateSpecialProgram)
  .delete(verifyTokenMiddleware, deleteSpecialProgram);

export default specialProgramsRouter;
