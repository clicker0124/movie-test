export type Movie = {
  id: string;
  title: string;
  rate: number;
  genre: string;
  director: string;
  releaseDate: string;
  description: string;
};

export type Review = {
  id: string;
  movieId: string;
  userId: string;
  reviewContext: string;
  rate: number;
  createdDate: string;
};

export type AuthUserInfo = {
  id?: string;
  username?: string;
  email?: string;
  token?: string;
  role?: string;
};

export type SortType = "title" | "genre" | "director" | "releaseDate";
export type SeverityType = "error" | "warning" | "info" | "success";
