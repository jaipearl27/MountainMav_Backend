import express from "express";
import { getReviews, addReview, getReviewData, deleteReview, updateReview } from "../controller/reviewsController.js";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
import { upload } from "../utils/multer.js";

const reviewsRouter = express.Router();
reviewsRouter.route('/').get(getReviews).post(upload.array('image'), addReview)
reviewsRouter.route('/:reviewId').get(getReviewData).delete(verifyTokenMiddleware, deleteReview).patch(verifyTokenMiddleware, upload.array('image'), updateReview)

export default reviewsRouter