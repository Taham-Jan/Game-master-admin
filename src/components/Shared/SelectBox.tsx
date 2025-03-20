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

export const SelectBox: React.FC<SelectBoxProps> = ({
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

export interface RoundSettingSelectBoxProps<T = string> {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
  disabled?: boolean;
  className?: string;
  includeAllOption?: boolean;
  seperatorLine?: boolean;
  parse?: (value: string) => T;
}

export const RoundSettingSelectBox = <T extends string | number = string>({
  label,
  value,
  options,
  onChange,
  disabled = false,
  className = "",
  includeAllOption = false,
  seperatorLine = false,
  parse,
}: RoundSettingSelectBoxProps<T>) => {
  return (
    <>
      <div className="round-setting-card-option">
        <span className="round-setting-card-heading">{label}</span>
        <div className={`round-setting-select-box ${className}`}>
          <select
            value={value.toString()}
            disabled={disabled}
            onChange={(e) => {
              const newValue = parse
                ? parse(e.target.value)
                : (e.target.value as unknown as T);
              onChange(newValue);
            }}
          >
            {includeAllOption && <option value="">ALL</option>}
            {options.map((option) => (
              <option key={option.toString()} value={option.toString()}>
                {option.toString()}
              </option>
            ))}
          </select>
        </div>
      </div>
      {seperatorLine && (
        <img
          className="seperator-line"
          src="/images/roundManager/seperator-line.png"
          alt="separator"
        />
      )}
    </>
  );
};
