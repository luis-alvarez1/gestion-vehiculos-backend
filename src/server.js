import { GraphQLServer } from "graphql-yoga";
import path from "path";

import resolvers from "./graphql/resolvers";

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, "graphql/schema.graphql"),
  resolvers,
});

export default server;
