import React from "react";
import { AuthenticatedApp } from "../AuthenticatedApp";
import { getRandomDish } from "../../Dishes/getRandomDish";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://qp2t3zo3a8.execute-api.us-east-1.amazonaws.com/dev/graphql",
});

export const App = () => {
  return (
    <div>
      <ApolloProvider client={client}>
        <AuthenticatedApp getRandomDish={getRandomDish} />
      </ApolloProvider>
    </div>
  );
};
