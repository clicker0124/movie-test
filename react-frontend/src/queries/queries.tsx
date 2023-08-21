import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  {
    movies {
      id
      title
      genre
      director
      description
      releaseDate
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($movieId: String!) {
    movie(movieId: $movieId) {
      title
      description
      releaseDate
      director
      genre
    }
  }
`;
export const ADD_MOVIE = gql`
  mutation AddMovie(
    $title: String!
    $genre: String!
    $director: String!
    $description: String!
    $releaseDate: String!
    $rate: Float
  ) {
    addMovie(
      title: $title
      genre: $genre
      director: $director
      description: $description
      releaseDate: $releaseDate
      rate: $rate
    ) {
      title
      director
      description
      releaseDate
      genre
      rate
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview(
    $movieId: String!
    $userId: String!
    $reviewContext: String!
    $rate: Float!
  ) {
    addReview(
      movieId: $movieId
      userId: $userId
      reviewContext: $reviewContext
      rate: $rate
    ) {
      movieId
      userId
      reviewContext
      rate
    }
  }
`;

export const REVIEW_ADDED = gql`
  subscription ReviewAdded {
    reviewAdded {
      id
      userId
      movieId
      reviewContext
      rate
      createdDate
    }
  }
`;

export const MOVIE_ADDED = gql`
  subscription MovieAdded {
    movieAdded {
      id
      title
      rate
      description
      releaseDate
      director
      genre
    }
  }
`;

export const GET_REVIEWS_BY_MOVIE_ID = gql`
  query GetReview($movieId: String!) {
    reviews(movieId: $movieId) {
      id
      userId
      reviewContext
      rate
      createdDate
    }
  }
`;

export const EDIT_MOVIE = gql`
  mutation EditMovie(
    $id: String
    $title: String
    $genre: String
    $director: String
    $description: String
    $releaseDate: String
  ) {
    editMovie(
      id: $id
      title: $title
      genre: $genre
      director: $director
      description: $description
      releaseDate: $releaseDate
    ) {
      title
      director
      description
      releaseDate
      genre
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($movieId: String!) {
    deleteMovie(movieId: $movieId)
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($userId: String!) {
    user(userId: $userId) {
      username
      email
      role
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(username: $username, email: $email, password: $password) {
      username
      email
      id
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;
