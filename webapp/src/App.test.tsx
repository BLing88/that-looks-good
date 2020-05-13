import React from "react";
import { render, waitFor } from "@testing-library/react";

import { MockedProvider } from "@apollo/react-testing";
import { GET_DISH } from "./queries/queries";
import { DocumentNode } from "graphql";
import { UnsplashDish, DatabaseDish } from "./utility/Dish";

interface MockDishRequest {
  request: {
    query: DocumentNode;
    variables: {
      dishId: string;
    };
  };
  data?: {
    result: {
      getDish: UnsplashDish;
    };
  };
}

jest.mock("./Dishes/getRandomDish", () => ({
  getRandomDish: jest.fn(() => ({
    id: "testId",
    name: "test name",
    category: "Chinese",
  })),
}));
import { getRandomDish } from "./Dishes/getRandomDish";
import App from "./App";

const MockedApp = ({ mocks }: { mocks: MockDishRequest[] }) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <App getRandomDish={getRandomDish} />
    </MockedProvider>
  );
};

describe("App", () => {
  test("shows loading when successfully getting image on first load", async () => {
    const mocks = [
      {
        request: {
          query: GET_DISH,
          variables: {
            dishId: "testId",
          },
        },
        result: {
          data: {
            getDish: {
              dishId: "testId",
              user: {
                name: "test name",
                username: "testusername",
                htmlUrl: "testurl",
              },
              urls: {
                raw: "raw-url",
              },
            },
          },
        },
      },
    ];
    const { queryByText, getByText } = render(<MockedApp mocks={mocks} />);

    await waitFor(() => {
      expect(getByText(/loading/i)).toBeInTheDocument();
    });
    expect(queryByText(/error/i)).not.toBeInTheDocument();
    await waitFor(() => {
      expect(queryByText(/loading/i)).not.toBeInTheDocument();
    });
    expect(getByText("Unsplash")).toBeInTheDocument();
  });
  test("shows error if error loading image", async () => {
    const mocks = [
      {
        request: {
          query: GET_DISH,
          variables: {
            dishId: "testId",
          },
        },
        error: new Error("test loading error"),
      },
    ];
    const { queryByText, getByText } = render(<MockedApp mocks={mocks} />);

    await waitFor(() => {
      expect(getByText(/loading/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByText(/error/i)).toBeInTheDocument();
    });
    expect(queryByText("Unsplash")).not.toBeInTheDocument();
  });
});
