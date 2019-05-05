import {useCallback, useMemo, useState} from 'react';
import {useMutation, useQuery, useApolloClient} from 'react-apollo-hooks';
import {overEvery, uniqBy, uniqueId, xor, difference} from 'lodash';
import moment from 'moment';
import gql from 'graphql-tag';
import {
  CREATE_NEW_CREATIVES_FOLDER_QUERY,
  CREATE_NEW_TEXTS_FOLDER_QUERY,
  DELETE_FOLDER_QUERY,
  FETCH_CREATIVES_FOLDERS_QUERY,
  FETCH_TEXTS_FOLDERS_QUERY,
  RENAME_FOLDER_QUERY,
  RENAME_CREATIVE,
  REMOVE_CREATIVE_FROM_FOLDER,
  UPDATE_TAGS_TO_CREATIVE,
  REMOVE_TEXTS_FROM_FOLDER,
} from 'shared/services/api';
import {CREATIVE_TYPES, TABS} from 'shared/constants/creatives';
import {
  EQUALS_TO,
  GREATER_THAN,
  LAST_30_DAYS,
  LAST_7_DAYS,
  LAST_MONTH,
  SEARCH_NAME,
  SEARCH_TEXT,
  SMALLER_THAN,
  THIS_MONTH,
  TODAY,
  YESTERDAY,
  EMPTY_DEFAULT,
} from './Filters/filterOptions';
import {
  SELECTED_CREATIVE_FOLDER_FRAGMENT,
  SELECTED_CREATIVE_ASSETS_FRAGMENT,
  SELECTED_TEXT_ASSET_FRAGMENT,
  SELECTED_TEXT_FOLDER_FRAGMENT,
} from './fragments';

const emptyArray = [];

export const useMemoMutation = (mutation, options, inputs) =>
  useCallback(useMutation(mutation, options), inputs);

const creativeConfig = {
  fetchQuery: FETCH_CREATIVES_FOLDERS_QUERY,
  fetchProp: 'creativesFolders',
  createQuery: CREATE_NEW_CREATIVES_FOLDER_QUERY,
  createProp: 'createNewCreativesFolder',
  removeCreativeQuery: REMOVE_CREATIVE_FROM_FOLDER,
  removeCreativeProp: 'creativeIds',
  removeCreativeReturnProp: 'removeCreativesFromFolder',
  folderEntity: 'CreativesFolder',
  renameFolderFragment: gql`
    fragment renameCreativesFolder on CreativesFolder {
      __typename
      name
    }
  `,
  selectedFolderFragment: SELECTED_CREATIVE_FOLDER_FRAGMENT,
  selectedFolderFragmentName: 'selectedCrativesFolder',
  assetEntity: 'CreativeAsset',
  selectedAssetsFragment: SELECTED_CREATIVE_ASSETS_FRAGMENT,
  selectedAssetsFragmentName: 'selectedCreativeAsset',
};

const textConfig = {
  fetchQuery: FETCH_TEXTS_FOLDERS_QUERY,
  fetchProp: 'textsFolders',
  createQuery: CREATE_NEW_TEXTS_FOLDER_QUERY,
  createProp: 'createNewTextsFolder',
  removeCreativeQuery: REMOVE_TEXTS_FROM_FOLDER,
  removeCreativeProp: 'textIds',
  removeCreativeReturnProp: 'removeTextsFromFolder',
  folderEntity: 'TextsFolder',
  renameFolderFragment: gql`
    fragment renameTextsFolder on TextsFolder {
      __typename
      name
    }
  `,
  selectedFolderFragment: SELECTED_TEXT_FOLDER_FRAGMENT,
  selectedFolderFragmentName: 'selectedTextsFolder',
  assetEntity: 'TextAsset',
  selectedAssetsFragment: SELECTED_TEXT_ASSET_FRAGMENT,
  selectedAssetsFragmentName: 'selectedTextsAsset',
};

