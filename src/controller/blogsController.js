import { asyncHandler } from "../utils/errorHandler/asyncHandler.js";
import { blogsModel } from "../model/blogsModel.js";
import { uploadFile } from "../utils/cloudinary.js";

export const getBlogs = asyncHandler(async (req, res) => {
  const limit = req?.query?.limit || 12;
  const page = req?.query?.page || 1;
  const skip = (page - 1) * limit;
  let totalPages = 0;

  const totalAttendees = await blogsModel.countDocuments();
  totalPages = Math.ceil(totalAttendees / limit);

  const result = await blogsModel
    .find()
    .select("title banner slug")
    .skip(skip)
    .limit(limit);

  res.status(200).json({ status: true, totalPages, blogsData: result });
});

export const getRecentBlogs = asyncHandler(async (req, res) => {
  const limit = 3;
  const result = await blogsModel.find().limit(limit);

  res.status(200).json({ status: true, blogsData: result });
});

export const getBlogData = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const result = await blogsModel.findOne({slug: slug});

  res.status(200).json({ status: true, blogData: result });
});

export const addBlog = asyncHandler(async (req, res) => {
  const bannerImg = await uploadFile(req?.files);

  const payload = {
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    banner: bannerImg.result[0].url,
  };

  await blogsModel.create(payload);
  res.status(200).json({ status: true, message: "Blog saved successfully" });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  if (!slug) {
    res.status(500).json({ status: false, message: "Missing Slug" });
  }

  const payload = {
    title: req.body.title,
    content: req.body.content,
    slug: req.body.slug,
  };

  console.log(payload);

  if (req?.files && req?.files?.length > 0) {
    const bannerImg = await uploadFile(req?.files);
    payload.banner = bannerImg.result[0].url;
  }

  await blogsModel.findOneAndUpdate({ _id: req.body.id }, payload);
  res.status(200).json({ status: true, message: "Blog Updated successfully" });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  if (!blogId) {
    return res
      .status(400)
      .json({ status: false, message: "No blog id provided" });
  }
  const isIdValid = await blogsModel.findByIdAndDelete(blogId);
  if (!isIdValid) {
    return res
      .status(400)
      .json({ status: false, messaeg: "No note found with given id!!" });
  }

  res.status(200).json({ status: true, message: "blog deleted successfully" });
});
