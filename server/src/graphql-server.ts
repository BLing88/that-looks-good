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

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
