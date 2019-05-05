import React from 'react';
import styled from 'styled-components';
import {PrimaryButton, TertiaryButton} from 'shared/components';
import BaseModal, {Content} from '../Modal';

const Modal = styled(BaseModal)`
  ${Content} {
    padding: 32px 64px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
`;

const ConfirmationDialog = ({header, children, confirmText, onConfirm, onCancel, disableConfirm = false, ...rest}) => (
  <Modal header={header} isOpen close={onCancel} {...rest}>
    {children}
    <Actions>
      <TertiaryButton onClick={onCancel}>Cancel</TertiaryButton>
      <PrimaryButton disabled={disableConfirm} onClick={onConfirm}>{confirmText}</PrimaryButton>
    </Actions>
  </Modal>
);

export default ConfirmationDialog;
