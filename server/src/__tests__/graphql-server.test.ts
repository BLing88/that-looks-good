import { createTestClient } from "apollo-server-testing";
import { ApolloServer, gql } from "apollo-server-lambda";
import { getDish } from "../query-resolvers";
import { typeDefsString } from "../typeDefs";

const typeDefs = gql`
  ${typeDefsString}
`;

const resolvers = {
  Query: {
    getDish,
  },
};

const testServer = new ApolloServer({
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

// jest.mock("../query-resolvers");
// import { getDish } from "../query-resolvers";
// import { server } from "../graphql-server";
// import { gql } from "apollo-server-lambda";

const { query } = createTestClient(testServer);

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

// const testServer = Object.create(Object.getPrototypeOf(server));
// const unauthorizedContext = server.context();
// // Need to create test server this way so that we can pass in headers, otherwise
// // createTestClient will pass in empty object into context creator function
// const { query, mutate } = createTestClient(
//   Object.assign(testServer, server, { context: () => unauthorizedContext })
// );

describe("server", () => {
  test("rejects unauthorized requests", async () => {
    const res = await query({
      query: GET_DISH,
      variables: {
        dishId: "3DZTercmEF4",
      },
    });
    expect(res.errors).toBeDefined();
    expect(
      res.errors.map((err) => err.message).includes(`You are not authorized`)
    ).toBe(true);
    expect(res.data.getDish).toBeNull();
  });

  // test("retrieves a dish from Unsplash", async () => {
  //   const res = await query({
  //     query: GET_DISH,
  //     variables: {
  //       dishId: "3DZTercmEF4",
  //     },
  //   });
  //   expect(res.data).toEqual(testResponse.data);
  // });
});
