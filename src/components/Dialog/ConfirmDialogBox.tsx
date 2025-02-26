import React, { MouseEvent, ReactNode } from "react";
import "./DialogBox.css";
import {
  HiCheckCircle,
  HiOutlineExclamation,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import type ReactModal from "react-modal";
import { ImCross } from "react-icons/im";

type StatusType = "info" | "success" | "warning" | "danger";

export interface DialogProps extends ReactModal.Props {
  closable?: boolean;
  contentClassName?: string;
  height?: string | number;
  onClose?: (e: MouseEvent<HTMLSpanElement>) => void;
  width?: string | number;
}

interface ConfirmDialogProps extends DialogProps {
  cancelText?: ReactNode | string;
  confirmText?: ReactNode | string;
  confirmButtonColor?: string;
  type?: StatusType;
  title?: ReactNode | string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const StatusIcon = ({ status }: { status?: StatusType }) => {
  if (!status) return null;

  return (
    <div className={`dialog-status-icon dialog-${status}`}>
      <span>
        {status === "info" && <HiOutlineInformationCircle />}
        {status === "success" && <HiCheckCircle />}
        {status === "warning" && <HiOutlineExclamationCircle />}
        {status === "danger" && <HiOutlineExclamation />}
      </span>
    </div>
  );
};

const ConfirmDialogBox: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  cancelText = "Cancel",
  confirmButtonColor = "#007bff",
  confirmText = "Confirm",
  onCancel,
  onConfirm,
  type,
}) => {
  if (!isOpen) return null;

  const handleCancel = () => {
    onCancel?.();
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <ImCross className="top-loader-cancel-button" onClick={onClose} />

        <div className="dialog-title">
          <StatusIcon status={type} />
          <h2>{title}</h2>
        </div>
        <div className="dialog-content">{children}</div>
        <div className="dialog-actions">
          <button className="dialog-cancel-button" onClick={handleCancel}>
            {cancelText}
          </button>
          <button
            className="dialog-confirm-button"
            style={{ backgroundColor: confirmButtonColor }}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialogBox;
