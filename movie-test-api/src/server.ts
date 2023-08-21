import mongoose from "mongoose";
import yargs from "yargs";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import express from "express";
import { ApolloServer, PubSub } from "apollo-server-express";
import * as http from "http";
import { MovieModel, UserModel } from "./models";
import { initialAdminUser, initialMovies } from "./models/initialData";

const args = yargs.option("mongo-uri", {
  describe: "Mongo URI",
  default: "mongodb://localhost:27030/movies",
  type: "string",
  group: "Mongo",
}).argv;

async function start() {
  try {
    const pubSub = new PubSub();
    await mongoose.connect(args["mongo-uri"], {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to DB.");

    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({
        pubSub,
      }),
    });

    server.applyMiddleware({ app });
    server.installSubscriptionHandlers(httpServer);

    const PORT = 4000;

    httpServer.listen(PORT, () => {
      console.log(`GraphQl API running on port ${PORT}.`);
    });

    await MovieModel.insertMany(initialMovies, { ordered: true });
    await new UserModel({
      ...initialAdminUser,
    }).save();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
start();
