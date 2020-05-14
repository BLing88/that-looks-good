import React from "react";
import { AuthenticatedApp } from "../AuthenticatedApp";
import { getRandomDish } from "../../Dishes/getRandomDish";
import { LandingPage } from "../LandingPage";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import { useAuth0 } from "../../react-auth0-spa";

export const App = () => {
  const {
    loading,
    isAuthenticated,
    loginWithRedirect,
    getTokenSilently,
  } = useAuth0()!;

    return (
      <div>
        <ApolloProvider client={client}>
          <AuthenticatedApp getRandomDish={getRandomDish} />
        </ApolloProvider>
      </div>
    );
  }

  return <LandingPage loginWithRedirect={loginWithRedirect} />;
};
