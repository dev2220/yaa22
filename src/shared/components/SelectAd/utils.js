import {useState, useCallback} from 'react';
import {TABS, CREATIVE_TYPES} from 'shared/constants/creatives';

const customThumbnailModalState = {
  selectedCreativeId: null,
  selectedCardIdx: null,
};

export const useCustomThumbnailModal = () => {
  const [customThumbnailModal, setCustomThumbnailModal] = useState(customThumbnailModalState);

  const resetCustomThumbnailModal = useCallback(
    () => setCustomThumbnailModal(customThumbnailModalState),
    []
  );

  const openCustomizeThumbnail = useCallback((creativeId, idx) => {
    setCustomThumbnailModal({
      selectedCardIdx: idx,
      selectedCreativeId: creativeId,
    });
  }, []);

  return {
    customThumbnailModal,
    openCustomizeThumbnail,
    resetCustomThumbnailModal,
  };
};

const creativeGalleryState = {
  isOpen: false,
  currentTabType: TABS.CREATIVES,
  selectedCardIdx: null,
  creativeType: null,
  submitCallback: 'onCreatingCreatives',
  singleMode: false,
};

export const useCreativeGallery = (onCreativeChange, selectedCreatives, cardType) => {
  const [galleryModal, setCreativeGalleryModal] = useState(creativeGalleryState);

  const resetGalleryModal = useCallback(() => setCreativeGalleryModal(creativeGalleryState), []);

  const handleOnText = useCallback(
    idx =>
      setCreativeGalleryModal({
        isOpen: true,
        selectedCardIdx: idx,
        currentTabType: TABS.TEXTS,
        submitCallback: 'onAddingTexts',
        creativeType: cardType,
        singleMode: false,
      }),
    [cardType]
  );

  const onPlaceholderClick = useCallback(
    () =>
      setCreativeGalleryModal({
        ...creativeGalleryState,
        isOpen: true,
        creativeType: cardType,
      }),
    [cardType]
  );

  const handleOnGalleryAddThumbnailImage = useCallback(
    idx =>
      setCreativeGalleryModal({
        isOpen: true,
        selectedCardIdx: idx,
        currentTabType: TABS.CREATIVES,
        submitCallback: 'onAddingThumbnailImage',
        creativeType: CREATIVE_TYPES.IMAGE,
        singleMode: true,
      }),
    []
  );

  const onChangeCreative = useCallback(
    idx => {
      setCreativeGalleryModal({
        isOpen: true,
        selectedCardIdx: idx,
        currentTabType: TABS.CREATIVES,
        submitCallback: 'handleOnChangeCreative',
        creativeType: cardType,
        singleMode: true,
      });
    },
    [cardType]
  );
  return {
    galleryModal,
    resetGalleryModal,
    handleOnText,
    onPlaceholderClick,
    handleOnGalleryAddThumbnailImage,
    onChangeCreative,
  };
};

export const useTextActions = (
  selectedCreatives,
  onCreativeChange,
  galleryModal,
  resetGalleryModal
) => {
  const onAddingTexts = useCallback(
    creatives => {
      const newerCreatives = [...selectedCreatives];
      newerCreatives.splice(galleryModal.selectedCardIdx, 1, {
        ...selectedCreatives[galleryModal.selectedCardIdx],
        texts: [
          ...selectedCreatives[galleryModal.selectedCardIdx].texts,
          ...creatives.map(creative => ({headline: creative.headline, text: creative.text})),
        ],
      });
      onCreativeChange(newerCreatives);
      resetGalleryModal();
    },
    [galleryModal.selectedCardIdx, onCreativeChange, resetGalleryModal, selectedCreatives]
  );

  const handleOnTextChanges = useCallback(
    (idx, textIdx, val) => {
      const newTexts = [...selectedCreatives[idx].texts];
      if (textIdx === null) {
        if (newTexts?.length === 1 && !val.text?.length && !val.headline?.length) {
          newTexts.push(val);
        } else if (!val.text?.length && !val.headline?.length) {
          newTexts.push(val);
        }
      } else {
        newTexts.splice(textIdx, 1, {...newTexts[textIdx], ...val});
      }
      const newerCreatives = [...selectedCreatives];
      newerCreatives.splice(idx, 1, {
        ...selectedCreatives[idx],
        texts: newTexts,
      });
      onCreativeChange(newerCreatives);
    },
    [onCreativeChange, selectedCreatives]
  );

  const handleOnDeleteText = useCallback(
    (idx, textIdx) => {
      const newTexts = [...selectedCreatives[idx].texts];
      if (textIdx !== null) {
        newTexts.splice(textIdx, 1);
      }
      const newerCreatives = [...selectedCreatives];

      newerCreatives.splice(idx, 1, {
        ...selectedCreatives[idx],
        texts: newTexts,
      });
      onCreativeChange(newerCreatives);
    },
    [onCreativeChange, selectedCreatives]
  );

  const applyTextToAll = useCallback(
    (idx, textIdx) => {
      const textToCopy = selectedCreatives[idx].texts[textIdx];
      const newerCreatives = selectedCreatives.map(
        (c, i) => (i !== idx ? {...c, texts: [...c.texts, {...textToCopy}]} : c)
      );
      onCreativeChange(newerCreatives);
    },
    [selectedCreatives, onCreativeChange]
  );
  return {handleOnTextChanges, handleOnDeleteText, applyTextToAll, onAddingTexts};
};

