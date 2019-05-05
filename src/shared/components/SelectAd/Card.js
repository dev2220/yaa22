import React, {useCallback, useEffect, useState} from 'react';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import Dropdown from 'rc-dropdown';
import Clickoutside from 'react-click-outside';
import Menu, {Item as MenuItem} from 'rc-menu';
import Icon from '../Icon';
import LoadingIndicator from '../LoadingIndicator';
import DeleteConfirmation from './DeleteConfirmation';
import CardActions from './CardActions';
import TextActionsButton from './TextActions';
import {
  AddVideoLabel,
  DeleteTextBtn,
  HiddenOverflow,
  Img,
  Left,
  Mask,
  Plus,
  Right,
  Root,
  Tab,
  TabActions,
  TabWrapper,
  TextActions,
  Textarea,
  Texts,
  TextTabs,
  TextWrapper,
  Wrapper,
  MenuIcon,
  InfoIcon,
  VideoIcon,
  ImageIcon,
} from './styled';
import {Thumbnail} from './Thumbnail';
import Tooltip from './Tooltip';
import PlaceholderTexts from './PlaceholderTexts';
import {CREATIVE_TYPES} from '../../constants/creatives';

const CardImg = styled(Img)`
  align-items: center;
  display: flex;
  justify-content: center;
  img {
    width: auto;
    max-width: 100%;
  }
`;

const CustomPlus = styled(Plus)`
  margin-right: 5px;
`;

const Card = ({
  isPlaceholder = false,
  texts,
  onDelete,
  type = 'Image',
  onDuplicate,
  onAddTexts,
  onTextChanges,
  onDeleteText,
  onApplyTextToAll,
  onGalleryAddThumbnailImage,
  onApplyThumbnailToAll,
  onRemoveThumbnail,
  onCustomizeThumbnail,
  onPreview,
  previewCreative,
  creative,
  onChangeCreative,
  ...rest
}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedText, setSelectedText] = useState(null);
  const sumTexts = texts?.length;
  const [itemsMovedRight, setItemsMovedRight] = useState(0);
  useEffect(
    () => {
      if (sumTexts) {
        setSelectedText(sumTexts - 1);
      }
      if (sumTexts >= 3) {
        setItemsMovedRight(sumTexts - 3);
      }
    },
    [sumTexts]
  );
  const moveRight = useCallback(() => setItemsMovedRight(itemsMovedRight + 1), [itemsMovedRight]);
  const moveLeft = useCallback(() => setItemsMovedRight(itemsMovedRight - 1), [itemsMovedRight]);
  const [isCurrentDelete, setIsCurrentDelete] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const handleCancelDelete = useCallback(() => setIsCurrentDelete(false), []);
  const handleOpenConfirmationDelete = useCallback(() => setIsCurrentDelete(true), []);
  const togglePreview = useCallback(() => (isPlaceholder ? null : setIsPreview(!isPreview)), [
    isPlaceholder,
    isPreview,
  ]);

  const onMouseEnterInfo = useCallback(() => setInfoVisible(true), [setInfoVisible]);
  const onMouseLeaveInfo = useCallback(() => setInfoVisible(false), [setInfoVisible]);
  const [isTooltip, setIsTooltip] = useState(false);
  const [isInfoVisible, setInfoVisible] = useState(false);
  return (
    <Wrapper>
      {!isPlaceholder && (
        <CardActions
          handleOpenConfirmationDelete={handleOpenConfirmationDelete}
          onDuplicate={onDuplicate}
          sumTexts={texts?.length}
          isPreview={isPreview}
          setIsPreview={setIsPreview}
          onChangeCreative={onChangeCreative}
          togglePreview={togglePreview}
          isPlaceholder={isPlaceholder}
          onPreview={onPreview}
          type={type}
        />
      )}
      <Root isPlaceholder={isPlaceholder} {...rest}>
        {isCurrentDelete && (
          <DeleteConfirmation
            message={`Are you sure you want to delete ${texts?.length} ads ?`}
            handleCancelDelete={handleCancelDelete}
            onConfirm={onDelete}
          />
        )}
        <Mask
          onMouseEnter={() => setIsTooltip(true)}
          onMouseLeave={() => setIsTooltip(false)}
          isMenuVisible={isMenuVisible}
          isPlaceholder={isPlaceholder}
        >
          {isPlaceholder ? (
            <AddVideoLabel>
              <Icon icon={faPlusCircle} />
              <span>Add {type}s</span>
            </AddVideoLabel>
          ) : (
            <>
              <CardImg fallback={<LoadingIndicator />} src={creative.thumbnailUrl} />
              <>
                <InfoIcon
                  isTooltip={isTooltip}
                  onMouseEnter={onMouseEnterInfo}
                  onMouseLeave={onMouseLeaveInfo}
                />
                {type === CREATIVE_TYPES.VIDEO ? (
                  <VideoIcon onClick={onPreview} isTooltip={isTooltip} />
                ) : (
                  <ImageIcon onClick={onPreview} isTooltip={isTooltip} />
                )}
              </>
            </>
          )}
          {type === CREATIVE_TYPES.VIDEO && (
            <Thumbnail
              disabled={isPlaceholder}
              onGalleryAddThumbnailImage={onGalleryAddThumbnailImage}
              onApplyThumbnailToAll={onApplyThumbnailToAll}
              onRemoveThumbnail={onRemoveThumbnail}
              onCustomizeThumbnail={onCustomizeThumbnail}
              thumbnailUrl={previewCreative?.url}
            />
          )}
        </Mask>
        {isPlaceholder && <PlaceholderTexts />}
        {!isPlaceholder && (
          <>
            <Tooltip isInfoVisible={isInfoVisible} {...creative} />
            <Texts isInfoVisible={isInfoVisible}>
              <TextActions>
                {itemsMovedRight > 0 && <Left onClick={moveLeft} />}

                <HiddenOverflow>
                  <TextTabs itemsMovedRight={itemsMovedRight}>
                    {texts?.length === 0 && (
                      <TabWrapper isSelected>
                        <Tab>1</Tab>
                      </TabWrapper>
                    )}
                    {texts?.map((text, idx) => (
                      <TabWrapper
                        key={idx}
                        onClick={() => setSelectedText(idx)}
                        isSelected={selectedText === idx}
                      >
                        {texts?.length > 1 && <DeleteTextBtn onClick={() => onDeleteText(idx)} />}
                        <Tab>{idx + 1}</Tab>
                      </TabWrapper>
                    ))}
                  </TextTabs>
                </HiddenOverflow>
                {texts?.length - itemsMovedRight > 3 && <Right onClick={moveRight} />}
                <TabActions>
                  <CustomPlus onClick={() => onTextChanges({text: '', headline: ''}, null)} />
                  <TextActionsButton
                    onAddTextFromGallery={onAddTexts}
                    applyTextToAll={() => onApplyTextToAll(selectedText)}
                    type={type}
                  />
                </TabActions>
              </TextActions>
              <TextWrapper>
                <Textarea
                  placeholder="Type Headline"
                  onChange={val => onTextChanges({headline: val}, selectedText)}
                  value={texts[selectedText]?.headline}
                />
                <Textarea
                  placeholder="Type Text"
                  onChange={val => onTextChanges({text: val}, selectedText)}
                  value={texts[selectedText]?.text}
                />
              </TextWrapper>
            </Texts>
          </>
        )}
      </Root>
    </Wrapper>
  );
};

export default Card;
