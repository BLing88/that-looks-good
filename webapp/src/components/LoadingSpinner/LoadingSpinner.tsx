import React from "react";
import "./LoadingSpinner.css";

export const LoadingSpinner = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return <div style={{ width, height }} className="loading-spinner"></div>;
};
