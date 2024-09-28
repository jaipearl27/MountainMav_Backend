import { asyncHandler } from "../utils/errorHandler/asyncHandler.js";
import { toursModel } from "../model/tours.js";
import { treksModel } from "../model/treks.js";
import { specialTripsModel } from "../model/specialTrips.js";

export const getTitles = asyncHandler(async (req, res) => {
  const tours = await toursModel.find().select("title");
  const treks = await treksModel.find().select("title");
  const specialTrips = await specialTripsModel.find().select("title");
  res.status(200).json({ status: true, treks, tours, specialTrips });
});
