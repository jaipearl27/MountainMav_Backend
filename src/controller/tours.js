import { asyncHandler } from "../utils/errorHandler/asyncHandler.js";
import { toursModel } from "../model/tours.js";
import { uploadFile } from "../utils/cloudinary.js";

export const getTours = asyncHandler(async (req, res) => {
  const limit = req?.query?.limit || 12;
  const page = req?.query?.page || 1;
  const skip = (page - 1) * limit;
  let totalPages = 0;

  const totalItems = await toursModel.countDocuments();
  totalPages = Math.ceil(totalItems / limit);

  const result = await toursModel
    .find()
    .select("title banner")
    .skip(skip)
    .limit(limit);

  res.status(200).json({ status: true, totalPages, data: result });
});


export const getTour = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if(!id){
    res.status(500).json({status: false, message: 'Missing ID'})
  }
  const result = await toursModel.findById(id);

  res.status(200).json({ status: true, data: result });
});

export const addTour = asyncHandler(async (req, res) => {
  const bannerImg = await uploadFile(req?.files);
  // const gallery;

  const payload = {
    title: req.body.title,
    content: req.body.content,
    banner: bannerImg.result[0],
  };

  await toursModel.create(payload);
  res.status(200).json({ status: true, message: "Saved successfully" });
});

export const updateTour = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if(!id){
    res.status(500).json({status: false, message: 'Missing ID'})
  }

  const payload = {
    title: req.body.title,
    content: req.body.content,
  };


  if (req?.files && req?.files?.length > 0) {
    const bannerImg = await uploadFile(req?.files);
    payload.banner = bannerImg.result[0];
  }

  await toursModel.findOneAndUpdate({ _id: id }, payload);
  res.status(200).json({ status: true, message: "Updated successfully" });
});

export const deleteTour = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if(!id){
    res.status(500).json({status: false, message: 'Missing ID'})
  }
  const isIdValid = await toursModel.findByIdAndDelete(id);
  if (!isIdValid) {
    return res
      .status(400)
      .json({ status: false, messaeg: "No Data found with given id!!" });
  }

  res.status(200).json({ status: true, message: "Deleted successfully" });
});
