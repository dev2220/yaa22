import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: rgba(51, 51, 51, 0.9);
  z-index: 1;
  border-radius: 6px;
`;

const Root = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 20px;
  right: 20px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 0 6px 14px 1px rgba(51, 51, 51, 0.3);
  background-color: #ffffff;
  transform: translate(0, -50%);
`;

const DeleteText = styled.div`
  font-weight: 600;
  line-height: 1.54;
`;

const DeleteButtonsWrapper = styled.div`
  align-self: flex-end;
  display: flex;
`;

const DeleteButton = styled.div`
  padding: 2px 16px;
  cursor: pointer;
  color: ${({theme}) => theme.palette.blue};
  border: ${({isBorder, theme}) => isBorder && `1px solid ${theme.palette.blue}`};
`;

const DeleteConfirmation = ({handleCancelDelete, message, onConfirm}) => (
  <>
    <Overlay />
    <Root>
      <DeleteText>{message}</DeleteText>
      <DeleteButtonsWrapper>
        <DeleteButton onClick={handleCancelDelete}>No</DeleteButton>
        <DeleteButton onClick={onConfirm} isBorder>
          Yes
        </DeleteButton>
      </DeleteButtonsWrapper>
    </Root>
  </>
);

export default DeleteConfirmation;
