import React from "react";
import { RedirectLoginOptions } from "@auth0/auth0-spa-js";
import styles from "./LandingPage.module.css";

export const LandingPage = ({
  loginWithRedirect,
}: {
  loginWithRedirect: (p?: RedirectLoginOptions) => Promise<void>;
}) => {
  return (
    <main className={styles.landingPage}>
      <div className={styles.top}>
        <h1 className={styles.title}>That Looks Good</h1>
        <button
          className={styles.loginBtn}
          onClick={() => {
            loginWithRedirect();
          }}
        >
          Login
        </button>
      </div>

      <p className={styles.description}>
        Hungry but don't know what to eat? We'll help you choose: just swipe
        right on the dishes that look good and left on the ones that don't. Then
        simply choose from the ones you liked!{" "}
      </p>
    </main>
  );
};
