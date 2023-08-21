import { currentUser, register, login, user } from "./auth";
import {
  addMovie,
  movie,
  movies,
  deleteMovie,
  editMovie,
} from "./movieResolver";
import { addReview, reviews, deleteReview, editReview } from "./reviewResolver";
import { Movie, Review } from "../models";
import { Context } from "../types";

const resolverMap = {
  Query: {
    currentUser,
    movie,
    movies,
    reviews,
    user,
  },
  Mutation: {
    login,
    register,
    addMovie,
    deleteMovie,
    editMovie,
    addReview,
    deleteReview,
    editReview,
  },
  Subscription: {
    reviewAdded: {
      resolve: (payload: { reviewAdded: Review }) => {
        return payload.reviewAdded;
      },
      subscribe: (_: any, __: any, context: Context) => {
        return context.pubSub.asyncIterator(["REVIEW_ADDED"]);
      },
    },
    movieAdded: {
      resolve: (payload: { movieAdded: Movie }) => {
        return payload.movieAdded;
      },
      subscribe: (_: any, __: any, context: Context) => {
        return context.pubSub.asyncIterator(["MOVIE_ADDED"]);
      },
    },
  },
};

export default resolverMap;
