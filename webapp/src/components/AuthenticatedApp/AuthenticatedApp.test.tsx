import React from "react";
import { render, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/react-testing";
import { GET_DISH } from "../../queries/queries";
import { DocumentNode } from "graphql";
import { UnsplashDish, DatabaseDish, Category } from "../../utility/Dish";
import {
  buildTestDatabaseDish,
  buildTestUnsplashDish,
} from "../../test/utility/randomDishes";

jest.mock("../../react-auth0-spa");
import { useAuth0 } from "../../react-auth0-spa";
const mockUseAuth0 = useAuth0 as jest.MockedFunction<typeof useAuth0>;
const mockAuth0Value = {
  isAuthenticated: false,
  user: null,
  loading: true,
  popupOpen: false,
  loginWithPopup: jest.fn().mockName("mockLoginWithPopup"),
  handleRedirectCallback: jest.fn().mockName("mockHandleRedirectCallback"),
  getIdTokenClaims: jest.fn().mockName("mockGetIdTokenClaims"),
  loginWithRedirect: jest.fn().mockName("mockLoginWithRedirect"),
  getTokenSilently: jest.fn().mockName("mockGetTokenSilently"),
  getTokenWithPopup: jest.fn().mockName("mockGetTokenWithPopup"),
  logout: jest.fn().mockName("mockLogout"),
};
mockUseAuth0.mockReturnValue({
  ...mockAuth0Value,
  loading: false,
  isAuthenticated: true,
  logout: jest.fn().mockName("mockLogout"),
});

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

jest.mock("../../Dishes/getRandomDish", () => ({
  getRandomDish: jest.fn(() => ({
    id: "testId",
    name: "test name",
    category: "Chinese",
  })),
}));
import { getRandomDish } from "../../Dishes/getRandomDish";
import { AuthenticatedApp } from "./AuthenticatedApp";

const storageKey = "that-looks-good-swipe-counts";

const MockedApp = ({
  mocks,
  getRandDish = getRandomDish,
}: {
  mocks: MockDishRequest[];
  getRandDish?: (x?: any) => DatabaseDish;
}) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthenticatedApp getRandomDish={getRandDish} />
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
    expect(localStorage.getItem(storageKey)).toBeNull();
    await MockLoadedApp(mocks);
    expect(localStorage.getItem(storageKey)).toEqual(
      JSON.stringify({ counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], totalSwipes: 0 })
    );
  });

  test("updates swipe counts when swiping right", async () => {
    const randomDatabaseDish: DatabaseDish = buildTestDatabaseDish();
    const randomUnsplashDish: UnsplashDish = buildTestUnsplashDish();
    const indexToUpdate =
      Category[randomDatabaseDish.category as keyof typeof Category];
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

    const testCounts = {
      counts: [1, 20, 0, 43, 3, 20, 30, 47, 30, 19],
      totalSwipes: 213,
    };

    localStorage.setItem(storageKey, JSON.stringify(testCounts));

    const before = JSON.parse(localStorage.getItem(storageKey)!);
    expect(before.counts[indexToUpdate]).toEqual(
      testCounts.counts[indexToUpdate]
    );
    expect(before.totalSwipes).toEqual(testCounts.totalSwipes);
    swipeRight(getByAltText, randomDatabaseDish.name);

    const after = JSON.parse(localStorage.getItem(storageKey)!);
    expect(after.counts[indexToUpdate]).toEqual(
      before.counts[indexToUpdate] + 1
    );
    expect(after.totalSwipes).toEqual(before.totalSwipes + 1);
  });

  test("gets new image when swiping right", async () => {
    const randomDatabaseDish1: DatabaseDish = buildTestDatabaseDish();
    const randomDatabaseDish2: DatabaseDish = buildTestDatabaseDish();
    const randomUnsplashDish1: UnsplashDish = buildTestUnsplashDish();
    const randomUnsplashDish2: UnsplashDish = buildTestUnsplashDish();
    const mocks = [
      {
        request: {
          query: GET_DISH,
          variables: {
            dishId: randomDatabaseDish1.id,
          },
        },
        result: {
          data: {
            getDish: randomUnsplashDish1,
          },
        },
      },
      {
        request: {
          query: GET_DISH,
          variables: {
            dishId: randomDatabaseDish2.id,
          },
        },
        result: {
          data: {
            getDish: randomUnsplashDish2,
          },
        },
      },
    ];

    const memoizedGetRandomDish = () => {
      let numCalls = 0;
      return () => {
        if (numCalls === 0) {
          numCalls++;
          return randomDatabaseDish1;
        } else {
          return randomDatabaseDish2;
        }
      };
    };

    const { getByAltText, getByText } = await MockLoadedApp(
      mocks,
      memoizedGetRandomDish()
    );

    swipeRight(getByAltText, randomDatabaseDish1.name);
    await waitFor(() => {
      expect(getByText(/loading/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByAltText(randomDatabaseDish2.name)).toBeInTheDocument();
    });
  });

  test("doesn't change swipe counts when swiping left", async () => {
    const randomDatabaseDish: DatabaseDish = buildTestDatabaseDish();
    const randomUnsplashDish: UnsplashDish = buildTestUnsplashDish();
    const indexToUpdate =
      Category[randomDatabaseDish.category as keyof typeof Category];
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

    const testCounts = {
      counts: [31, 20, 67, 43, 3, 29, 30, 47, 30, 19],
      totalSwipes: 319,
    };

    localStorage.setItem(storageKey, JSON.stringify(testCounts));

    const before = JSON.parse(localStorage.getItem(storageKey)!);
    expect(before.counts[indexToUpdate]).toEqual(
      testCounts.counts[indexToUpdate]
    );
    expect(before.totalSwipes).toEqual(testCounts.totalSwipes);

    swipeLeft(getByAltText, randomDatabaseDish.name);

    const after = JSON.parse(localStorage.getItem(storageKey)!);
    expect(after).toEqual(before);
  });

  test("gets new image when swiping left", async () => {
    const randomDatabaseDish1: DatabaseDish = buildTestDatabaseDish();
    const randomDatabaseDish2: DatabaseDish = buildTestDatabaseDish();
    const randomUnsplashDish1: UnsplashDish = buildTestUnsplashDish();
    const randomUnsplashDish2: UnsplashDish = buildTestUnsplashDish();
    const mocks = [
      {
        request: {
          query: GET_DISH,
          variables: {
            dishId: randomDatabaseDish1.id,
          },
        },
        result: {
          data: {
            getDish: randomUnsplashDish1,
          },
        },
      },
      {
        request: {
          query: GET_DISH,
          variables: {
            dishId: randomDatabaseDish2.id,
          },
        },
        result: {
          data: {
            getDish: randomUnsplashDish2,
          },
        },
      },
    ];

    const memoizedGetRandomDish = () => {
      let numCalls = 0;
      return () => {
        if (numCalls === 0) {
          numCalls++;
          return randomDatabaseDish1;
        } else {
          return randomDatabaseDish2;
        }
      };
    };

    const { getByAltText, getByText } = await MockLoadedApp(
      mocks,
      memoizedGetRandomDish()
    );

    swipeLeft(getByAltText, randomDatabaseDish1.name);
    await waitFor(() => {
      expect(getByText(/loading/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByAltText(randomDatabaseDish2.name)).toBeInTheDocument();
    });
  });

  test("shows liked dishes for current session when you click on Liked button", async () => {
    const randomDatabaseDish1: DatabaseDish = buildTestDatabaseDish();
    const randomDatabaseDish2: DatabaseDish = buildTestDatabaseDish();
    const randomDatabaseDish3: DatabaseDish = buildTestDatabaseDish();
    const randomUnsplashDish1: UnsplashDish = buildTestUnsplashDish();
    const randomUnsplashDish2: UnsplashDish = buildTestUnsplashDish();
    const randomUnsplashDish3: UnsplashDish = buildTestUnsplashDish();
    const mocks = [
      {
        request: {
          query: GET_DISH,
          variables: {
            dishId: randomDatabaseDish1.id,
          },
        },
        result: {
          data: {
            getDish: randomUnsplashDish1,
          },
        },
      },
      {
        request: {
          query: GET_DISH,
          variables: {
            dishId: randomDatabaseDish2.id,
          },
        },
        result: {
          data: {
            getDish: randomUnsplashDish2,
          },
        },
      },
      {
        request: {
          query: GET_DISH,
          variables: {
            dishId: randomDatabaseDish3.id,
          },
        },
        result: {
          data: {
            getDish: randomUnsplashDish3,
          },
        },
      },
    ];

    const memoizedGetRandomDish = () => {
      let numCalls = 0;
      return () => {
        if (numCalls === 0) {
          numCalls++;
          return randomDatabaseDish1;
        } else if (numCalls === 3) {
          numCalls++;
          return randomDatabaseDish2;
        } else if (numCalls === 5) {
          return randomDatabaseDish3;
        } else {
          numCalls++;
          return buildTestDatabaseDish();
        }
      };
    };

    const { getByAltText, getByText, queryByText } = await MockLoadedApp(
      mocks,
      memoizedGetRandomDish()
    );
    expect(getByAltText(randomDatabaseDish1.name)).toBeInTheDocument();
    swipeRight(getByAltText, randomDatabaseDish1.name);

    await waitFor(() => {
      expect(getByAltText(randomDatabaseDish2.name)).toBeInTheDocument();
    });

    swipeRight(getByAltText, randomDatabaseDish2.name);
    await waitFor(() => {
      expect(getByAltText(randomDatabaseDish3.name)).toBeInTheDocument();
    });

    userEvent.click(getByText(/liked/i));
    expect(getByText(/You liked these dishes:/i)).toBeInTheDocument();
    expect(getByText(randomDatabaseDish1.name)).toBeInTheDocument();
    expect(getByText(randomDatabaseDish2.name)).toBeInTheDocument();
    expect(queryByText(randomDatabaseDish3.name)).not.toBeInTheDocument();
  });

  test("prevent duplicates from being added to liked dishes", async () => {
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
    const { getByAltText, getByText, getAllByText } = await MockLoadedApp(
      mocks,
      () => randomDatabaseDish
    );

    swipeRight(getByAltText, randomDatabaseDish.name);
    swipeRight(getByAltText, randomDatabaseDish.name);
    userEvent.click(getByText(/liked/i));
    expect(getAllByText(randomDatabaseDish.name)).toHaveLength(1);
  });
});
