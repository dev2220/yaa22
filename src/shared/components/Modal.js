import React from 'react';
import styled, {css} from 'styled-components';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import ReactModal from 'react-modal';
import Icon from './Icon';
import LoadingIndicator from './LoadingIndicator';

const ReactModalAdapter = ({className, close, ...props}) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return (
    <ReactModal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      onRequestClose={close}
      shouldCloseOnOverlayClick
      {...props}
    />
  );
};

const modalCenterPosition = css`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const modalBottomLeftPosition = css`
  bottom: 35px;
  left: 35px;
`;

const positions = {
  center: modalCenterPosition,
  bottomLeft: modalBottomLeftPosition,
};


const StyledModal = styled(ReactModalAdapter)`
  &__body {
    overflow: hidden;
  }
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    ${({noOverlay}) => noOverlay ? 'pointer-events: none;' : 'background-color: rgba(0, 0, 0, 0.7);'};
    z-index: 3;
  }

  &__content {
    position: absolute;
    background: #fff;
    overflow: auto;
    border-radius: 10px;
    outline: none;
    margin: 0 auto;
    width: ${({fullScreen}) => (fullScreen ? '98vw' : '640px')};
    box-shadow: 0 6px 14px 1px rgba(51, 51, 51, 0.3);
    ${({position = 'center'}) => positions[position]}
  }
`;

const CloseBtn = styled(Icon)`
  position: absolute;
  border-radius: 50%;
  width: 16px !important;
  height: 16px;
  padding: 2px;
  margin-right: 7px;
  right: 16px;
  top: 16px;
  transform: none;
  color: white;
  border: 1px solid white;
  background-color: ${({theme}) => theme.palette.greyBlack};
  opacity: ${({hide}) => hide && 0};
  cursor: pointer;
  &:hover {
    background-color: ${({theme}) => theme.palette.blue};
  }
`;

export const Header = styled.div`
  position: relative;
  background-color: ${({theme}) => theme.palette.greyBackground};
  border-bottom: 1px solid ${({theme}) => theme.palette.controlBorder};
  font-size: ${({theme}) => theme.typography.headers.sizes.small}px;
  font-weight: ${({theme}) => theme.typography.headers.fontWeights.light};
  height: 48px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 80px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Modal = ({children, header, className, isOpen, close, loading, fullScreen, noOverlay, position}) => (
  <StyledModal className={className} isOpen={isOpen} close={close} fullScreen={fullScreen} noOverlay={noOverlay} position={position}>
    <Wrapper>
      {loading && <LoadingIndicator />}
      <Header>
        {header}
        <CloseBtn onClick={close} icon={faTimes} />
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  </StyledModal>
);

export default Modal;
