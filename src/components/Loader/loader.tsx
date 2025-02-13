import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="top-loader-container">
      <div className="loader-wrapper">
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-shadow"></div>
        <div className="loader-shadow"></div>
        <div className="loader-shadow"></div>
        <span className="loader-span">Loading</span>
      </div>
    </div>
  );
};

export default Loader;
