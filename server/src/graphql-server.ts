import { ApolloServer, gql } from "apollo-server-lambda";
import { getDish } from "./query-resolvers";
import { typeDefsString } from "./typeDefs";
import { APIGatewayProxyEvent } from "aws-lambda";

const typeDefs = gql`
  ${typeDefsString}
`;

const resolvers = {
  Query: {
    getDish,
  },
};

const createContext = ({ event }: { event: APIGatewayProxyEvent }) => {
  const accessToken = event.headers.Authorization || "";

  return {
    accessToken,
  };
};

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  playground: { endpoint: "/dev/graphql" },
});

export const handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});

module.exports = {
  server,
  handler,
};
