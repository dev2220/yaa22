import React, {useCallback} from 'react';
import ConfirmationDialog from './ConfirmationDialog';

const DeleteModal = ({onClose, onConfirm, asset}) => {
  const handleDelete = useCallback(
    () => {
      onConfirm(asset);
      onClose();
    },
    [asset, onClose, onConfirm]
  );
  return (
    <ConfirmationDialog
      header="Delete Creative"
      confirmText="Delete Creative"
      onConfirm={handleDelete}
      onCancel={onClose}
    >
      <p>
        This {asset?.name} will be permanently deleted. Are you sure you want to delete creative?
      </p>
    </ConfirmationDialog>
  );
};

export default DeleteModal;
