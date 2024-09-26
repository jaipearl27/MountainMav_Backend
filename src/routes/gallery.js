import express from "express";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
import { upload } from "../utils/multer.js";
import { addGallery, deleteGallery, getGallery, getGalleryItem, updateGallery } from "../controller/gallery.js";

const galleryRouter = express.Router();

galleryRouter
  .route("/")
  .get(getGallery)
  .post(verifyTokenMiddleware, upload.array("file"), addGallery);
galleryRouter
  .route("/:id")
  .get(getGalleryItem)
  .patch(verifyTokenMiddleware, upload.array("file"), updateGallery)
  .delete(verifyTokenMiddleware, deleteGallery);

export default galleryRouter;
