import { createTestClient } from "apollo-server-testing";

jest.mock("../query-resolvers");
import { getDish } from "../query-resolvers";
import { server } from "../graphql-server";
import { gql } from "apollo-server-lambda";

const { query } = createTestClient(server);

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
  test("retrieves a dish from Unsplash", async () => {
    const res = await query({
      query: GET_DISH,
      variables: {
        dishId: "3DZTercmEF4",
      },
    });
    expect(res.data).toEqual(testResponse.data);
  });
});