const configs = {
  [TABS.CREATIVES]: creativeConfig,
  [TABS.TEXTS]: textConfig,
};

export const useFetchFolders = (selectedTab, clientId, creativeType, tabType, kpiRange = 30) => {
  const config = configs[selectedTab];

  const {data, loading: foldersLoading} = useQuery(config.fetchQuery, {
    variables: {clientId, daysBack: kpiRange},
    notifyOnNetworkStatusChange: true,
  });

  const originFolders = data[config.fetchProp];

  const folders = useMemo(() => {
    if (tabType === TABS.CREATIVES && creativeType) {
      return (
        originFolders?.map(folder => ({
          ...folder,
          assets: folder.assets.filter(asset => asset.type === creativeType),
        })) || []
      );
    }

    return originFolders || [];
  }, [originFolders, creativeType, tabType]);
  const allCreatives = useMemo(() => uniqBy(folders.map(({assets}) => assets).flat(), 'id'), [folders]);

  return {
    folders,
    foldersLoading,
    allCreatives,
  };
};

export const useRenameFolder = (selectedTab, clientId, selectedFolder) => {
  const config = configs[selectedTab];
  const renameFolderMutation = useMemoMutation(RENAME_FOLDER_QUERY, {}, []);
  return useCallback(
    ({id: folderId}, newName) =>
      renameFolderMutation({
        variables: {folderId, newName},
        optimisticResponse: {renameFolder: {...selectedFolder, name: newName}},
        update: (cache, {data: {renameFolder}}) => {
          if (renameFolder) {
            cache.writeFragment({
              id: `${config.folderEntity}:${folderId}`,
              fragment: config.renameFolderFragment,
              data: {name: newName, __typename: config.folderEntity},
            });
          }
        },
      }),
    [renameFolderMutation, selectedFolder, config]
  );
};

const defaultFiltersState = {
  [TABS.CREATIVES]: {
    dimension: '',
    uploadDate: '',
    videoLength: {equality: EMPTY_DEFAULT},
    kpiRange: 30,
    search: {
      type: SEARCH_NAME,
      value: '',
    },
  },
  [TABS.TEXTS]: {
    kpiRange: 30,
    search: {
      type: SEARCH_TEXT,
      value: '',
    },
  },
};

const uploadDateFilterFn = filters => asset => {
  const date = moment(asset.createdTime);
  switch (filters.uploadDate) {
    case TODAY:
      return date.isSame(moment(), 'day');
    case YESTERDAY:
      return date.isBetween(moment(), moment().subtract(1, 'day'), 'day', '[]');
    case LAST_7_DAYS:
      return date.isBetween(moment(), moment().subtract(7, 'day'), 'day', '[]');
    case LAST_30_DAYS:
      return date.isBetween(moment(), moment().subtract(30, 'day'), 'day', '[]');
    case THIS_MONTH:
      return date.isSame(moment(), 'month');
    case LAST_MONTH:
      return date.isBetween(moment(), moment().subtract(1, 'month'), 'month', '[]');
    default:
      return false;
  }
};

const videoLengthFilterFn = filters => asset => {
  if (asset.type !== CREATIVE_TYPES.VIDEO) {
    return true;
  }
  switch (filters.videoLength.equality) {
    case GREATER_THAN:
      return asset.videoLengthInSeconds > filters.videoLength.videoLength;
    case SMALLER_THAN:
      return asset.videoLengthInSeconds < filters.videoLength.videoLength;
    case EQUALS_TO:
      return asset.videoLengthInSeconds == filters.videoLength.videoLength;
    default:
      return true;
  }
};

