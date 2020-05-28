import React, { useReducer, useEffect, CSSProperties } from "react";
import { RedirectLoginOptions } from "@auth0/auth0-spa-js";
import styles from "./LandingPage.module.css";

const photoUrls = [
  {
    url: "joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg",
    photographer: "Joseph Gonzalez",
    handle: "@miracletwentyone",
  },
  {
    url: "casey-lee-awj7sRviVXo-unsplash.jpg",
    photographer: "Casey Lee",
    handle: "@simplethemes",
  },
  {
    url: "cayla1-w6ftFbPCs9I-unsplash.jpg",
    photographer: "Cayla1",
    handle: "@calya1",
  },
  {
    url: "edgar-castrejon-1SPu0KT-Ejg-unsplash.jpg",
    photographer: "Edgar Castrejon",
    handle: "@edgarraw",
  },
];

const animationTimeStep = 1000 / 60; // animation rate in milliseconds
const transitionDuration = 600; // in milliseconds
const maxAngle = 30; // max rotation angle in degrees
const timeStep = 1500; // time between new photos, in milliseconds

interface AnimationState {
  xPosition: number;
  photoUrlIndex: number;
}

interface animationAction {
  type: string;
}

const initialState = {
  xPosition: 0,
  photoUrlIndex: 0,
};
const updateToRight = "animation update right";
const updateNextState = "next state";
const updateToLeft = "animation update left";
const animationReducer = (
  state: AnimationState,
  action: animationAction
): AnimationState => {
  switch (action.type) {
    case updateToRight:
      return { ...state, xPosition: state.xPosition + 10 };
    case updateToLeft:
      return { ...state, xPosition: state.xPosition - 10 };
    case updateNextState:
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
          dispatch({ type: updateToRight });
        }, animationTimeStep);
        setTimeout(() => {
          clearInterval(interval);
          index = (index + 1) % photoUrls.length;
          dispatch({ type: updateNextState });
        }, transitionDuration);
      } else {
        const interval = setInterval(() => {
          dispatch({ type: updateToLeft });
        }, animationTimeStep);
        setTimeout(() => {
          clearInterval(interval);
          index = (index + 1) % photoUrls.length;
          dispatch({ type: updateNextState });
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
          src={require(`../../assets/${photoUrls[state.photoUrlIndex].url}`)}
          alt="stock images of food"
          style={loadedStyle}
        />
        <img // to preload next image to prevent flashing in between
          src={require(`../../assets/${
            photoUrls[(state.photoUrlIndex + 1) % photoUrls.length].url
          }`)}
          alt="stock images of food"
          style={{ height: "1px", width: "1px" }}
        />
        <figcaption className={styles.attribution}>
          Photo by{" "}
          <a
            href={`https://unsplash.com/${
              photoUrls[state.photoUrlIndex].handle
            }/?utm_source=That Looks Good&utm_medium=referral`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {photoUrls[state.photoUrlIndex].photographer}
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
      {/* <footer>Check out the Github repo for more details about this project.</footer> */}
    </main>
  );
};
