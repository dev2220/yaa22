import React from 'react';
import styled from 'styled-components';
import {TertiaryButton, Select} from 'shared/components';
import {Caption} from 'shared/components/Typography';
import {CREATIVE_TYPES, TABS} from 'shared/constants/creatives';
import UploadCreatives from './UploadCreatives';

const SortSelect = styled(Select)`
  width: 80px;

  .select__control,
  .select__control:hover,
  .select__control:focus {
    border: none;
    padding-left: 0;
  }
`;

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 32px;
  flex-shrink: 0;
  box-shadow: 1px 1px 4px 1px rgba(51, 51, 51, 0.2);
`;

const CreativeAssetType = styled.span`
  color: ${({selected, theme}) => (selected ? theme.palette.selected : theme.palette.black)};
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  margin-left: 32px;
`;

const Count = styled.span`
  color: ${({theme}) => theme.palette.grey};
  margin-left: 5px;
`;

const SortControl = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const FolderName = styled.div``;

const Actions = ({
  selectAllCreativesInFolder,
  clearCreativeSelectionInFolder,
  isSelectedCreativesInFolder,
  tabType,
  creativeType,
  onTypeSelect,
  videos,
  images,
  selectedFolder,
  allFolders,
  addCreativeToFolder,
}) => (
  <Root>
    {tabType !== 'Texts' && !allFolders && (
      <UploadCreatives
        folderId={selectedFolder?.id}
        creativeType={creativeType}
        addCreativeToFolder={addCreativeToFolder}
      />)}
    {tabType === 'Texts' &&
      selectedFolder && (
        <FolderName>{`${selectedFolder?.name}/${selectedFolder?.assets?.length}`}</FolderName>
      )}
    {tabType === TABS.CREATIVES && (
      <>
        {!!videos &&
          !!images && (
            <CreativeAssetType
              selected={creativeType === CREATIVE_TYPES.ALL}
              onClick={() => onTypeSelect(CREATIVE_TYPES.ALL)}
            >
              All
              <Count>{videos + images}</Count>
            </CreativeAssetType>
          )}
        {!!videos && (
          <CreativeAssetType
            selected={creativeType === CREATIVE_TYPES.VIDEO}
            onClick={() => onTypeSelect(CREATIVE_TYPES.VIDEO)}
          >
            Videos
            <Count>{videos}</Count>
          </CreativeAssetType>
        )}
        {!!images && (
          <CreativeAssetType
            selected={creativeType === CREATIVE_TYPES.IMAGE}
            onClick={() => onTypeSelect(CREATIVE_TYPES.IMAGE)}
          >
            Images
            <Count>{images}</Count>
          </CreativeAssetType>
        )}
      </>
    )}
    <SortControl>
      <Caption disabled>Sort By:</Caption>
      <SortSelect value={1} options={[{id: 1, name: 'CRT'}]} isSearchable={false} />
    </SortControl>
    {isSelectedCreativesInFolder ? (
      <TertiaryButton onClick={clearCreativeSelectionInFolder}>Unselect all</TertiaryButton>
    ) : (
      <TertiaryButton onClick={selectAllCreativesInFolder}>Select all</TertiaryButton>
    )}
  </Root>
);

export default Actions;
