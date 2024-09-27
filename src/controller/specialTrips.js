import { asyncHandler } from "../utils/errorHandler/asyncHandler.js";
import { specialTripsModel } from "../model/specialTrips.js";
import { uploadFile } from "../utils/cloudinary.js";



export const getSpecialTrips = asyncHandler(async (req, res) => {
  const limit = req?.query?.limit || 12;
  const page = req?.query?.page || 1;
  const skip = (page - 1) * limit;
  let totalPages = 1;

  const totalItems = await specialTripsModel.countDocuments();
  totalPages = Math.ceil(totalItems / limit);

  const result = await specialTripsModel
    .find()
    .select("title banner")
    .skip(skip)
    .limit(limit);

  res.status(200).json({ status: true, totalPages, data: result });
});


export const getSpecialTrip = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if(!id){
    res.status(500).json({status: false, message: 'Missing ID'})
  }
  const result = await specialTripsModel.findById(id);

  res.status(200).json({ status: true, data: result });
});

export const addSpecialTrip = asyncHandler(async (req, res) => {
  const bannerImg = await uploadFile(req?.files);
  // const gallery;

  const payload = {
    title: req.body.title,
    content: req.body.content,
    banner: bannerImg.result[0],
  };

  await specialTripsModel.create(payload);
  res.status(200).json({ status: true, message: "Saved successfully" });
});

export const updateSpecialTrip = asyncHandler(async (req, res) => {
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

  await specialTripsModel.findOneAndUpdate({ _id: id }, payload);
  res.status(200).json({ status: true, message: "Updated successfully" });
});

export const deleteSpecialTrip = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if(!id){
    res.status(500).json({status: false, message: 'Missing ID'})
  }
  const isIdValid = await specialTripsModel.findByIdAndDelete(id);
  if (!isIdValid) {
    return res
      .status(400)
      .json({ status: false, messaeg: "No Data found with given id!!" });
  }

  res.status(200).json({ status: true, message: "Deleted successfully" });
});
