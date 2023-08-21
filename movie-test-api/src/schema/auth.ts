import { gql } from "apollo-server";

const userTypeDef = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
    role: String
  }

  type LoginResponse {
    token: String!
    user: User
  }

  type Query {
    currentUser: User!
    user(userId: String): User!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User!
    login(username: String!, password: String!): LoginResponse!
  }
`;
export default userTypeDef;
