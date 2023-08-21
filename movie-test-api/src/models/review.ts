import mongoose from "mongoose";

export interface Review extends mongoose.Document {
  id: string;
  movieId: string;
  userId: string;
  reviewContext: string;
  rate: number;
  createdDate: string;
}
const ReviewSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  userId: { type: String, required: true },
  reviewContext: { type: String, required: true },
  rate: { type: Number, required: true },
  createdDate: { type: String },
});

export const ReviewModel = mongoose.model<Review>(
  "Review",
  ReviewSchema,
  "Reviews"
);

export default ReviewModel;