export const useFilters = (originAssets, selectedTab) => {
  const [allFilters, setFilters] = useState(defaultFiltersState);
  const filters = allFilters[selectedTab];
  const assets = useMemo(
    () => {
      if (originAssets) {
        const predicate =
          selectedTab === TABS.CREATIVES
            ? overEvery([
                ...(filters.dimension ? [a => a.dimensions === filters.dimension] : []),
                ...(filters.uploadDate ? [uploadDateFilterFn(filters)] : []),
                ...(filters.videoLength?.videoLength ? [videoLengthFilterFn(filters)] : []),
                ...(filters.search?.value
                  ? [a => a.name.toLowerCase().includes(filters.search.value.toLowerCase())]
                  : []),
              ])
            : overEvery([
                ...(filters.search?.value
                  ? [a => a.text.toLowerCase().includes(filters.search.value.toLowerCase())]
                  : []),
              ]);

        return originAssets.filter(predicate);
      }
      return null;
    },
    [originAssets, filters, selectedTab]
  );

  const clearFilters = useCallback(() => setFilters(defaultFiltersState), []);

  const updateFilters = useCallback(f =>
      setFilters(prevFilters => ({
        ...prevFilters,
        [selectedTab]: {...prevFilters[selectedTab], ...f},
      })),
    [selectedTab],
  );

  return {assets, filters, updateFilters, clearFilters};
};
export const useDeleteFolder = (selectedTab, clientId) => {
  const config = selectedTab === TABS.CREATIVES ? creativeConfig : textConfig;
  const deleteFolderMutation = useMemoMutation(DELETE_FOLDER_QUERY, {}, []);

  return useCallback(
    ({id: folderId}) =>
      deleteFolderMutation({
        variables: {folderId},
        optimisticResponse: {deleteFolder: true},
        update: (cache, {data: {deleteFolder}}) => {
          if (deleteFolder) {
            const folders = cache.readQuery({
              query: config.fetchQuery,
              variables: {clientId},
            })[config.fetchProp];
            cache.writeQuery({
              query: config.fetchQuery,
              variables: {clientId},
              data: {
                [config.fetchProp]: folders.filter(f => f.id !== folderId),
              },
            });
          }
        },
      }),
    [deleteFolderMutation, config, clientId]
  );
};

export const useCreateFolder = (selectedTab, clientId, offerId) => {
  const config = configs[selectedTab];
  const createFolderMutation = useMemoMutation(config.createQuery, {}, [config]);
  return useCallback(
    ({name}) =>
      createFolderMutation({
        variables: {name, offerId},
        optimisticResponse: {
          [config.createProp]: {
            id: uniqueId(),
            createdTime: new Date(),
            name,
            __typename: 'CreativesFolder',
            assets: [],
          },
        },
        update: (cache, {data}) => {
          const folders = cache.readQuery({
            query: config.fetchQuery,
            variables: {clientId},
          })[config.fetchProp];
          const newFolder = {...data[config.createProp], assets: []};
          cache.writeQuery({
            query: config.fetchQuery,
            variables: {clientId},
            data: {
              [config.fetchProp]: [...folders, newFolder],
            },
          });
        },
      }),
    [offerId, config, clientId, createFolderMutation]
  );
};

