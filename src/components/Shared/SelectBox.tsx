import React from "react";

interface SelectBoxProps {
  label: string;
  value: string | null;
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
  includeAllOption?: boolean;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
  className = "",
  includeAllOption = false,
}) => {
  return (
    <div className={`select-box-container ${className}`}>
      <div className="select-box-children">
        <h2 style={{ opacity: disabled ? "0.5" : "1" }}>{label}</h2>
        <div className="select-box">
          <select value={value ?? ""} disabled={disabled} onChange={onChange}>
            {includeAllOption && <option value="">ALL</option>}
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
