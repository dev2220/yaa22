import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {Caption} from './Typography';
import Modal from './ConnectedModal';
import {PrimaryButton} from './Button';

const SubmitBtn = styled(PrimaryButton)`
  align-self: flex-end;
`;

const ErrorWrapper = styled.div`
  background-color: ${({theme}) => theme.palette.greyBackground};
  border-radius: 2px;
  border-top: 1px solid ${({theme}) => theme.palette.red};
  flex: 1;
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 22px;
`;

const DangerIcon = styled(FontAwesomeIcon).attrs({icon: faExclamationCircle})`
  color: ${({theme}) => theme.palette.red};
  font-size: 22px;
  margin-right: 16px;
`;

const CreateModal = ({
  children,
  onSubmit,
  disableCreateBtn,
  loading,
  header,
  error,
  submitText,
  className,
  fullScreen,
}) => (
  <Modal className={className} header={header} isOpen loading={loading} fullScreen={fullScreen}>
    {error && (
      <ErrorWrapper>
        <DangerIcon />
        <Caption>{error}</Caption>
      </ErrorWrapper>
    )}
    {children}
    <SubmitBtn disabled={disableCreateBtn} onClick={onSubmit}>
      {submitText}
    </SubmitBtn>
  </Modal>
);

export default CreateModal;
