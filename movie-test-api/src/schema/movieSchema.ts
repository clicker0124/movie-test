import { gql } from "apollo-server";

const movieTypeDef = gql`
  type Movie {
    id: String!
    title: String!
    rate: Float
    genre: String!
    director: String!
    description: String!
    releaseDate: String!
  }

  extend type Query {
    movie(movieId: String!): Movie
    movies: [Movie!]!
  }

  extend type Mutation {
    deleteMovie(movieId: String!): String
    addMovie(
      title: String!
      rate: Float
      genre: String!
      director: String!
      description: String!
      releaseDate: String!
    ): Movie!
    editMovie(
      id: String
      title: String
      rate: Float
      genre: String
      director: String
      description: String
      releaseDate: String
    ): Movie!
  }

  extend type Subscription {
    movieAdded: Movie!
  }
`;
export default movieTypeDef;