export const useSelectedFolder = (selectedTab, folders, creativeType, tabType, kpiRange = 30) => {
  const config = configs[selectedTab];
  const [selected, setSelected] = useState({all: true});
  const setSelectedFolder = useCallback(
    folder => setSelected({...selected, [selectedTab]: folder.id, all: false}),
    [selected, selectedTab]
  );

  const client = useApolloClient();
  const selectedFolder = useMemo(
    () =>
      client.readFragment(
        {
          id: `${config.folderEntity}:${selected[selectedTab]}`,
          fragment: config.selectedFolderFragment,
          fragmentName: config.selectedFolderFragmentName,
          variables: {daysBack: kpiRange},
        },
        true
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [client, config, kpiRange, selected, selectedTab, folders]
  );

  const selectAll = useCallback(() => setSelected({selected, all: true}), [selected]);
  const selectedAssets = useMemo(
    () => {
      if (selected.all) {
        return uniqBy(folders.map(({assets}) => assets).flat(), 'id');
      }

      if (tabType === TABS.CREATIVES && creativeType) {
        return selectedFolder?.assets?.filter(asset => asset.type === creativeType);
      }

      return selectedFolder?.assets;
    },
    [selected.all, tabType, creativeType, selectedFolder, folders]
  );

  return {
    selectedFolder,
    selectedAssets,
    setSelectedFolder,
    selectAll,
    selectedAll: selected.all,
  };
};

export const useSelectedAssetsFromCache = (ids, selectedTab) => {
  const config = configs[selectedTab];
  const client = useApolloClient();
  return ids?.map(id =>
    client.readFragment({
      id: `${config.assetEntity}:${id}`,
      fragment: config.selectedAssetsFragment,
      fragmentName: config.selectedAssetsFragmentName,
      variables: {daysBack: 30},
    })
  );
};

export const useSelectedCreatives = (
  selectedTab,
  singleMode,
  allCreatives,
  selectedAll,
  selectedFolder
) => {
  const [selected, setSelected] = useState({});

  const selectedCreativesIds = selected[selectedTab] || emptyArray;
  const toggleCreativeSelection = useCallback(
    creativeId => {
      if (singleMode) {
        setSelected({...selected, [selectedTab]: [creativeId]});
      } else {
        setSelected({...selected, [selectedTab]: xor(selectedCreativesIds, [creativeId])});
      }
    },
    [singleMode, selected, selectedTab, selectedCreativesIds]
  );

  const selectAllCreativesInFolder = useCallback(
    () => {
      if (selectedAll) {
        setSelected({...selected, [selectedTab]: allCreatives.map(c => c.id)});
      } else {
        setSelected({
          ...selected,
          [selectedTab]: xor(selectedCreativesIds, selectedFolder?.assets?.map(c => c.id) || []),
        });
      }
    },
    [selected, allCreatives, selectedTab, selectedAll, selectedFolder, selectedCreativesIds]
  );

  const isSelectedCreativesInFolder = useMemo(
    () => {
      if (selectedAll) {
        return !!selectedCreativesIds?.length;
      }

      return selectedFolder?.assets?.some(a => selectedCreativesIds.includes(a.id));
    },
    [selectedAll, selectedCreativesIds, selectedFolder]
  );

  const clearCreativeSelection = useCallback(() => setSelected({...selected, [selectedTab]: []}), [
    selected,
    selectedTab,
  ]);

  const clearCreativeSelectionInFolder = useCallback(
    () => {
      if (selectedAll) {
        clearCreativeSelection();
      } else {
        const selectedFolderIds = selectedFolder?.assets?.map(a => a.id) || [];
        setSelected({
          ...selected,
          [selectedTab]: difference(selectedCreativesIds, selectedFolderIds),
        });
      }
    },
    [
      selectedAll,
      selectedCreativesIds,
      selected,
      selectedFolder,
      selectedTab,
      clearCreativeSelection,
    ]
  );

  return {
    selectedCreativesIds,
    toggleCreativeSelection,
    selectAllCreativesInFolder,
    clearCreativeSelectionInFolder,
    isSelectedCreativesInFolder,
    clearCreativeSelection,
  };
};

export const useRemoveCreativeFromFolder = (
  clientId,
  selectedCreativesIds,
  toggleCreativeSelection,
  selectedFolder,
  selectedTab
) => {
  const config = configs[selectedTab];
  const removeCreativeMutation = useMemoMutation(config.removeCreativeQuery, {}, [config]);

  return useCallback(
    creative =>
      removeCreativeMutation({
        variables: {folderId: selectedFolder.id, [config.removeCreativeProp]: [creative.id]},
        optimisticResponse: {[config.removeCreativeReturnProp]: true},
        update: (cache, {data}) => {
          if (data[config.removeCreativeReturnProp]) {
            const oldFolders = cache.readQuery({
              query: config.fetchQuery,
              variables: {clientId},
            })[config.fetchProp];
            const folderToUpdate = oldFolders.find(oldFolder => oldFolder.id === selectedFolder.id);
            const newAssets = folderToUpdate.assets.filter(asset => asset.id !== creative.id);
            const newFolder = {...folderToUpdate, assets: newAssets};
            cache.writeQuery({
              query: config.fetchQuery,
              variables: {clientId},
              data: {
                [config.fetchProp]: [
                  ...oldFolders.filter(oldFolder => oldFolder.id !== selectedFolder.id),
                  newFolder,
                ],
              },
            });
            if (selectedCreativesIds.includes(creative.id)) {
              toggleCreativeSelection(creative.id);
            }
          }
        },
      }),
    [
      removeCreativeMutation,
      selectedFolder,
      clientId,
      selectedCreativesIds,
      toggleCreativeSelection,
      config,
    ]
  );
};

export const useAddCreativeToFolder = () => {
  const client = useApolloClient();
  const addCreativeToFolder = useCallback(
    (creative, folderId) => {
      const folder = client.readFragment({
        id: `CreativesFolder:${folderId}`,
        fragment: gql`
          fragment creativeFolderAsset on CreativesFolder {
            assets {
              ...selectedCreativeAsset
            }
          }
          ${SELECTED_CREATIVE_ASSETS_FRAGMENT}
        `,
        fragmentName: 'creativeFolderAsset',
        variables: {daysBack: 30},
      });
      creative.__typename = 'CreativeAsset';
      creative.stats.__typename = 'AssetStats';
      creative.tags.forEach(t => (t.__typename = 'Tag'));
      const assets = [...folder.assets, creative];
      client.writeFragment({
        id: `CreativesFolder:${folderId}`,
        fragment: gql`
          fragment creativeFolderAsset on CreativesFolder {
            __typename
            assets {
              ...selectedCreativeAsset
            }
          }
          ${SELECTED_CREATIVE_ASSETS_FRAGMENT}
        `,
        fragmentName: 'creativeFolderAsset',
        variables: {daysBack: 30},
        data: {assets, __typename: 'CreativesFolder'},
      });
    },
    [client]
  );

  return {addCreativeToFolder};
};

export const useRenameCreative = () => {
  const renameCreativeMutation = useMemoMutation(RENAME_CREATIVE, {}, []);

  return useCallback(
    (creative, newName) =>
      renameCreativeMutation({
        variables: {creativeId: creative.id, newName},
        optimisticResponse: {renameCreative: true},
        update: (cache, {data: {renameCreative}}) => {
          if (renameCreative) {
            cache.writeFragment({
              id: `CreativeAsset:${creative.id}`,
              fragment: gql`
                fragment renameCreative on CreativeAsset {
                  name
                  __typename
                }
              `,
              data: {name: newName, __typename: 'CreativeAsset'},
            });
          }
        },
      }),
    [renameCreativeMutation]
  );
};

export const useUpdateTagsToCreative = () => {
  const updateTagsToCreativeMutation = useMemoMutation(UPDATE_TAGS_TO_CREATIVE, {}, []);

  return useCallback(
    (creative, tags = []) =>
      updateTagsToCreativeMutation({
        variables: {tagIds: tags.map(tag => tag.id), creativeId: creative.id},
        optimisticResponse: {updateTagsToCreative: true},
        update: (cache, {data: {updateTagsToCreative}}) => {
          if (updateTagsToCreative) {
            cache.writeFragment({
              id: `CreativeAsset:${creative.id}`,
              fragment: gql`
                fragment updateTagsToCreative on CreativeAsset {
                  tags {
                    id
                    name
                    __typename
                  }
                  __typename
                }
              `,
              data: {tags, __typename: 'CreativeAsset'},
            });
          }
        },
      }),
    [updateTagsToCreativeMutation]
  );
};

export const useSubmitCallback = (onSubmit, clearCreativeSelection, creativesIds, selectedTab) => {
  const creatives = useSelectedAssetsFromCache(creativesIds, selectedTab);
  return useCallback(
    () => {
      onSubmit(creatives);
      clearCreativeSelection();
    },
    [onSubmit, creatives, clearCreativeSelection]
  );
};
