import mongoose from "mongoose";

export interface Movie extends mongoose.Document {
  id: string;
  title: string;
  rate: number;
  genre: string;
  director: string;
  description: string;
  releaseDate: string;
}

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rate: { type: Number },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: String, required: true },
});

export const MovieModel = mongoose.model<Movie>("Movie", MovieSchema, "Movies");

export default MovieModel;
