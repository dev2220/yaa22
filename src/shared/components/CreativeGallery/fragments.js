import gql from 'graphql-tag';

export const SELECTED_CREATIVE_ASSETS_FRAGMENT = gql`
  fragment selectedCreativeAsset on CreativeAsset {
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
`;

export const SELECTED_CREATIVE_FOLDER_FRAGMENT = gql`
  fragment selectedCrativesFolder on CreativesFolder {
    id
    name
    createdTime
    assets {
      ...selectedCreativeAsset
    }
  }
  ${SELECTED_CREATIVE_ASSETS_FRAGMENT}
`;

export const SELECTED_TEXT_ASSET_FRAGMENT = gql`
  fragment selectedTextsAsset on TextAsset {
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
`;

export const SELECTED_TEXT_FOLDER_FRAGMENT = gql`
  fragment selectedTextsFolder on TextsFolder {
    id
    name
    createdTime
    assets {
      ...selectedTextsAsset
    }
  }
  ${SELECTED_TEXT_ASSET_FRAGMENT}
`;
