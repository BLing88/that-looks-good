import { createTestClient } from "apollo-server-testing";
import { server } from "../graphql-server";

const { query } = createTestClient(server);

describe("server", () => {
  test("retrieves a dish from Unsplash", async () => {});
});
