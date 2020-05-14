import React from "react";
import { App } from "./App";
import { render, waitFor } from "@testing-library/react";

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

describe("App", () => {
  test("shows login page to unauthenticated user", () => {
    mockUseAuth0.mockReturnValueOnce({
      ...mockAuth0Value,
      loading: false,
      isAuthenticated: false,
    });
    const { getByText } = render(<App />);
    expect(getByText(/login/i)).toBeInTheDocument();
  });

  test("shows authenticated app to authenticated user", async () => {
    mockUseAuth0.mockReturnValueOnce({
      ...mockAuth0Value,
      loading: false,
      isAuthenticated: true,
    });

    const { getByText, queryByText } = render(<App />);
    expect(queryByText(/login/i)).not.toBeInTheDocument();
    await waitFor(() => {
      expect(getByText("Liked")).toBeInTheDocument();
    });
    expect(getByText(/loading/i)).toBeInTheDocument();
  });
});
