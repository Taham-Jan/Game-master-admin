import React from "react";
import checkedImage from "/images/checkbox/check-box-checked.png";
import uncheckedImage from "/images/checkbox/check-box-unchecked.png";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: number;
};

const CustomCheckBox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  size = 24,
}) => {
  return (
    <div
      style={{ cursor: "pointer", width: size, height: size }}
      onClick={() => onChange(!checked)}
    >
      <img
        src={checked ? checkedImage : uncheckedImage}
        alt={checked ? "Checked" : "Unchecked"}
        width={size}
        height={size}
      />
    </div>
  );
};

export default CustomCheckBox;
