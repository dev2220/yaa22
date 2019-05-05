import React from 'react';
import styled from 'styled-components';
import {compose, withHandlers, withPropsOnChange, withState, pure} from 'recompose';
import ViewFolderItem from './ViewFolderItem';
import NewFolderButton from './NewFolderButton';
import DynamicInfo from './DynamicInfo';
import ConfirmationDialog from '../ConfirmationDialog';
import EditFolderItem from './EditFolderItem';
import KeyHandler from '../../KeyHandler';
import {selectedCss, Amount} from './styled';

const Wrapper = styled(KeyHandler)`
  width: 243px;
  border: 1px solid ${({theme}) => theme.palette.greyWhite};
  height: 660px;
  display: flex;
  flex-direction: column;
  border-top: none;
`;

const Header = styled.div`
  padding: 0px 16px;
  font-weight: 600;
  height: 57px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  ${({selected}) => selected && selectedCss};
  ${Amount} {
    display: inline-block;
  }
`;

const Divider = styled.div`
  margin: 5px 26px;
  height: 1px;
  background-color: ${({theme}) => theme.palette.greyWhite};
`;

const FolderListContainer = styled.div`
  max-height: 290px;
  overflow-y: auto;
`;

const FoldersPanel = ({
  sortedFolders,
  editItem,
  setEditItem,
  setFolderToAdd,
  updateFolderName,
  onDeleteFolder,
  deleteItem,
  onSelectFolder,
  selectedFolder,
  addFolder,
  setDeleteItem,
  folderToAdd,
  folderNameError,
  handleOnEnter,
  selectedTab,
  onAllClick,
  onFoldersScroll,
  creativesAmount = 0,
}) => (
  <Wrapper onEnter={handleOnEnter}>
    <Header selected={!selectedFolder} onClick={onAllClick}>
      All {selectedTab}
      <Amount>{creativesAmount}</Amount>
    </Header>
    <FolderListContainer onScroll={onFoldersScroll}>
      {sortedFolders.map(
        (folder, i) =>
          folder.id === editItem?.id ? (
            <EditFolderItem
              key={folder.id}
              index={i}
              folder={folder}
              cancelEdit={() => setEditItem(null)}
              updateFolderName={updateFolderName}
              error={folderNameError}
            />
          ) : (
            <ViewFolderItem
              key={folder.id}
              index={i}
              folder={folder}
              onRename={setEditItem}
              onDelete={setDeleteItem}
              onFolderSelect={onSelectFolder}
              selected={selectedFolder?.id === folder.id}
            />
          )
      )}
      {folderToAdd && (
        <EditFolderItem
          folder={folderToAdd}
          cancelEdit={() => setFolderToAdd(null)}
          updateFolderName={updateFolderName}
          error={folderNameError}
        />
      )}
    </FolderListContainer>
    <NewFolderButton onClick={addFolder} />
    <Divider />
    {selectedFolder && <DynamicInfo selectedFolder={selectedFolder} />}
    {deleteItem && (
      <ConfirmationDialog
        header="Delete Folder"
        confirmText="Delete Folder"
        onConfirm={onDeleteFolder}
        onCancel={() => setDeleteItem(null)}
      >
        <div>
          This Folder and all Creatives in it will be permanently deleted. Are you sure you want to
          delete folder?
        </div>
      </ConfirmationDialog>
    )}
  </Wrapper>
);

const enhance = compose(
  pure,
  withState('editItem', 'setEditItem', null),
  withState('deleteItem', 'setDeleteItem', null),
  withState('folderToAdd', 'setFolderToAdd', null),
  withState('folderNameError', 'setFolderNameError', ''),
  withPropsOnChange(['folders'], ({folders}) => ({
    sortedFolders: [...folders].sort((a, b) => a.name.localeCompare(b.name)),
    totalCreatives: folders.reduce((acc, {assets}) => acc + assets?.length || 0, 0),
    foldersNames: folders.map(({name}) => name.toLowerCase()),
  })),
  withHandlers({
    addFolder: ({setFolderToAdd}) => () => setFolderToAdd({name: '', assets: []}),
    onFoldersScroll: ({setFolderNameError}) => () => setFolderNameError(''),
    updateFolderName: ({
      editItem,
      sortedFolders,
      setFolderToAdd,
      onRenameFolder,
      setEditItem,
      setFolderNameError,
      foldersNames,
      onCreateFolder,
    }) => name => {
      if (!/[a-zA-Z 0-9_]/g.test(name)) {
        setFolderNameError('Only characters A-Z, a-z, 0-9,_ - allowed');
      } else if (
        foldersNames.includes(name.toLowerCase()) &&
        name !== sortedFolders[editItem]?.name
      ) {
        setFolderNameError('Folder name already exist');
      } else if (editItem === null) {
        setFolderToAdd(null);
        onCreateFolder({name, assets: []});
        setFolderNameError('');
      } else {
        onRenameFolder(editItem, name);
        setFolderNameError('');
        setEditItem(null);
      }
    },
    onDeleteFolder: ({onDeleteFolder, deleteItem, setDeleteItem}) => () => {
      setDeleteItem(null);
      onDeleteFolder(deleteItem);
    },
    handleOnEnter: ({setEditItem, selectedFolder}) => () => {
      if (selectedFolder) {
        setEditItem(selectedFolder);
      }
    },
  })
);

export default enhance(FoldersPanel);
