import React, { useState } from "react";
import "./DialogBox.css";
import { HiOutlineDuplicate } from "react-icons/hi";
import { showNotificationMessage } from "../../utils/toast";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: string;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      showNotificationMessage(
        "Copied",
        "Successfully Copied media url",
        "success"
      );
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2 className="dialog-title">{title}</h2>
        <div className="dialog-content">
          <p>{children}</p>
          <HiOutlineDuplicate className="copy-button" onClick={handleCopy} />
        </div>
      </div>
    </div>
  );
};

export default Dialog;
