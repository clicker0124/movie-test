import { PubSub } from "graphql-subscriptions";

export interface RegisterResponse extends UserInfo {}

export interface LoginResponse {
  token: string;
  user: UserInfo;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  token?: string;
  role?: string;
}

export interface Context {
  userInfo: UserInfo;
  pubSub: PubSub;
}

export interface MovieInfo {
  id: string;
  title: string;
  rate: number;
  genre: string;
  director: string;
  description: string;
  releaseDate: string;
}

export interface ReviewInfo {
  id: string;
  movieId: string;
  userId: string;
  reviewContext: string;
  rate: number;
  createdDate: string;
}
