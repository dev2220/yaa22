import React from 'react';
import styled from 'styled-components';
import BaseCard from '../Card';
import SelectType from './SelectType';
import Header from './Header';
import Select from '../Select';
import CreativeCard from './Card';
import CreativeGallery from '../CreativeGallery';
import CustomizeThumbnail from './CustomizeTumbnail';
import View from '../CreativeGallery/View';
import {
  useCustomThumbnailModal,
  useCreativeGallery,
  useTextActions,
  useCardActions,
  useThumbnailActions,
  useHoverActions,
} from './utils';

const Card = styled(BaseCard)`
  width: 975px;
  margin: 10px 0px 24px 0px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  padding: ${({theme}) => theme.card.padding}px;
  overflow-x: initial;
  flex-direction: ${({value}) => (value ? 'column' : 'row')};
  flex-wrap: nowrap;
`;

const SelectWrapper = styled.div`
  width: ${({theme}) => theme.input.sizes.short};
  margin-bottom: 0px;
  margin-top: 24px;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #d8d8d8;
  & > div {
    margin-right: 32px;
    margin-bottom: 32px;
  }
  & > div:nth-child(3n) {
    margin-right: 0px;
  }
`;

const SelectAd = ({
  onChange,
  callToActionType,
  onCallToTypeChange,
  selectedCreatives = [],
  value,
  clientId,
  offerId,
  callToActionOptions,
  typeOptions,
  onCreativeChange,
  creativesMetadata,
}) => {
  const cardType = value?.header;

  const {
    galleryModal,
    resetGalleryModal,
    handleOnText,
    onPlaceholderClick,
    handleOnGalleryAddThumbnailImage,
    onChangeCreative,
  } = useCreativeGallery(onCreativeChange, selectedCreatives, cardType);

  const {
    customThumbnailModal,
    openCustomizeThumbnail,
    resetCustomThumbnailModal,
  } = useCustomThumbnailModal();

  const {handleOnTextChanges, handleOnDeleteText, applyTextToAll, onAddingTexts} = useTextActions(
    selectedCreatives,
    onCreativeChange,
    galleryModal,
    resetGalleryModal
  );

  const {onDuplicate, onDelete, onCreatingCreatives} = useCardActions(
    selectedCreatives,
    onCreativeChange,
    resetGalleryModal
  );

  const {
    applyThumbnailToAll,
    removeThumbnail,
    applyCustomThumbnail,
    onAddingThumbnailImage,
  } = useThumbnailActions(
    selectedCreatives,
    onCreativeChange,
    customThumbnailModal,
    resetCustomThumbnailModal,
    galleryModal,
    resetGalleryModal
  );

  const {
    setSelectedPreviewCreative,
    handleOnChangeCreative,
    selectedPreviewCreative,
  } = useHoverActions({
    onCreativeChange,
    galleryModal,
    resetGalleryModal,
    selectedCreatives,
  });
  const onGallerySubmitHandlers = {
    onCreatingCreatives,
    handleOnChangeCreative,
    onAddingTexts,
    onAddingThumbnailImage,
  };

  return (
    <Card>
      <Header
        value={value}
        onChange={onChange}
        onCreativeChange={onCreativeChange}
        onAddCreativesClick={onPlaceholderClick}
        selectedCreatives={selectedCreatives}
      />
      <OptionsWrapper value={value}>
        {!value ? (
          <SelectType options={typeOptions} onChange={onChange} />
        ) : (
          <>
            <CardsWrapper>
              {!selectedCreatives?.length && <CreativeCard type={cardType} onClick={onPlaceholderClick} isPlaceholder />}
              {selectedCreatives?.map((creative, idx) => (
                <CreativeCard
                  key={`${creative.creativeAssetId}-${idx}`}
                  type={cardType}
                  onDuplicate={() => onDuplicate(idx)}
                  onDelete={() => onDelete(idx)}
                  onAddTexts={() => handleOnText(idx)}
                  onDeleteText={textIdx => handleOnDeleteText(idx, textIdx)}
                  onTextChanges={(val, textIdx) => handleOnTextChanges(idx, textIdx, val)}
                  onApplyTextToAll={textIdx => applyTextToAll(idx, textIdx)}
                  onGalleryAddThumbnailImage={() => handleOnGalleryAddThumbnailImage(idx)}
                  onApplyThumbnailToAll={() => applyThumbnailToAll(idx)}
                  onRemoveThumbnail={() => removeThumbnail(idx)}
                  onCustomizeThumbnail={() => openCustomizeThumbnail(creative.creativeAssetId, idx)}
                  creative={creativesMetadata[creative.creativeAssetId]}
                  onPreview={() =>
                    setSelectedPreviewCreative(creativesMetadata[creative.creativeAssetId])
                  }
                  onChangeCreative={() => onChangeCreative(idx)}
                  texts={creative.texts}
                  previewCreative={creativesMetadata[creative.previewCreativeAssetId]}
                />
              ))}
            </CardsWrapper>
            <SelectWrapper>
              <Select
                title="Call to Action"
                tooltip="Call to action"
                isFull={false}
                value={callToActionType}
                onChange={onCallToTypeChange}
                options={callToActionOptions}
              />
            </SelectWrapper>
          </>
        )}
      </OptionsWrapper>

      <CreativeGallery
        isOpen={galleryModal.isOpen}
        onClose={resetGalleryModal}
        onSubmit={onGallerySubmitHandlers[galleryModal.submitCallback]}
        creativeType={galleryModal.creativeType}
        tabType={galleryModal.currentTabType}
        singleMode={galleryModal.singleMode}
        {...{clientId, offerId}}
      />
      {customThumbnailModal.selectedCreativeId && (
        <CustomizeThumbnail
          videoId={customThumbnailModal.selectedCreativeId}
          onClose={resetCustomThumbnailModal}
          onSubmit={applyCustomThumbnail}
        />
      )}

      {selectedPreviewCreative && (
        <View creative={selectedPreviewCreative} onClose={() => setSelectedPreviewCreative(null)} />
      )}
    </Card>
  );
};

export default SelectAd;
