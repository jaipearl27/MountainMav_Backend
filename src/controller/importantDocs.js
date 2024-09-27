import { asyncHandler } from "../utils/errorHandler/asyncHandler.js";
import { importantDocModel } from "../model/importantDocs.js";
import { uploadFile } from "../utils/cloudinary.js";

export const getImportantDoc = asyncHandler(async (req, res) => {
  const limit = req?.query?.limit || 12;
  const page = req?.query?.page || 1;
  const skip = (page - 1) * limit;
  let totalPages = 1;

  const totalItems = await importantDocModel.countDocuments();
  totalPages = Math.ceil(totalItems / limit);

  const result = await importantDocModel.find().skip(skip).limit(limit);

  res.status(200).json({ status: true, totalPages, data: result });
});

export const getImportantDocItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(500).json({ status: false, message: "Missing ID" });
  }
  const result = await importantDocModel.findById(id);

  res.status(200).json({ status: true, data: result });
});

export const addImportantDoc = asyncHandler(async (req, res) => {
  // const importantDoc;
  const { title } = req?.body;
  if (!title && !req?.files) {
    res.status(500).json({ status: false, message: "" });
  }

  const uploadedFile = await uploadFile(req?.files);

  const payload = {
    title,
    file: uploadedFile.result[0],
  };

  await importantDocModel.create(payload);
  res.status(200).json({ status: true, message: "Saved successfully" });
});

export const updateImportantDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(500).json({ status: false, message: "Missing ID" });
  }

  const { title } = req?.body;
  const uploadedFile = await uploadFile(req?.files);

  const payload = {
    title,
    file: uploadedFile.result[0],
  };

  await importantDocModel.findOneAndUpdate({ _id: id }, payload);
  res.status(200).json({ status: true, message: "Updated successfully" });
});

export const deleteImportantDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(500).json({ status: false, message: "Missing ID" });
  }
  const isIdValid = await importantDocModel.findByIdAndDelete(id);
  if (!isIdValid) {
    return res
      .status(400)
      .json({ status: false, messaeg: "No Data found with given id!!" });
  }

  res.status(200).json({ status: true, message: "Deleted successfully" });
});
