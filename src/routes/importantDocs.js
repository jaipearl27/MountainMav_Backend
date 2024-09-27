import express from "express";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
import { upload } from "../utils/multer.js";
import { addImportantDoc, deleteImportantDoc, getImportantDoc, getImportantDocItem, updateImportantDoc } from "../controller/importantDocs.js";

const importantDocRouter = express.Router();

importantDocRouter
  .route("/")
  .get(getImportantDoc)
  .post(verifyTokenMiddleware, upload.array("file"), addImportantDoc);
importantDocRouter
  .route("/:id")
  .get(getImportantDocItem)
  .patch(verifyTokenMiddleware, upload.array("file"), updateImportantDoc)
  .delete(verifyTokenMiddleware, deleteImportantDoc);

export default importantDocRouter;
