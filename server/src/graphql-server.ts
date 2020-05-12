import { ApolloServer, gql } from "apollo-server-lambda";
import { getDish } from "./query-resolvers";
import { typeDefsString } from "./typeDefs";

const typeDefs = gql`
  ${typeDefsString}
`;

const resolvers = {
  Query: {
    getDish,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: { endpoint: "/dev/graphql" },
});

const handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});

module.exports = {
  server,
  handler,
};
