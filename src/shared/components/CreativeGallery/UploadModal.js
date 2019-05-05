import React from 'react';
import styled from 'styled-components';
import {faTimes, faCheck, faVideo} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import BaseCreative from './Creative';
import BaseModal, {Content, Header} from '../Modal';
import BaseLoading from '../LoadingIndicator';
import BaseIcon from '../Icon';
import Img from '../Img';

const Modal = styled(BaseModal)`
  > div > div {
    width: 345px;
    pointer-events: all;
  }
  
  ${Content} {
    padding: 0;
  }
  ${Header} {
    font-size: 13px;
    font-weight: 600;
    text-align: start;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${BaseIcon} {
      color: white;
      position: relative;
      background-color: ${({theme}) => theme.palette.grey};
      top: 0;
      right: 0;
      margin: 0 !important;
    }
  }
`;

const Loading = styled(BaseLoading)`
  position: relative;
  height: 22px;
  width: 22px;
  div {
    margin-top: auto;
    fill: ${({theme}) => theme.palette.blue} !important;
  }
`;

const Icon = styled(BaseIcon)`
  && {
    width: 12px;
    height: 12px;
    transform: scale(1);
  }
`;

const Success = styled(Icon).attrs({icon: faCheck})`
  color: ${({theme}) => theme.palette.green};
  margin: auto 5px;
`;

const Failed = styled(Icon).attrs({icon: faTimes})`
  color: ${({theme}) => theme.palette.red};
  margin: auto 5px;
`;

const statusComponents = {failed: Failed, success: Success, loading: Loading};

const Creative = styled(BaseCreative)`
  width: 70px;
  height: 70px;
  max-width: none;
  margin-right: 10px;
  &&:hover {
    img {
      filter: brightness(100%);
    }
  }
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  max-height: ${window.innerHeight - 50}px;
  overflow-x: auto;

  & > * {
    padding: 4px 16px;
    border-bottom: 1px solid ${({theme}) => theme.palette.greyWhite};
  }
`;

const UploadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 15px;
`;

const Preview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 48px;
  height: 48px;
`;

const UploadName = styled.div`
  font-weight: 600;
  font-size: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Size = styled.div`
  margin-left: auto;
  margin-right: 5px;
`;
const VideoIcon = styled(FontAwesomeIcon).attrs({icon: faVideo, size: 'lg'})``;

const UploadModal = ({header, uploads, isOpen, close}) => (
  <Modal header={header} isOpen={isOpen} close={close} noOverlay position="bottomLeft">
    <Root>
      {uploads.map(({status, name, size, src, ...upload}, idx) => {
        const Status = statusComponents[status] || Loading;
        return (
          <UploadWrapper key={idx}>
              <Preview>
                {src ? <Img src={src} /> : <VideoIcon />}
              </Preview>
              <UploadName>{name}</UploadName>
              <Size>{((size || 0)/ 1024).toFixed(2)}KB</Size>
            <Status />
          </UploadWrapper>
        );
      })}
    </Root>
  </Modal>
);

export default UploadModal;
