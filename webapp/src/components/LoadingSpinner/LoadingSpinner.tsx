import React from "react";
import "./LoadingSpinner.css";

export const LoadingSpinner = ({
  width,
  height,
  classname = "",
}: {
  width: number;
  height: number;
  classname?: string;
}) => {
  return (
    <div
      data-testid="loading-spinner"
      style={{ width, height }}
      className={`loading-spinner ${classname}`}
    ></div>
  );
};
