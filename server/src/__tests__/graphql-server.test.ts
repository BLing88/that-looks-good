import { createTestClient } from "apollo-server-testing";
import { ApolloServer, gql } from "apollo-server-lambda";
import { getDish } from "../query-resolvers";
import { typeDefsString } from "../typeDefs";
require("dotenv").config();

const typeDefs = gql`
  ${typeDefsString}
`;

const resolvers = {
  Query: {
    getDish,
  },
};

const unAuthorizedUserServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    event: {
      headers: {
        Authorization: `Bearer invalid.test.token.asdf`,
      },
    },
  }),
});

const authorizedUserServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    event: {
      headers: {
        Authorization: `Bearer ${process.env.VALID_TEST_TOKEN}`,
      },
    },
  }),
});

// jest.mock("../query-resolvers");
// import { getDish } from "../query-resolvers";
// import { server } from "../graphql-server";
// import { gql } from "apollo-server-lambda";

const { query: unAuthorizedQuery } = createTestClient(unAuthorizedUserServer);
const { query: authorizedQuery } = createTestClient(authorizedUserServer);

const testResponse = {
  data: {
    getDish: {
      dishId: "3DZTercmEF4",
      user: {
        name: "Alana Harris",
        username: "alanaharris",
        htmlUrl: "https://unsplash.com/@alanaharris",
      },
      urls: {
        raw:
          "https://images.unsplash.com/photo-1564869733874-7c154d5de210?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzMzk0MH0",
      },
    },
  },
};

const GET_DISH = gql`
  query getDish($dishId: ID!) {
    getDish(dishId: $dishId) {
      dishId
      user {
        name
        username
        htmlUrl
      }
      urls {
        raw
      }
    }
  }
`;

describe("server", () => {
  test("rejects unauthorized requests", async () => {
    const res = await unAuthorizedQuery({
      query: GET_DISH,
      variables: {
        dishId: "3DZTercmEF4",
      },
    });
    expect(res.errors).toBeDefined();
    expect(
      res.errors.map((err) => err.message).includes(`You are not authorized.`)
    ).toBe(true);
    expect(res.data.getDish).toBeNull();
  });

  // test("retrieves a dish from Unsplash for authorized user", async () => {
  //   const res = await authorizedQuery({
  //     query: GET_DISH,
  //     variables: {
  //       dishId: "3DZTercmEF4",
  //     },
  //   });
  //   expect(res.data).toEqual(testResponse.data);
  // });
});
