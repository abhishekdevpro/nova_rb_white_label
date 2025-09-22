import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { type } from "os";

const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitText = "Save",
  cancelText = "Cancel",
  isLoading = false,
  canSubmit = true,
  type = "form",
  
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          {children}
        </div>
        
       {type === "form" && <div className="flex space-x-3">
          <Button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            variant="secondary"
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !canSubmit}
            className="flex-1"
          >
            {isLoading ? "Saving..." : submitText}
          </Button>
        </div>}
      </form>
    </Modal>
  );
};

export default FormModal;