import React from 'react';
import styled from 'styled-components';
import {lifecycle} from 'recompose';
import {CREATIVE_TYPES} from 'shared/constants/creatives';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import YouTube from 'react-youtube';
import ClickOutSide from 'react-click-outside';
import Icon from '../Icon';
import BaseImg from '../Img';
import Loading from '../LoadingIndicator';

const ClickOutSideWithOutExtraProps = ({shouldDisplay: _ignore, ...rest}) => (
  <ClickOutSide {...rest} />
);

const Root = styled(ClickOutSideWithOutExtraProps)`
  height: 320px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  display: ${({shouldDisplay}) => (!shouldDisplay ? 'none' : 'flex')};
  flex-direction: column;
  z-index: 99;
  border-radius: 6px;
  box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.2);
  max-width: 800px;
`;

const RelativeRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CloseIcon = styled(Icon).attrs({icon: faTimesCircle})`
  position: absolute;
  color: ${({theme}) => theme.palette.grey};
  transform: scale(1);
  margin-right: 0;
  right: 8px;
  top: 8px;
  cursor: pointer;
  && {
    width: 14px;
    height: 14px;
  }
`;

const Wrapper = styled.div`
  padding: 32px 28px;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  div {
    iframe {
      max-height: 44vh;
      max-width: 100%;
    }
  }
`;

const Name = styled.div``;

const NativeVideo = styled.video.attrs({controls: true, autoPlay: true})`
  height: 270px;
  width: auto;
`;

const Img = styled(BaseImg)`
  height: 270px;
  width: auto;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  min-width: 100px;
  background: white;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.3);
`;
// might cause error in console, please see: https://github.com/troybetz/react-youtube/issues/128
const Video = ({width, height, url}) => {
  const youtubePrefix = 'https://www.youtube.com/watch?v=';
  const youtubeId = url.includes(youtubePrefix) ? url.replace(youtubePrefix, '') : false;
  return youtubeId ? (
    <YouTube videoId={youtubeId} />
  ) : (
    <NativeVideo width={width} height={height} src={url} />
  );
};

const View = ({creative, onClose}) => (
  <Overlay>
    <Root shouldDisplay={creative} onClickOutside={onClose}>
      <RelativeRoot>
        <CloseIcon onClick={onClose} />
        <Wrapper>
          <Name>{creative?.name}</Name>
          {creative?.type === CREATIVE_TYPES.VIDEO ? (
            <Video {...creative} />
          ) : (
            <Img
              fallback={
                <LoadingWrapper>
                  <Loading />
                </LoadingWrapper>
              }
              width={creative?.width}
              height={creative?.height}
              src={creative?.url}
            />
          )}
        </Wrapper>
      </RelativeRoot>
    </Root>
  </Overlay>
);

export default lifecycle({
  componentDidMount() {
    const {onKeyDown} = this.props;
    if (onKeyDown) {
      window.addEventListener('keydown', onKeyDown);
    }
  },
  componentWillUnmount() {
    const {onKeyDown} = this.props;
    if (onKeyDown) {
      window.removeEventListener('keydown', onKeyDown);
    }
  },
})(View);