export const useCardActions = (selectedCreatives, onCreativeChange, resetGalleryModal) => {
  const onCreatingCreatives = useCallback(
    creatives => {
      onCreativeChange(
        [
          ...selectedCreatives,
          ...creatives.map(creative => ({
            creativeAssetId: creative.id,
            previewCreativeAssetId: null,
            texts: [{headline: '', text: ''}],
          })),
        ],
        creatives
      );
      resetGalleryModal();
    },
    [onCreativeChange, resetGalleryModal, selectedCreatives]
  );

  const onDuplicate = useCallback(
    idx => {
      const newerCreatives = [...selectedCreatives];
      newerCreatives.splice(idx, 0, selectedCreatives[idx]);
      onCreativeChange(newerCreatives);
    },
    [onCreativeChange, selectedCreatives]
  );

  const onDelete = useCallback(
    idx => {
      const newerCreatives = [...selectedCreatives];
      newerCreatives.splice(idx, 1);
      onCreativeChange(newerCreatives);
    },
    [onCreativeChange, selectedCreatives]
  );
  return {onDuplicate, onDelete, onCreatingCreatives};
};

export const useThumbnailActions = (
  selectedCreatives,
  onCreativeChange,
  customThumbnailModal,
  resetCustomThumbnailModal,
  galleryModal,
  resetGalleryModal
) => {
  const onAddingThumbnailImage = useCallback(
    creatives => {
      if (creatives?.length === 1) {
        const newerCreatives = selectedCreatives.map(
          (c, i) =>
            i === galleryModal.selectedCardIdx ? {...c, previewCreativeAssetId: creatives[0].id} : c
        );
        onCreativeChange(newerCreatives, creatives);
      }
      resetGalleryModal();
    },
    [galleryModal.selectedCardIdx, onCreativeChange, resetGalleryModal, selectedCreatives]
  );

  const applyThumbnailToAll = useCallback(
    idx => {
      const previewCreativeAssetId = selectedCreatives[idx].previewCreativeAssetId;
      const newerCreatives = selectedCreatives.map(
        (c, i) => (i === idx ? c : {...c, previewCreativeAssetId})
      );
      onCreativeChange(newerCreatives);
    },
    [selectedCreatives, onCreativeChange]
  );

  const removeThumbnail = useCallback(
    idx => {
      const newerCreatives = selectedCreatives.map(
        (c, i) => (i === idx ? {...c, previewCreativeAssetId: null} : c)
      );
      onCreativeChange(newerCreatives);
    },
    [selectedCreatives, onCreativeChange]
  );

  const applyCustomThumbnail = useCallback(
    creative => {
      const newerCreatives = selectedCreatives.map(
        (c, i) =>
          i === customThumbnailModal.selectedCardIdx
            ? {...c, previewCreativeAssetId: creative.id}
            : c
      );
      onCreativeChange(newerCreatives, [creative]);
      resetCustomThumbnailModal();
    },
    [
      customThumbnailModal.selectedCardIdx,
      onCreativeChange,
      resetCustomThumbnailModal,
      selectedCreatives,
    ]
  );

  return {applyThumbnailToAll, removeThumbnail, applyCustomThumbnail, onAddingThumbnailImage};
};

export const useHoverActions = ({
  onCreativeChange,
  selectedCreatives,
  resetGalleryModal,
  galleryModal,
}) => {
  const [selectedPreviewCreative, setSelectedPreviewCreative] = useState(null);
  const handleOnChangeCreative = useCallback(
    creatives => {
      if (creatives?.length === 1) {
        const {id} = creatives[0];
        const newerCreatives = selectedCreatives.map(
          (c, i) => (i === galleryModal.selectedCardIdx ? {...c, creativeAssetId: id} : c)
        );
        onCreativeChange(newerCreatives, creatives);
      }
      resetGalleryModal();
    },
    [galleryModal.selectedCardIdx, onCreativeChange, resetGalleryModal, selectedCreatives]
  );
  return {
    selectedPreviewCreative,
    setSelectedPreviewCreative,
    handleOnChangeCreative,
  };
};
