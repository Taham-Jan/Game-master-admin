import React from "react";
import ConfirmDialogBox from "./ConfirmDialogBox";

type CustomConfirmDialogProps = {
  title: string;
  isOpen: boolean;
  onDialogClose: () => void;
  onDeleteConfirm: () => void;
};

const CustomDeleteDialog = (props: CustomConfirmDialogProps) => {
  const { title, isOpen, onDialogClose, onDeleteConfirm } = props;

  return (
    <ConfirmDialogBox
      isOpen={isOpen}
      type="danger"
      title={`Delete ${title}`}
      confirmButtonColor="red-600"
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      onCancel={onDialogClose}
      onConfirm={onDeleteConfirm}
    >
      <p>
        Are you sure you want to delete this {title}? All record related to this{" "}
        {title} will be deleted as well. This action cannot be undone.
      </p>
    </ConfirmDialogBox>
  );
};

export default CustomDeleteDialog;
