import React from "react";
import CustomCheckBox from "../Shared/CustomCheckBox";
import { RoundSettingSelectBox } from "../Shared/SelectBox";
import { useFormikContext } from "formik";

const RoundSettingsCard = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  const numberOptions = Array.from({ length: 60 }, (_, i) => i + 1);

  return (
    <div className="round-setting-card-container">
      <div className="round-setting-card-parent-heading">Round Settings</div>
      <div className="round-setting-card-child-container">
        <RoundSettingSelectBox
          label="Mode"
          value={values.isManual}
          options={["Auto", "Manual"]}
          onChange={(value: string) => setFieldValue("isManual", value)}
          seperatorLine={true}
        />
        <RoundSettingSelectBox
          label="Stations Count"
          value={values.stationsCount}
          options={["4", "8"]}
          onChange={(value: string) => setFieldValue("stationsCount", value)}
          seperatorLine={true}
        />
        <div className="round-setting-card-option">
          <span className="round-setting-card-heading">Suggest Break</span>
          <CustomCheckBox
            checked={values.roundSettings.suggestBreak}
            onChange={(checked: boolean) =>
              setFieldValue("roundSettings.suggestBreak", checked)
            }
            size={32}
          />
        </div>
        <img
          className="seperator-line"
          src="/images/roundManager/seperator-line.png"
        />
        <RoundSettingSelectBox
          label="Break Duration"
          value={values.roundSettings.breakDuration}
          options={numberOptions}
          onChange={(value: number) =>
            setFieldValue("roundSettings.breakDuration", value)
          }
          seperatorLine={true}
        />
        <RoundSettingSelectBox
          label="Pause After Rule"
          value={values.roundSettings.pauseAfterRule}
          options={numberOptions}
          onChange={(value: number) =>
            setFieldValue("roundSettings.pauseAfterRule", value)
          }
          seperatorLine={true}
        />
        <RoundSettingSelectBox
          label="Pause After Question"
          value={values.roundSettings.pauseAfterQuestion}
          options={numberOptions}
          onChange={(value: number) =>
            setFieldValue("roundSettings.pauseAfterQuestion", value)
          }
          seperatorLine={true}
        />
        <div className="round-setting-card-option">
          <span className="round-setting-card-heading">50/50</span>
          <CustomCheckBox
            checked={values.roundSettings.halfPoint}
            onChange={(checked: boolean) =>
              setFieldValue("roundSettings.halfPoint", checked)
            }
            size={32}
          />
        </div>
        <img
          className="seperator-line"
          src="/images/roundManager/seperator-line.png"
        />
        <div className="round-setting-card-option">
          <span className="round-setting-card-heading">Double Points</span>
          <CustomCheckBox
            checked={values.roundSettings.doublePoint}
            onChange={(checked: boolean) =>
              setFieldValue("roundSettings.doublePoint", checked)
            }
            size={32}
          />
        </div>
        <img
          className="seperator-line"
          src="/images/roundManager/seperator-line.png"
        />
        <div className="round-setting-card-option">
          <span className="round-setting-card-heading">Steal Points</span>
          <CustomCheckBox
            checked={values.roundSettings.stealPoint}
            onChange={(checked: boolean) =>
              setFieldValue("roundSettings.stealPoint", checked)
            }
            size={32}
          />
        </div>
      </div>
    </div>
  );
};

export default RoundSettingsCard;
