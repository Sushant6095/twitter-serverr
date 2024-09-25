import express from "express";
import bodyParser from "body-parser";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  const graphqlServer = new ApolloServer({
    typeDefs: `
   
        type Query {
          sayhello: String
        }   
    `,
    resolvers: {
      Query: {
        sayhello: () => "Hello World",
      },
    },
  });

  await graphqlServer.start();

  app.use("/graphql", expressMiddleware(graphqlServer));
     
 return app;
}