import React from "react";
import { RedirectLoginOptions } from "@auth0/auth0-spa-js";

export const LandingPage = ({
  loginWithRedirect,
}: {
  loginWithRedirect: (p?: RedirectLoginOptions) => Promise<void>;
}) => {
  return (
    <main>
      <button
        className="login-btn"
        onClick={() => {
          loginWithRedirect();
        }}
      >
        Login
      </button>
    </main>
  );
};
