import React from "react";
import CustomCheckBox from "../Shared/CustomCheckBox";
import { RoundSettingSelectBox } from "../Shared/SelectBox";

const RoundSettingsCard = () => {
  return (
    <div className="round-setting-card-container">
      <div className="round-setting-card-parent-heading">Round Settings</div>
      <div className="round-setting-card-child-container">
        <div className="round-setting-card-option">
          <span className="round-setting-card-heading">Suggest Break</span>
          <CustomCheckBox checked={true} onChange={() => {}} size={32} />
        </div>
        <img
          className="seperator-line"
          src="/images/roundManager/seperator-line.png"
        />
        <RoundSettingSelectBox
          label="Break Duration"
          value={"option 1"}
          options={["option 1", "option 2", "option 3"]}
          includeAllOption
          onChange={() => {}}
          seperatorLine={true}
        />
        <RoundSettingSelectBox
          label="Pause After Rule"
          value={"option 1"}
          options={["option 1", "option 2", "option 3"]}
          includeAllOption
          onChange={() => {}}
          seperatorLine={true}
        />
        <RoundSettingSelectBox
          label="Pause After Question"
          value={"option 1"}
          options={["option 1", "option 2", "option 3"]}
          includeAllOption
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default RoundSettingsCard;
