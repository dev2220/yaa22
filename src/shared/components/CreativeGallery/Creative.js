import React from 'react';
import styled, {css} from 'styled-components';
import {withHandlers, pure, compose, withStateHandlers} from 'recompose';
import {
  faExpand,
  faVideo,
  faEllipsisH,
  faTimesCircle,
  faInfoCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Menu, {Item as MenuItem} from 'rc-menu';
import Dropdown from 'rc-dropdown';
import Popover from 'react-popover';
import BaseIcon from '../Icon';
import BaseTooltip from './Tooltip';
import Img from '../Img';
import Loading from '../LoadingIndicator';

const IconWithoutExtraProps = ({isPopoverOpen: _ignore, creativeType: _ignore2, ...rest}) => (
  <BaseIcon {...rest} />
);

const Icon = styled(IconWithoutExtraProps)`
  color: white;
  display: none;
  position: absolute;
  cursor: pointer;
  top: 12px;
  left: 12px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
  margin-right: 0;
  color: ${({theme, inverse}) => inverse && theme.palette.blue};
  && {
    height: 18px;
    width: 18px;
    transform: scale(1);
  }
`;

const MenuIcon = styled(Icon).attrs({icon: faEllipsisH})`
  top: auto;
  bottom: 12px;
  color: ${({theme, inverse}) => inverse && theme.palette.grey};
  &:hover {
    color: ${({theme}) => theme.palette.greyWhite};
  }
`;

const Remove = styled(Icon).attrs({icon: faTimesCircle})`
  left: auto;
  right: 12px;
  top: 12px;
  color: ${({theme, inverse}) => inverse && theme.palette.grey};
`;

const iconHoverCss = css`
  &:hover {
    color: ${({theme}) => theme.palette.grey};
  }
`;

const Info = styled(Icon).attrs({icon: faInfoCircle})`
  left: auto;
  right: ${({creativeType}) => (creativeType !== 'text' ? 12 : 8)}px;
  display: none;
  color: ${({theme, creativeType}) =>
    creativeType !== 'text' ? theme.palette.selectedText : theme.palette.greyWhite};
  display: ${({isPopoverOpen}) => isPopoverOpen && 'flex'};
  ${iconHoverCss};
  top: 12px;
`;

const Trash = styled(Icon).attrs({icon: faTrash})`
  left: auto;
  right: 8px;
  display: none;
  color: ${({theme}) => theme.palette.greyWhite};
  display: ${({isPopoverOpen}) => isPopoverOpen && 'flex'};
  ${iconHoverCss};
  top: 120px;
`;

const previewIcons = {Image: faExpand, Video: faVideo};

const textCss = css`
  width: 305px;
  height: 150px;
  overflow: auto;
  padding: 12px;
  border-radius: 2px;
  cursor: pointer;
  min-width: 0;
  max-width: none;
  box-shadow: 0 1px 3px 2px rgba(51, 51, 51, 0.1);
  background-color: #ffffff;
  ${Remove} {
    width: 14px !important;
    height: 14px !important;
    color: ${({theme}) => theme.palette.grey};
  }
  &:hover {
    box-shadow: 0 6px 14px 1px rgba(51, 51, 51, 0.2);
    ${Remove} {
      display: flex;
    }
  }
`;

const CreativeImg = styled(Img)`
  max-width: 100%;
  height: 100%;
`;

const CreativeWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  height: 166px;
  width: ${({width, height}) => (166 * width) / height}px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  border: 3px solid ${({theme, isSelected}) => (isSelected ? theme.palette.blue : 'transparent')};
  &:hover {
    cursor: pointer;
    ${Icon} {
      display: flex;
    }
    ${CreativeImg} {
      background-color: black;
      img {
        opacity: 0.4;
      }
    }
  }
  ${({creativeType}) => creativeType === 'text' && textCss};
`;

const Header = styled.div`
  font-weight: 600;
`;

const Content = styled.div`
  margin-top: 8px;
`;

const RootLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreativeText = styled.div`
  max-width: 257px;
`;

const popoverStyle = {zIndex: 3, boxShadow: '0 5px 7px -2px rgba(54, 56, 58, 0.3)'};

const Creative = ({
  thumbnailUrl,
  type = 'Image',
  stopPropagation,
  onDelete,
  fileSizeInKB,
  name,
  createdTime,
  onTag,
  onCopyName,
  onRename,
  isSelected,
  onPreviewClick,
  onRemove,
  onClick,
  className,
  stats,
  tags,
  isPopoverOpen,
  showPopup,
  hidePopup,
  creativeType = 'img',
  headline,
  enableTooltip,
  text,
  width,
  height,
  style,
}) => (
  <Popover
    isOpen={isPopoverOpen}
    preferPlace="right"
    place="row"
    style={popoverStyle}
    enterExitTransitionDurationMs={0}
    offset={creativeType !== 'text' ? -10 : 0}
    tipSize={0.01}
    refreshIntervalMs={0}
    body={
      <BaseTooltip
        {...{
          fileSizeInKB,
          name,
          createdTime,
          tags,
          stats,
        }}
      />
    }
  >
    <CreativeWrapper
      className={className}
      onClick={onClick}
      isSelected={isSelected}
      creativeType={creativeType}
      width={width}
      height={height}
      style={style}
      isText={creativeType === 'text'}
    >
      {creativeType !== 'text' &&
        onPreviewClick && (
          <Icon onClick={stopPropagation(onPreviewClick)} icon={previewIcons[type]} />
        )}
      {enableTooltip && (
        <>
          <Info
            onMouseEnter={stopPropagation(showPopup)}
            onMouseLeave={stopPropagation(hidePopup)}
            isPopoverOpen={isPopoverOpen}
            creativeType={creativeType}
          />
          {onDelete && creativeType === 'text' && <Trash isPopoverOpen={isPopoverOpen} onClick={stopPropagation(onDelete)} />}
        </>
      )}
      {(onDelete || onRename || onTag || onCopyName) &&
        creativeType !== 'text' && (
          <Dropdown
            onClick={stopPropagation()}
            trigger={['hover']}
            placement="topLeft"
            overlay={
              <Menu>
                {onRename && <MenuItem onClick={stopPropagation(onRename, true)}>Rename</MenuItem>}
                {onTag && <MenuItem onClick={stopPropagation(onTag, true)}>Tag</MenuItem>}
                {onCopyName && <MenuItem onClick={stopPropagation(onCopyName, true)}>Copy name</MenuItem>}
                {onDelete && <MenuItem onClick={stopPropagation(onDelete, true)}>Remove</MenuItem>}
              </Menu>
            }
          >
            <MenuIcon inverse={false} />
          </Dropdown>
        )}
      {onRemove && <Remove inverse={creativeType === 'text'} onClick={stopPropagation(onRemove)} />}
      {creativeType === 'text' ? (
        <CreativeText>
          <Header>{headline}</Header>
          <Content>{text}</Content>
        </CreativeText>
      ) : (
        <CreativeImg
          fallback={
            <RootLoader>
              <Loading />
            </RootLoader>
          }
          src={thumbnailUrl}
        />
      )}
    </CreativeWrapper>
  </Popover>
);

export default compose(
  withStateHandlers(
    {isPopoverOpen: false},
    {
      showPopup: ({isPopoverOpen}, {enableTooltip}) => () =>
        enableTooltip && !isPopoverOpen ? {isPopoverOpen: true} : undefined,
      hidePopup: () => () => ({isPopoverOpen: false}),
    }
  ),
  withHandlers({
    stopPropagation: () => (func, isMenuItem) => e => {
      if (isMenuItem) {
        e.domEvent.stopPropagation();
      } else {
        e.stopPropagation();
      }
      if (func) {
        func(e);
      }
    },
  }),
  pure
)(Creative);
