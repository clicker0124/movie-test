import { AuthContextType } from "../context/authContext";
import { AuthUserInfo, Movie, Review, SortType } from "../types";

export const isAdmin = (context: AuthContextType): boolean => {
  return context && context.context?.role === "admin";
};

export const isUserLogin = (context: AuthUserInfo | null) => {
  return context!!;
};

export const getAverageRate = (reviews: Review[] | undefined): string => {
  if (!reviews?.length) return "No reviews";
  return (
    reviews.reduce((acc: number, review: Review) => acc + review.rate, 0) /
    reviews.length
  ).toFixed(1);
};

export const sortMoviesByField = (
  movies: Movie[],
  field: SortType
): Movie[] => {
  let sortFunction;

  switch (field) {
    case "releaseDate":
      sortFunction = (a: Movie, b: Movie) => {
        if (new Date(a.releaseDate) < new Date(b.releaseDate)) {
          return -1;
        }
        if (new Date(a.releaseDate) > new Date(b.releaseDate)) {
          return 1;
        }
        return 0;
      };
      break;
    case "title":
    case "director":
    case "genre":
      sortFunction = (a: Movie, b: Movie) => {
        if (a[field]?.toLowerCase() < b[field]?.toLowerCase()) {
          return -1;
        }
        if (a[field]?.toLowerCase() > b[field]?.toLowerCase()) {
          return 1;
        }
        return 0;
      };
      break;
    default:
      return movies;
  }

  return [...movies].sort(sortFunction);
};
