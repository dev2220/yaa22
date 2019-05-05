import React from 'react';
import styled, {css} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faEllipsisH,
  faImage,
  faPlus,
  faTimes,
  faInfo,
  faInfoCircle,
  faVideo,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';
import Icon from 'shared/components/Icon';
import BaseTextarea from 'shared/components/Textarea';
import BaseImg from 'shared/components/Img';

export const Plus = styled(FontAwesomeIcon).attrs({icon: faPlus})`
  &&& {
    width: 22px;
    height: 22px;
  }
  cursor: pointer;
  border-radius: 50%;
  padding: 5px;
  background-color: #f1f1f1;
`;

export const Left = styled(Plus).attrs({icon: faAngleLeft})``;

export const Right = styled(Plus).attrs({icon: faAngleRight})``;

const PlusWithoutExtraProps = ({isTooltip: _ignore, ...rest}) => <Plus {...rest} />;

const PreviewIcon = styled(FontAwesomeIcon)`
  position: absolute;
  color: ${({theme}) => theme.palette.greyWhite};
  display: ${({isTooltip}) => (isTooltip ? 'flex' : 'none')};
  left: 12px;
  top: 12px;
  cursor: pointer;
  &&& {
    width: 21px;
    height: 18px;
    display: ${({isVisible}) => isVisible && 'flex'};
  }
`;

export const VideoIcon = styled(PreviewIcon).attrs({icon: faVideo})``;

export const ImageIcon = styled(PreviewIcon).attrs({icon: faExpand})``;

export const InfoIcon = styled(PlusWithoutExtraProps).attrs({icon: faInfo})`
  position: absolute;
  display: ${({isTooltip}) => (isTooltip ? 'flex' : 'none')};
  right: 12px;
  bottom: 12px;
  &:hover {
    background: ${({theme}) => theme.palette.greyWhite};
  }
  &&& {
    display: ${({isVisible}) => isVisible && 'flex'};
  }
`;

export const MenuIcon = styled(Plus).attrs({icon: faEllipsisH})`
  &:hover {
    color: ${({theme}) => theme.palette.blue};
  }
  &&& {
    display: ${({isVisible}) => isVisible && 'flex'};
  }
`;

export const Textarea = styled(BaseTextarea)`
  min-height: 54px;
  textarea::placeholder {
    font-weight: 600;
  }
  &:last-child {
    margin-top: 17px;
    flex: 1;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 282px;
  height: 475px;
  border-radius: 6px;
  box-shadow: 0 2px 4px 1px rgba(51, 51, 51, 0.2);
  overflow: hidden;
  cursor: ${({isPlaceholder}) => isPlaceholder && 'pointer'};
  margin-top: ${({isPlaceholder}) => isPlaceholder && '34px'};
  position: relative;

  &:hover {
    box-shadow: 0 6px 14px 1px rgba(51, 51, 51, 0.3);
  }
`;

export const Img = styled(BaseImg)`
  width: 100%;
  height: 100%;
`;

const applyHoveredImgCss = css`
  ${Img} :nth-child(1) {
    background-color: black;
    img {
      opacity: 0.4;
    }
  }
`;

export const Mask = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 190px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: ${({theme, isPlaceholder}) =>
    isPlaceholder ? theme.palette.greyDarker : theme.palette.brightWhite};
  flex-shrink: 0;
  div:nth-child(2) > ${MenuIcon} {
    position: absolute;
    display: ${({isMenuVisible}) => (isMenuVisible ? 'flex' : 'none')};
    right: 12px;
    bottom: 12px;
  }
  &:hover {
    div:nth-child(2) > ${MenuIcon} {
      display: flex;
    }
    ${applyHoveredImgCss};
  }
  ${({isMenuVisible}) => isMenuVisible && applyHoveredImgCss};
`;

export const ThumbnailIcon = styled(FontAwesomeIcon).attrs({icon: faImage, size: 'lg'})``;
export const PlaceholderThumbnailIcon = styled(FontAwesomeIcon).attrs({
  icon: faInfoCircle,
  size: 'lg',
})`
  :hover {
    cursor: pointer;
  }
`;

const previewHoverCss = css`
  background-color: ${({theme}) => theme.palette.grey};

  > ${ThumbnailIcon}, > span {
    display: none;
  }

  > div > ${MenuIcon} {
    display: block;
  }
`;

export const ThumbnailMask = styled.div`
  width: 64px;
  height: 64px;
  background-color: black;
  z-index: 1;
  opacity: 0.3;
  border-radius: 2px;
  display: none;
`;

export const Preview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 12px;
  bottom: -12px;
  width: 64px;
  height: 64px;
  border-radius: 2px;
  font-size: 13px;
  background-color: #fff;
  color: #858585;
  box-shadow: 0 2px 4px 1px rgba(51, 51, 51, 0.2);
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
  border: 1px solid ${({disabled}) => (disabled ? 'transparent' : '#fff')};

  > div > ${MenuIcon} {
    position: absolute;
    z-index: 2;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
    display: none;
  }

  > ${Img} {
    position: absolute;
    top: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    left: 1px;
  }

  ${({hovered}) => hovered && previewHoverCss};

  &:hover {
    ${({disabled}) => !disabled && previewHoverCss};
    ${ThumbnailMask} {
      display: block;
    }
  }
`;

export const AddVideoLabel = styled.div`
  color: #fff;
  cursor: pointer;
  font-size: 16px;
`;

export const Texts = styled.div`
  display: ${({isInfoVisible}) => (isInfoVisible ? 'none' : 'flex')};
  flex-direction: column;
  flex: 1;
  padding-top: 24px;
  padding: 12px;
  overflow: auto;
`;

export const TextActions = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px #d6d6d6;
  flex-shrink: 0;
`;

export const TextTabs = styled.div`
  display: flex;
  max-width: 162px;
  transform: translateX(${({itemsMovedRight}) => `-${itemsMovedRight * 54}px`});
  transition: transform 0.3s;
`;

export const Tab = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme}) => theme.palette.grey};
`;

export const DeleteTextBtn = styled(Icon).attrs({icon: faTimes})`
  position: absolute;
  left: 0px;
  border-radius: 50%;
  width: 12px !important;
  height: 12px;
  padding: 2px;
  margin-right: 4px;
  transform: none;
  color: white;
  border: 1px solid white;
  visibility: hidden;
  background-color: ${({theme}) => theme.palette.greyBlack};
  opacity: ${({hide}) => hide && 0};
  cursor: pointer;
  &:hover {
    background-color: ${({theme}) => theme.palette.blue};
  }
`;

export const HiddenOverflow = styled.div`
  overflow: hidden;
`;
const selectedTab = css`
  border-bottom: 2px solid ${({theme}) => theme.palette.blue};
  ${Tab} {
    color: ${({theme}) => theme.palette.black};
  }
`;

export const TabWrapper = styled.div`
  position: relative;
  padding: 11px 23px;
  display: flex;
  justify-content: center;
  width: 54px;
  align-items: center;
  cursor: pointer;
  ${({isSelected}) => isSelected && selectedTab};
  &:hover {
    ${DeleteTextBtn} {
      visibility: visible;
    }
  }
`;

export const TabActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  position: absolute;
  right: 10px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1;
  margin-top: 13px;
`;
