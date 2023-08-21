import { gql } from "apollo-server";

const reviewTypeDef = gql`
  type Review {
    id: String!
    movieId: String!
    userId: String!
    reviewContext: String!
    rate: Float!
    createdDate: String!
  }

  extend type Query {
    reviews(movieId: String!): [Review!]!
  }

  extend type Mutation {
    deleteReview(reviewId: String!): String!
    addReview(
      movieId: String!
      userId: String!
      reviewContext: String!
      rate: Float!
    ): Review!
    editReview(reviewId: String!, reviewContext: String, rate: String): Review!
  }

  type Subscription {
    reviewAdded: Review!
  }
`;

export default reviewTypeDef;
