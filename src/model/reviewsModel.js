import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  image: {
    type: [],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  review: {
    type: String,
    required: [true, "Review is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  verification: {
    name: {
      type: String,
      required: [true, "Verification name is required"],
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      default: "#224cc2",
    },
  },
  stars: {
    type: Number,
    required: [true, "Star Ratings are required"],
    default: 0,
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
});

export const reviewsModel = mongoose.model("reviews", reviewSchema, "reviews");
