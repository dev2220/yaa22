import gql from 'graphql-tag';
import {graphqlQuery, qraphqlMutate} from '../graphqlService';

export const FETCH_CREATIVES_FOLDERS_QUERY = gql`
  query getCreativesFolders($clientId: Int!, $daysBack: Int = 30) {
    creativesFolders(clientId: $clientId) {
      id
      name
      createdTime
      assets {
        id
        name
        type
        createdTime
        url
        thumbnailUrl
        width
        height
        dimensions
        fileSizeInKB
        videoLengthInSeconds
        tags {
          id
          name
        }
        stats(daysBack: $daysBack) {
          impressions
          clicks
          installs
          payers
          mediaSpend
          ctr
          cr
          eCVR
          cpa
          roas
          payersRate
        }
      }
    }
  }
`;

/**
 input should look like this:
 {
  "name": "MyNewFolder",
  "offerId": 3124
 }
 */
export const CREATE_NEW_CREATIVES_FOLDER_QUERY = gql`
  mutation CreateNewCreativesFolder($name: String!, $offerId: ID!) {
    createNewCreativesFolder(name: $name, offerId: $offerId) {
      id
      name
      createdTime
    }
  }
`;

/**
 Endpoint for Rename Folder

 input should look like this:
 {
  "folderId": 10372,
  "newName": "RenamedFolder"
 }
 */
export const RENAME_FOLDER_QUERY = gql`
  mutation RenameFolder($folderId: ID!, $newName: String!) {
    renameFolder(folderId: $folderId, newName: $newName)
  }
`;

/**
 Endpoint for Delete Folder

 input should look like this:
 {
  "folderId": 13325
 }
 */
export const DELETE_FOLDER_QUERY = gql`
  mutation DeleteFolder($folderId: ID!) {
    deleteFolder(folderId: $folderId)
  }
`;

/**
 Endpoint for Rename Creative

 input should look like this:
 {
  "creativeId": 108323,
  "newName": "RenamedCreative"
 }
 */
export const RENAME_CREATIVE = gql`
  mutation RenameCreative($creativeId: ID!, $newName: String!) {
    renameCreative(creativeId: $creativeId, newName: $newName)
  }
`;

/**
 Endpoint for Remove Creative(s) from folder.

 input should look like this:
  {
    "folderId": 4242,
    "creativeIds": [1,2,3]
  }
 */
export const REMOVE_CREATIVE_FROM_FOLDER = gql`
  mutation RemoveCreativesFromFolder($folderId: ID!, $creativeIds: [ID!]!) {
    removeCreativesFromFolder(folderId: $folderId, creativeIds: $creativeIds)
  }
`;

/**
 input should look like this:
  {
    "targetFolderId": 4242,
    "creativeIds": [1,2,3]
  }
 */
export const copyCreativesToFolder = copyCreativesInput =>
  qraphqlMutate(
    copyCreativesInput,
    gql`
      mutation CopyCreativesToFolder($targetFolderId: ID!, $creativeIds: [ID!]!) {
        copyCreativesToFolder(folderId: $targetFolderId, creativeIds: $creativeIds)
      }
    `
  );

/**
 Endpoint for Remove Tag from Creative

 input should look like this:
  {
    "tagId": 422,
    "creativeId": 34564
  }
 */
export const removeTagFromCreative = removeTagInput =>
  qraphqlMutate(
    removeTagInput,
    gql`
      mutation RemoveTagFromCreative($tagId: ID!, $creativeId: ID!) {
        removeTagFromCreative(tagId: $tagId, creativeId: $creativeId)
      }
    `
  );

/**
 Endpoint for Update tags for certain Creative (including add / remove)

 input should look like this:
 {
    "tagIds": [422, 234, 2344],
    "creativeId": 22
  }
 */
export const UPDATE_TAGS_TO_CREATIVE = gql`
  mutation updateTagsToCreative($tagIds: [ID!]!, $creativeId: ID!) {
    updateTagsToCreative(tagIds: $tagIds, creativeId: $creativeId)
  }
`;

/**
 input should look like this:
 {
    "name": "blabla"
 }
 */
export const CREATE_TAG = gql`
  mutation CreateTag($name: String!) {
    createTag(name: $name) {
      id
      name
    }
  }
`;

/**
 * Endpoint for searching tags for autocomplete
 */
export const SEARCH_TAGS_QUERY = gql`
  query SearchTags($partOfName: String!) {
    searchTags(partOfName: $partOfName) {
      id
      name
    }
  }
`;

export const FETCH_TEXTS_FOLDERS_QUERY = gql`
  query getTextsFolders($clientId: Int!, $daysBack: Int = 30) {
    textsFolders(clientId: $clientId) {
      id
      name
      createdTime
      assets {
        id
        headline
        text
        createdTime
        stats(daysBack: $daysBack) {
          impressions
          clicks
          installs
          payers
          mediaSpend
          ctr
          cr
          eCVR
          cpa
          roas
          payersRate
        }
        tags {
          id
          name
        }
      }
    }
  }
`;

/**
 Endpoint for Create New Texts Folder

 input should look like this:
 {
  "name": "MyNewFolder",
  "offerId": 3124
 }
 */
export const CREATE_NEW_TEXTS_FOLDER_QUERY = gql`
  mutation CreateNewTextsFolder($name: String!, $offerId: ID!) {
    createNewTextsFolder(name: $name, offerId: $offerId) {
      id
      name
      createdTime
    }
  }
`;

/**
 Endpoint for Remove Text(s) from folder.

 input should look like this:
 {
    "folderId": 4242,
    "textIds": [1,2,3]
  }
 */
export const REMOVE_TEXTS_FROM_FOLDER = gql`
  mutation RemoveTextsFromFolder($folderId: ID!, $textIds: [ID!]!) {
    removeTextsFromFolder(folderId: $folderId, textIds: $textIds)
  }
`;

/**
 input should look like this:
 {
    "tagIds": [422, 234, 2344],
    "creativeIds": [1,2,3]
  }
 */
export const addTagsToCreatives = addTagsInput =>
  qraphqlMutate(
    addTagsInput,
    gql`
      mutation AddTagsToCreatives($tagIds: [ID!]!, $creativeIds: [ID!]!) {
        addTagsToCreatives(tagIds: $tagIds, creativeIds: $creativeIds)
      }
    `
  );
