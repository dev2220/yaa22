import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import BaseInput from '../Input';
import ConfirmationDialog from './ConfirmationDialog';

const Input = styled(BaseInput)`
  margin-bottom: 37px;
`;

const RenameModal = ({asset, onClose, onConfirm}) => {
  const [renameValue, setRenameValue] = useState(asset?.name || '');
  const onRenameChange = useCallback(({target: {value}}) => setRenameValue(value), []);
  const handleRename = useCallback(
    () => {
      onConfirm(asset, renameValue);
      onClose();
    },
    [asset, onClose, onConfirm, renameValue]
  );

  return (
    <ConfirmationDialog
      header="Rename Creative"
      confirmText="Save"
      onConfirm={handleRename}
      onCancel={onClose}
      disableConfirm={!renameValue}
    >
      <Input label="New Name" full value={renameValue} onChange={onRenameChange} />
    </ConfirmationDialog>
  );
};

export default RenameModal;
