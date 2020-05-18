import React from "react";
import { AuthenticatedApp } from "../AuthenticatedApp";
import { getRandomDish } from "../../Dishes/getRandomDish";
import { LandingPage } from "../LandingPage";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { SplashPage } from "../SplashPage";

import { useAuth0 } from "../../react-auth0-spa";

export const App = () => {
  const {
    loading,
    isAuthenticated,
    loginWithRedirect,
    getTokenSilently,
  } = useAuth0()!;

  if (loading) {
    return <SplashPage />;
  }

  if (isAuthenticated) {
    const client = new ApolloClient({
      uri: "https://qp2t3zo3a8.execute-api.us-east-1.amazonaws.com/dev/graphql",
      request: async (operation) => {
        const token = isAuthenticated ? await getTokenSilently() : null;

        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : undefined,
          },
        });
      },
    });

    return (
      <ApolloProvider client={client}>
        <AuthenticatedApp getRandomDish={getRandomDish} />
      </ApolloProvider>
    );
  }

  return <LandingPage loginWithRedirect={loginWithRedirect} />;
};
