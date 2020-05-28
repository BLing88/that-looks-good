import React, { useReducer, useEffect, CSSProperties } from "react";
import { RedirectLoginOptions } from "@auth0/auth0-spa-js";
import styles from "./LandingPage.module.css";

const photoUrls = [
  "joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg",
  "casey-lee-awj7sRviVXo-unsplash.jpg",
  "cayla1-w6ftFbPCs9I-unsplash.jpg",
  "edgar-castrejon-1SPu0KT-Ejg-unsplash.jpg",
];

const animationTimeStep = 1000 / 60; // animation rate in milliseconds
const transitionDuration = 600; // in milliseconds
const maxAngle = 30; // max rotation angle in degrees
const timeStep = 1500; // time between new photos, in milliseconds

interface AnimationState {
  xPosition: number;
  photoUrlIndex: number;
}

const initialState = {
  xPosition: 0,
  photoUrlIndex: 0,
};
const animationReducer = (
  state: AnimationState,
  action: any
): AnimationState => {
  switch (action.type) {
    case "animation update right":
      return { ...state, xPosition: state.xPosition + 10 };
    case "animation update left":
      return { ...state, xPosition: state.xPosition - 10 };
    case "next state":
      return {
        xPosition: 0,
        photoUrlIndex: (state.photoUrlIndex + 1) % photoUrls.length,
      };
    default:
      return initialState;
  }
};

export const LandingPage = ({
  loginWithRedirect,
}: {
  loginWithRedirect: (p?: RedirectLoginOptions) => Promise<void>;
}) => {
  const [state, dispatch] = useReducer(animationReducer, initialState);
  const loadedStyle: CSSProperties = {
    width: Math.min(200, Math.floor(0.85 * window.innerWidth)),
    height: Math.min(300, Math.floor((3 * 0.85 * window.innerWidth) / 2)),
    position: "relative",
    transform: `
    translate(${state.xPosition}px, 0px)
    rotate(${
      maxAngle * Math.tanh(state.xPosition / (window.innerWidth / 2))
    }deg)`,
  };

  useEffect(() => {
    let index = 0;
    const animationInterval = setInterval(() => {
      if (index % 2 === 0) {
        const interval = setInterval(() => {
          dispatch({ type: "animation update right" });
        }, animationTimeStep);
        setTimeout(() => {
          clearInterval(interval);
          index = (index + 1) % photoUrls.length;
          dispatch({ type: "next state" });
        }, transitionDuration);
      } else {
        const interval = setInterval(() => {
          dispatch({ type: "animation update left" });
        }, animationTimeStep);
        setTimeout(() => {
          clearInterval(interval);
          index = (index + 1) % photoUrls.length;
          dispatch({ type: "next state" });
        }, transitionDuration);
      }
    }, timeStep);
    return () => clearInterval(animationInterval);
  }, []);

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

      <figure className={styles.photos}>
        <img
          src={require(`../../assets/${photoUrls[state.photoUrlIndex]}`)}
          alt="food"
          style={loadedStyle}
        />
        <figcaption className={styles.attribution}>
          Photo by{" "}
          <a href="#" target="_blank" rel="noreferrer noopener">
            Photographer
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com/?utm_source=That Looks Good&utm_medium=referral"
            target="_blank"
            rel="noreferrer noopener"
          >
            Unsplash
          </a>
        </figcaption>
      </figure>

      <p className={styles.description}>
        Hungry but don't know what to eat? We'll help you choose: just swipe
        right on the dishes that look good and left on the ones that don't. Then
        simply choose from the ones you liked!{" "}
      </p>
    </main>
  );
};
