import React, { lazy } from "react";

const RounderManagerSetup = lazy(
  () => import("../components/RoundManager/RounderManagerSetup")
);
const RoundManager = () => {
  return <RounderManagerSetup />;
};

export default RoundManager;
