import gql from 'graphql-tag';
import {graphqlQuery, qraphqlMutate} from '../graphqlService';

export const fetchClientById = clientId =>
  graphqlQuery(
    gql`
  {
    clientById(id: ${clientId}) {
      id
      name
      accounts {
        id
        name
        timezone
        currency
        pages {
          id
          name
        }
        apps {
          id
          name
        }
        broadCategoriesCollections {
          id
          name
          broadCategories {
            id
            name
            collectionName
            size
            description
          }
        }
      }
      channels {
        id
        name
        objectives {
          id
          name
        }
        placementGroups {
          id
          name
          placements {
            id
            name
            isRelevantForAssetCustomization
            requiredPlacementIdsToComeWith
            forbiddenPlacementIdsToComeWith
            relevantForObjectiveIds
          }
        }
        contentCategories {
          id
          name
          requiredPlacementIdsToComeWith
        }
        agesToTarget
        languages {
          id
          name
        }
        cboBidStrategies {
          id
          name
          bidType {
            id
            name
            minValue
            measurementUnit
          }
        }
        locationTypes {
          type
          defaultRadius
        }
        relationshipStatuses {
          id
          name
        }
        educationCategories {
          id
          name
        }
        optimizationGoals {
          id
          name
          additionalLabelWhenRepresentedAsChargeEvent
          relevantForObjectiveIds
          relevantOptimizationGoalIdsToBeUsedAsChargeEvent
          attributionWindows
          bidStrategies {
            id
            name
            bidType {
              id
              name
              measurementUnit
              minValue
            }
          }
        }
        appEvents {
          id
          name
        }
        callToActionTypes {
          id
          name
          relevantForObjectiveIds
        }
      }
      offers {
        id
        name
        channel {
          id
        }
        accounts {
          id
          name
        }
        targetedPage {
          id
          name
          iconUrl
        }
        targetedApp {
          id
          name
          iconUrl
        }
        targetedMobileOSs{
          id
          name
          versions
          defaultMobileDevices {
            id
            name
          }
        }
      }
      interestsCategories {
        id
        name
      }
    }
  }`,
    {fetchPolicy: 'no-cache'}
  );

/**
 * // TODO [nadav] change name to searchMobileDevices
 *
 * @param channelId
 * @param mobileOSId 'iOS' or 'Android'
 * @param partOfName part of the name of the device (the api supports auto-completion)
 * @returns {{query}}
 */
export const fetchMobileDevices = ({channelId, mobileOSId, partOfName = ''}) =>
  graphqlQuery(gql`
  {
    mobileDevices(channelId: ${channelId}, mobileOS: "${mobileOSId}", partOfName:"${partOfName}") {
      id,
      name
    }
  }
`);

// TODO [nadav] change name to searchLocations
export const fetchLocations = ({type, accountId, partOfName}) =>
  graphqlQuery(gql`
  {
    locations(type: ${type}, accountId: ${accountId}, partOfName: "${partOfName}") {
      id
      name
    }
  }
`);

export const searchCustomAudiences = ({accountId, partOfName}) =>
  graphqlQuery(gql`
  {
    searchCustomAudiences(accountId: ${accountId}, partOfName: "${partOfName}") {
      id
      name
      type
      subType
      size
      status
      creationDate
      lastUpdate
      ratio
      country {
        id
        name
      }
      stats {
        clicks
        cr
        ctr
        payersRate
      }
    }
  }
`);

export const searchJobTitles = ({accountId, partOfName}) =>
  graphqlQuery(gql`
  {
    searchJobTitles(accountId: ${accountId}, partOfName: "${partOfName}") {
      id
      name
      size
    }
  }
`);

/**
 LookalikeInput should look like this:
    {
      "customAudienceId": 444,        // [mandatory]
      "name": "NewLookalikeName",     // [mandatory]
      "countryId": "US",              // [mandatory]
      "ratioPercentage": 15           // [mandatory]
      "allowInternational": true      // [optional]
    }
 */
export const createLookalike = lookalikeInput =>
  qraphqlMutate(
    {lookalikeInput},
    gql`
      mutation CreateLookalike($lookalikeInput: LookalikeInput!) {
        createLookalike(lookalikeInput: $lookalikeInput) {
          id
          name
          type
          subType
          size
          status
          creationDate
          lastUpdate
          ratio
          country {
            id
            name
          }
          stats {
            clicks
            cr
            ctr
            payersRate
          }
        }
      }
    `
  );

/**
 launchRecipe input should look like this:
 
   {
    "recipeJsonInput": "{
                         \"clientId\": 274,
                         \"offerId\": 3125,
                         \"accountId\": 29,
                         \"channelId\": 29,
                          ...and all the rest of the recipe object as stringified"
                        }"
   }
 */
export const launchRecipe = recipeStringifiedJson =>
  qraphqlMutate(
    {recipeJsonInput: recipeStringifiedJson},
    gql`
      mutation LaunchRecipe($recipeJsonInput: String!) {
        launchRecipe(recipeJsonInput: $recipeJsonInput) {
          status
          message
          adsetsIdsInChannel
        }
      }
    `
  );
