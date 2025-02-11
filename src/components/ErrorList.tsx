import React from "react";
import { useFormikContext, FormikErrors } from "formik";
import "../styles/ErrorList.css";

interface ErrorListProps {
  className?: string;
}

const flattenErrors = (errors: any, prefix = ""): string[] => {
  return Object.entries(errors).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      return [value];
    } else if (typeof value === "object" && value !== null) {
      return flattenErrors(value, path);
    }

    return [];
  });
};

const ErrorList: React.FC<ErrorListProps> = ({ className = "" }) => {
  const { errors } = useFormikContext<Record<string, any>>();

  const errorMessages = flattenErrors(errors);

  if (errorMessages.length === 0) return null;

  return (
    <div className={`error-container ${className}`}>
      <ul className="error-list">
        {errorMessages.map((error, index) => (
          <li key={index} className="error-item">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorList;
