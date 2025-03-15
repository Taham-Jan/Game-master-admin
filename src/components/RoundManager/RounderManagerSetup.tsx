import React from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import RoundManagerCard from "./RoundManagerCard";
import RoundSettingsCard from "./RoundSettingsCard";

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
      <div className="round-manager-wrapper">
        <div className="round-manager-main-container">
          <div className="round-manager-left-container">
            <RoundManagerCard
              type="green"
              title="Round Mode"
              data={[
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
              ]}
            />
            <RoundManagerCard
              type="magenta"
              title="Mini Game"
              data={[
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
              ]}
            />
          </div>
          <div className="round-manager-middle-container">
            <RoundSettingsCard />
          </div>
          <div className="round-manager-right-container">
            <RoundManagerCard
              type="basic"
              title="Round Order"
              data={[
                "Classic Quiz",
                "Imagine",
                "Quizy Pics",
                "Repeat It",
                "Quizy Switch",
                "One by One",
                "Sharades",
                "Watch and Listen",
                "Dance",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
                "Classic Quiz",
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RounderManagerSetup;
