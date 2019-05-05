import React, {useState} from 'react';
import Clickoutside from 'react-click-outside';
import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem} from 'rc-menu';
import Tooltip from 'shared/components/Tooltip';
import {THUMBNAILS_TOOLTIP_TEXT} from 'shared/constants/translations';
import {
  Preview,
  MenuIcon,
  ThumbnailIcon,
  Img,
  PlaceholderThumbnailIcon,
  ThumbnailMask,
} from './styled';
import LoadingIndicator from '../LoadingIndicator';

export const Thumbnail = ({
  disabled,
  onGalleryAddThumbnailImage,
  thumbnailUrl,
  onApplyThumbnailToAll,
  onRemoveThumbnail,
  onCustomizeThumbnail,
}) => {
  const [isVisible, setMenuVisibility] = useState(false);
  return (
    <Preview disabled={disabled} hovered={isVisible} onMouseLeave={() => setMenuVisibility(false)}>
      {!disabled && thumbnailUrl && <ThumbnailMask />}
      {!disabled && (
        <Clickoutside onClickOutside={() => setMenuVisibility(false)}>
          <Dropdown
            trigger={[]}
            placement="topLeft"
            visible={isVisible}
            overlayStyle={{zIndex: 2}}
            overlay={
              <Menu>
                <MenuItem onClick={onGalleryAddThumbnailImage}>Change Thumbnail</MenuItem>
                <MenuItem onClick={onCustomizeThumbnail}>Custom Thumbnail</MenuItem>
                <MenuItem onClick={onApplyThumbnailToAll}>Apply to all Videos</MenuItem>
                <MenuItem disabled={!thumbnailUrl} onClick={onRemoveThumbnail}>
                  Remove
                </MenuItem>
              </Menu>
            }
          >
            <MenuIcon onMouseEnter={() => setMenuVisibility(true)} />
          </Dropdown>
        </Clickoutside>
      )}
      {thumbnailUrl ? (
        <Img fallback={<LoadingIndicator />} src={thumbnailUrl} />
      ) : (
        <>
          {disabled ? (
            <Tooltip text={THUMBNAILS_TOOLTIP_TEXT} overlayStyle={{width: '205'}}>
              <PlaceholderThumbnailIcon />
            </Tooltip>
          ) : (
            <ThumbnailIcon />
          )}
          <span>{disabled ? 'Thumb' : 'Auto'}</span>
        </>
      )}
    </Preview>
  );
};
