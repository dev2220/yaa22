import React, {useState, useCallback, useMemo, useEffect} from 'react';
import styled from 'styled-components';
import {TABS} from 'shared/constants/creatives';
import FoldersPanel from './Folders/FoldersPanel';
import FilterPanel from './Filters/FilterPanel';
import {PrimaryButton} from '../Button';
import Modal, {Content} from '../Modal';
import Tabs from './Tabs';
import View from './View';
import Preview from './Preview';
import {
  dimensionsOptions,
  kpiRangeOptions,
  uploadDateOptions,
  videoLengthOptions,
} from './Filters/filterOptions';
import Assets from './Assets';
import {
  useFetchFolders,
  useCreateFolder,
  useDeleteFolder,
  useFilters,
  useRenameFolder,
  useSelectedFolder,
  useSelectedCreatives,
  useRemoveCreativeFromFolder,
  useRenameCreative,
  useUpdateTagsToCreative,
  useSubmitCallback,
  useAddCreativeToFolder,
} from './utils';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  overflow: hidden;
  height: 660px;
`;

const CreativeModal = styled(Modal)`
  ${Content} {
    padding: 0;
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  flex-shrink: 0;
  border: solid 1px #d6d6d6;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 85px;
  align-items: center;
  padding: 0 34px;
  border-top: 1px solid ${({theme}) => theme.palette.greyWhite};
`;

const SumCreatives = styled.div`
  font-weight: 600;
  display: flex;
`;

const TogglePreview = styled.div`
  cursor: pointer;
  color: ${({theme}) => theme.palette.blue};
  font-weight: normal;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const CreativeGalleryModal = ({
  isOpen,
  tabType,
  onClose,
  creativeType,
  offerId,
  clientId,
  onSubmit,
  singleMode,
}) => {
  const tabs = useMemo(() => (tabType ? [tabType] : [TABS.CREATIVES, TABS.TEXTS]), [tabType]);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  useEffect(() => setSelectedTab(tabs[0]), [tabType, tabs]);
  const {folders, foldersLoading, allCreatives} = useFetchFolders(
    selectedTab,
    clientId,
    creativeType,
    tabType
  );
  const creativesAmount = allCreatives?.length;
  const {
    selectedFolder,
    selectedAssets,
    setSelectedFolder,
    selectAll,
    selectedAll,
  } = useSelectedFolder(selectedTab, folders, creativeType, tabType);
  const {
    selectedCreativesIds,
    toggleCreativeSelection,
    selectAllCreativesInFolder,
    clearCreativeSelection,
    clearCreativeSelectionInFolder,
    isSelectedCreativesInFolder,
  } = useSelectedCreatives(selectedTab, singleMode, allCreatives, selectedAll, selectedFolder);
  const [isOpenPreview, setIsOpenPreview] = useState(true);
  const [selectedPreviewCreative, setSelectedPreviewCreative] = useState(null);
  const {filters, assets, updateFilters, clearFilters} = useFilters(selectedAssets, selectedTab);
  const onCreateFolder = useCreateFolder(selectedTab, clientId, offerId);
  const onRenameFolder = useRenameFolder(selectedTab, clientId, selectedFolder);
  const onDeleteFolder = useDeleteFolder(selectedTab, clientId, selectedFolder);
  const onRemoveCreative = useRemoveCreativeFromFolder(
    clientId,
    selectedCreativesIds,
    toggleCreativeSelection,
    selectedFolder,
    selectedTab
  );
  const {addCreativeToFolder} = useAddCreativeToFolder();
  const onRenameCreative = useRenameCreative();
  const onTagCreative = useUpdateTagsToCreative(clientId);
  const handleSubmit = useSubmitCallback(
    onSubmit,
    clearCreativeSelection,
    selectedCreativesIds,
    selectedTab
  );
  const handleOnClose = useCallback(
    () => {
      onClose();
      clearCreativeSelection();
    },
    [onClose, clearCreativeSelection]
  );

  const handleSelectFolder = useCallback(
    folder => {
      setSelectedFolder(folder);
      clearFilters();
    },
    [setSelectedFolder, clearFilters]
  );
  return (
    <CreativeModal
      header={
        <Tabs tabs={tabs} selectedTab={selectedTab} onTabClick={tab => setSelectedTab(tab)} />
      }
      isOpen={isOpen}
      close={handleOnClose}
      fullScreen
      loading={foldersLoading}
    >
      {selectedPreviewCreative && (
        <View creative={selectedPreviewCreative} onClose={() => setSelectedPreviewCreative(null)} />
      )}
      <FilterPanel
        {...{
          dimensionsOptions,
          uploadDateOptions,
          kpiRangeOptions,
          videoLengthOptions,
          filters,
        }}
        selectedTab={selectedTab}
        onFiltersChange={updateFilters}
        creativeType={creativeType}
      />
      <Root>
        <ContentWrapper>
          <FoldersPanel
            onAllClick={selectAll}
            selectedTab={selectedTab}
            selectedFolder={selectedFolder}
            onSelectFolder={handleSelectFolder}
            onCreateFolder={onCreateFolder}
            onDeleteFolder={onDeleteFolder}
            onRenameFolder={onRenameFolder}
            folders={folders}
            creativesAmount={creativesAmount}
          />
          <Wrapper>
            <Assets
              assets={assets}
              tabType={selectedTab}
              creativeType={creativeType}
              selectedCreativesIds={selectedCreativesIds}
              toggleCreativeSelection={toggleCreativeSelection}
              selectAllCreativesInFolder={selectAllCreativesInFolder}
              clearCreativeSelectionInFolder={clearCreativeSelectionInFolder}
              isSelectedCreativesInFolder={isSelectedCreativesInFolder}
              setSelectedPreviewCreative={setSelectedPreviewCreative}
              addCreativeToFolder={addCreativeToFolder}
              onTag={onTagCreative}
              onDelete={!selectedAll && onRemoveCreative}
              onRename={onRenameCreative}
              selectedFolder={selectedFolder}
              allFolders={selectedAll}
              loading={foldersLoading}
            />
            <FooterWrapper>
              {isOpenPreview && (
                <Preview
                  creativeType={selectedTab}
                  onChange={toggleCreativeSelection}
                  onClearAll={clearCreativeSelection}
                  onHide={() => setIsOpenPreview(!isOpenPreview)}
                  setSelectedPreviewCreative={setSelectedPreviewCreative}
                  creativesIds={selectedCreativesIds}
                  selectedTab={selectedTab}
                />
              )}
              <Footer>
                <SumCreatives>
                  {selectedCreativesIds.length} Selected {selectedTab} &nbsp;
                  <TogglePreview onClick={() => setIsOpenPreview(!isOpenPreview)}>
                    {isOpenPreview ? 'Hide' : 'Show'}
                  </TogglePreview>
                </SumCreatives>
                <PrimaryButton onClick={handleSubmit}>Add to recipe</PrimaryButton>
              </Footer>
            </FooterWrapper>
          </Wrapper>
        </ContentWrapper>
      </Root>
    </CreativeModal>
  );
};

export default CreativeGalleryModal;
