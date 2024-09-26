import { asyncHandler } from "../utils/errorHandler/asyncHandler.js";
import { galleryModel } from "../model/gallery.js";
import { uploadFile } from "../utils/cloudinary.js";

export const getGallery = asyncHandler(async (req, res) => {
  const limit = req?.query?.limit || 12;
  const page = req?.query?.page || 1;
  const skip = (page - 1) * limit;
  let totalPages = 1;

  const totalItems = await galleryModel.countDocuments();
  totalPages = Math.ceil(totalItems / limit);

  const result = await galleryModel.find().skip(skip).limit(limit);

  res.status(200).json({ status: true, totalPages, data: result });
});

export const getGalleryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(500).json({ status: false, message: "Missing ID" });
  }
  const result = await galleryModel.findById(id);

  res.status(200).json({ status: true, data: result });
});

export const addGallery = asyncHandler(async (req, res) => {
  const uploadedFile = await uploadFile(req?.files);
  // const gallery;

  const payload = {
    file: uploadedFile.result[0],
  };

  await galleryModel.create(payload);
  res.status(200).json({ status: true, message: "Saved successfully" });
});

export const updateGallery = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(500).json({ status: false, message: "Missing ID" });
  }

  const uploadedFile = await uploadFile(req?.files);

  const payload = {
    file: uploadedFile.result[0],
  };

  await galleryModel.findOneAndUpdate({ _id: id }, payload);
  res.status(200).json({ status: true, message: "Updated successfully" });
});

export const deleteGallery = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(500).json({ status: false, message: "Missing ID" });
  }
  const isIdValid = await galleryModel.findByIdAndDelete(id);
  if (!isIdValid) {
    return res
      .status(400)
      .json({ status: false, messaeg: "No Data found with given id!!" });
  }

  res.status(200).json({ status: true, message: "Deleted successfully" });
});
