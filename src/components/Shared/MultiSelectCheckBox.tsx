import React from "react";
import { FieldProps } from "formik";
import CustomCheckBox from "./CustomCheckBox";

type MultiSelectCheckBoxProps = FieldProps & {
  options: string[];
  label?: string;
};

const MultiSelectCheckBox: React.FC<MultiSelectCheckBoxProps> = ({
  field,
  form,
  options,
  label,
}) => {
  const selectedValues: string[] = field.value || [];

  const handleChange = (option: string) => {
    const newSelection = selectedValues.includes(option)
      ? selectedValues.filter((item) => item !== option)
      : [...selectedValues, option];

    form.setFieldValue(field.name, newSelection);
  };

  return (
    <div className="select-box-container">
      <div className="select-box-children">
        {label && <h2>{label}</h2>}
        {options.map((option) => (
          <div key={option} className="checkbox-group">
            <CustomCheckBox
              checked={selectedValues.includes(option)}
              onChange={() => handleChange(option)}
              size={32}
            />
            <span className="check-box-text">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectCheckBox;
