import React, {useCallback, useState} from 'react';
import {SEARCH_TAGS_QUERY, CREATE_TAG} from 'shared/services/api';
import styled from 'styled-components';
import {useMutation, useQuery} from 'react-apollo-hooks';
import ConfirmationDialog from './ConfirmationDialog';
import Select from '../Select';

const TagsSelect = styled(Select)`
  margin-bottom: 37px;
`;

const TaggingModal = ({onConfirm, asset, onClose}) => {
  const [currentTags, setCurrentTags] = useState(asset?.tags || []);
  const [fetchPolicy, setFetchPolicy] = useState('cache-and-network');
  const [isLoading, setIsLoading] = useState(false);
  const handleCancelTag = useCallback(
    () => {
      setCurrentTags(['']);
      onClose();
    },
    [onClose]
  );

  const [input, setInput] = useState('');
  const {
    data: {searchTags},
    loading,
  } = useQuery(SEARCH_TAGS_QUERY, {variables: {partOfName: input}, fetchPolicy});

  const onTagsChange = useCallback(tags => setCurrentTags(tags), []);
  const createTagMutation = useMutation(CREATE_TAG, {
    update: (cache, {data: {createTag}}) => {
      setFetchPolicy('no-cache');
      setCurrentTags([...currentTags, createTag]);
    },
  });
  const handleCreateTag = useCallback(
    async name => {
      setIsLoading(true);
      await createTagMutation({variables: {name}});
      setIsLoading(false);
    },
    [createTagMutation]
  );
  const handleConfirm = useCallback(
    () => {
      onConfirm(asset, currentTags);
      onClose();
    },
    [asset, currentTags, onClose, onConfirm]
  );
  return (
    <ConfirmationDialog
      header="Define Tags"
      confirmText="Save"
      onConfirm={handleConfirm}
      onCancel={handleCancelTag}
    >
      <TagsSelect
        title="Tag Name"
        options={searchTags}
        getOptionLabel={o => (o.__isNew__ ? `Create new tag: ${o.value}` : o.name)}
        value={currentTags}
        onChange={onTagsChange}
        onInputChange={v => setInput(v)}
        onCreateOption={handleCreateTag}
        isLoading={isLoading || loading}
        isPortal
        isMulti
      />
    </ConfirmationDialog>
  );
};

export default TaggingModal;
