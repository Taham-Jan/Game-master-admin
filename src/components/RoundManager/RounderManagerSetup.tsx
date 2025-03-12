import React from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import RoundManagerCard from "./RoundManagerCard";

const RounderManagerSetup = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header
        pageTitle="Round Manager"
        showRightButton={true}
        rightButtonText="Save Setup"
        rightButtonIcon="/images/header/save-icon.png"
        onBackClick={() => navigate("/")}
        onRightButtonClick={() => navigate("/categories-form")}
        RightButtonProps={{
          rightButtonAxis: "35%",
          rightButtonIconAxis: "15%",
        }}
      />
      <RoundManagerCard title="Round Mode" />
    </>
  );
};

export default RounderManagerSetup;
