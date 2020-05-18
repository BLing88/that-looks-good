import React from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import styles from "./SplashPage.module.css";

export const SplashPage = () => {
  return (
    <div className={styles.splashPage}>
      <h1 className={styles.appName}>That Looks Good</h1>
      <LoadingSpinner
        width={30}
        height={30}
        classname={styles.loadingSpinner}
      />
    </div>
  );
};
