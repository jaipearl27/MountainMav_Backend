import express from "express";
import { getBlogs, addBlog, getBlogData, deleteBlog, getRecentBlogs, updateBlog } from "../controller/blogsController.js";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
import { upload } from "../utils/multer.js";

const blogsRouter = express.Router()

blogsRouter.route('/').get(getBlogs).post(verifyTokenMiddleware, upload.array('banner'), addBlog)
blogsRouter.route('/recent').get(getRecentBlogs)
blogsRouter.route('/:slug').get(getBlogData).patch(verifyTokenMiddleware,upload.array('banner'),updateBlog)
blogsRouter.route('/delete/:blogId').delete(verifyTokenMiddleware, deleteBlog)

export default blogsRouter