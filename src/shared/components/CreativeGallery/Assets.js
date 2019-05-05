import React, {useMemo, useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {CREATIVE_TYPES, TABS} from 'shared/constants/creatives';
import {groupBy} from 'lodash';
import TaggingModal from './TaggingModal';
import RenameModal from './RenameModal';
import DeleteModal from './DeleteModal';
import VirtualAssetsList from './VirtualAssetList';
import EmptyFolder from './Folders/EmptyFolder';
import Actions from './Actions';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  padding: 0 12px;
`;

const Assets = ({
  assets = [],
  tabType,
  selectedCreativesIds = [],
  toggleCreativeSelection,
  selectAllCreativesInFolder,
  clearCreativeSelectionInFolder,
  isSelectedCreativesInFolder,
  setSelectedPreviewCreative,
  onDelete,
  onRename,
  onTag,
  selectedFolder,
  allFolders,
  addCreativeToFolder,
  creativeType,
  loading,
}) => {
  const [selectedCreativeType, setSelectedCreativeType] = useState(null);
  const creativeAssets = useMemo(
    () => {
      const {Image, Video} = groupBy(assets, 'type');
      return {
        [CREATIVE_TYPES.IMAGE]: Image || [],
        [CREATIVE_TYPES.VIDEO]: Video || [],
        [CREATIVE_TYPES.ALL]: assets || [],
      };
    },
    [assets]
  );
  useEffect(
    () => {
      if (creativeType) {
        setSelectedCreativeType(creativeType);
      } else if (
        creativeAssets[CREATIVE_TYPES.VIDEO].length &&
        creativeAssets[CREATIVE_TYPES.IMAGE].length
      ) {
        setSelectedCreativeType(CREATIVE_TYPES.ALL);
      } else if (creativeAssets[CREATIVE_TYPES.VIDEO].length) {
        setSelectedCreativeType(CREATIVE_TYPES.VIDEO);
      } else if (creativeAssets[CREATIVE_TYPES.IMAGE].length) {
        setSelectedCreativeType(CREATIVE_TYPES.IMAGE);
      }
    },
    [creativeAssets, creativeType]
  );
  const [currentDelete, setCurrentDelete] = useState(null);
  const [currentRename, setCurrentRename] = useState(null);
  const [currentTaggingAsset, setCurrentTaggingAsset] = useState(null);
  const assetsOptions = {
    selectedCreativesIds,
    toggleCreativeSelection,
    setSelectedPreviewCreative,
    setCurrentDelete: onDelete && setCurrentDelete,
    setCurrentRename: onRename && setCurrentRename,
    setCurrentTaggingAsset: onTag && setCurrentTaggingAsset,
    getItemWidth: item => (166 * item.width) / item.height,
  };

  const handleCancelDelete = useCallback(() => setCurrentDelete(null), []);
  const handleCancelRename = useCallback(() => {
    setCurrentRename(null);
  }, []);
  const handleCancelTag = useCallback(() => {
    setCurrentTaggingAsset(null);
  }, []);
  return (
    <>
      <Actions
        tabType={tabType}
        creativeType={selectedCreativeType}
        onTypeSelect={setSelectedCreativeType}
        selectAllCreativesInFolder={selectAllCreativesInFolder}
        clearCreativeSelectionInFolder={clearCreativeSelectionInFolder}
        isSelectedCreativesInFolder={isSelectedCreativesInFolder}
        addCreativeToFolder={addCreativeToFolder}
        images={creativeAssets[CREATIVE_TYPES.IMAGE].length}
        videos={creativeAssets[CREATIVE_TYPES.VIDEO].length}
        selectedFolder={selectedFolder}
        allFolders={allFolders}
      />
      <Root>
        {tabType === TABS.CREATIVES ? (
          <VirtualAssetsList
            assets={creativeAssets[selectedCreativeType]}
            defaultOpen
            enableTooltip
            {...assetsOptions}
          />
        ) : (
          !!assets?.length && (
            <VirtualAssetsList
              enableTooltip
              getItemWidth={() => 305}
              {...{
                assets,
                selectedCreativesIds,
                toggleCreativeSelection,
                setSelectedPreviewCreative,
                setCurrentDelete: onDelete && setCurrentDelete,
                creativeType: 'text',
              }}
            />
          )
        )}
        {!assets?.length && !loading && <EmptyFolder />}
        {currentDelete && (
          <DeleteModal asset={currentDelete} onClose={handleCancelDelete} onConfirm={onDelete} />
        )}
        {currentRename && (
          <RenameModal asset={currentRename} onClose={handleCancelRename} onConfirm={onRename} />
        )}
        {currentTaggingAsset && (
          <TaggingModal asset={currentTaggingAsset} onClose={handleCancelTag} onConfirm={onTag} />
        )}
      </Root>
    </>
  );
};

export default Assets;
