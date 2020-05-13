import React from "react";
import { render, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { MockedProvider } from "@apollo/react-testing";
import { GET_DISH } from "./queries/queries";
import { DocumentNode } from "graphql";
import { UnsplashDish, DatabaseDish } from "./utility/Dish";
import {
  buildTestDatabaseDish,
  buildTestUnsplashDish,
} from "./test/utility/randomDishes";

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

const MockedApp = ({
  mocks,
  getRandDish = getRandomDish,
}: {
  mocks: MockDishRequest[];
  getRandDish?: (x?: any) => DatabaseDish;
}) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <App getRandomDish={getRandDish} />
    </MockedProvider>
  );
};

const MockLoadedApp = async (
  mocks: MockDishRequest[],
  getRandDish: (x?: any) => DatabaseDish = getRandomDish
) => {
  const queries = render(<MockedApp mocks={mocks} getRandDish={getRandDish} />);
  await waitFor(() => {
    expect(queries.getByText(/loading/i)).toBeInTheDocument();
  });
  expect(queries.queryByText(/error/i)).not.toBeInTheDocument();
  await waitFor(() => {
    expect(queries.queryByText(/loading/i)).not.toBeInTheDocument();
  });
  return queries;
};

afterEach(() => {
  localStorage.removeItem("that-looks-good-swipe-counts");
});

const swipeRight = (
  getByAltText: (
    text: Matcher,
    options?: MatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement,
  targetAltText: string
) => {
  fireEvent.touchStart(getByAltText(targetAltText), {
    touches: [
      { clientX: window.innerWidth / 2, clientY: window.innerWidth / 2 },
    ],
  });
  fireEvent.touchMove(getByAltText(targetAltText), {
    touches: [
      {
        clientX: (3 * window.innerWidth) / 2 + 10,
        clientY: window.innerWidth / 2,
      },
    ],
  });
  fireEvent.touchEnd(getByAltText(targetAltText), {
    touches: [
      {
        clientX: (3 * window.innerWidth) / 2 + 10,
        clientY: window.innerWidth / 2,
      },
    ],
  });
};

const swipeLeft = (
  getByAltText: (
    text: Matcher,
    options?: MatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement,
  targetAltText: string
) => {
  fireEvent.touchStart(getByAltText(targetAltText), {
    touches: [
      { clientX: window.innerWidth / 2, clientY: window.innerWidth / 2 },
    ],
  });
  fireEvent.touchMove(getByAltText(targetAltText), {
    touches: [
      {
        clientX: window.innerWidth / 4 - 10,
        clientY: window.innerWidth / 2,
      },
    ],
  });
  fireEvent.touchEnd(getByAltText(targetAltText), {
    touches: [
      {
        clientX: window.innerWidth / 4 - 10,
        clientY: window.innerWidth / 2,
      },
    ],
  });
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

  test("sets initial swipe counts in localStorage if none found", async () => {
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
    expect(localStorage.getItem("that-looks-good-swipe-counts")).toBeNull();
    await MockLoadedApp(mocks);
    expect(localStorage.getItem("that-looks-good-swipe-counts")).toEqual(
      JSON.stringify({ counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], totalSwipes: 0 })
    );
  });

  test("updates swipe counts when swipe right and total swipes < 100", async () => {
    const randomDatabaseDish: DatabaseDish = buildTestDatabaseDish();
    const randomUnsplashDish: UnsplashDish = buildTestUnsplashDish();
    const mocks = [
      {
        request: {
          query: GET_DISH,
          variables: {
            dishId: randomDatabaseDish.id,
          },
        },
        result: {
          data: {
            getDish: randomUnsplashDish,
          },
        },
      },
    ];
    const { getByAltText } = await MockLoadedApp(
      mocks,
      () => randomDatabaseDish
    );
    swipeRight(getByAltText, randomDatabaseDish.name);
  });
});
