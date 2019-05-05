import gql from 'graphql-tag';
import {graphqlQuery, qraphqlMutate} from '../graphqlService';

export const fetchInterestsListsByCategory = ({clientId, categoryName}) =>
  graphqlQuery(gql`
    {
      interestsListsByCategory(clientId: ${clientId}, categoryName: "${categoryName}") {
        id
        name
        numOfInterests
      }
    }
`);

export const fetchInterestsListById = interestListId =>
  graphqlQuery(gql`
    {
      interestsListById(id: ${interestListId}) {
        interests {
          id
          name
          size
        }
      }
    }  
`);

export const searchInterestsLists = ({clientId, partOfName}) =>
  graphqlQuery(gql`
    {
      searchInterestsLists(clientId: ${clientId}, partOfName: "${partOfName}") {
        id  
        name
        categoryName
        numOfInterests
    }
  }
`);

export const searchInterests = ({accountId, partOfName}) =>
  graphqlQuery(gql`
    {
      searchInterests(accountId: ${accountId}, partOfName: "${partOfName}") {
        id
        name
        size
      }
    }
`);

/**
 selectedInterests variable should look like:
    {
      "selectedInterests": ["Code", "Poker"]
    }
 */
export const suggestedInterests = ({accountId, selectedInterests}) =>
  graphqlQuery(gql`
    {
      suggestedInterests(accountId: ${accountId}, selectedInterests: ${selectedInterests}) {
        id
        name
        size
      }
    }
  `);

/**
 interestsListInput should look like this:
    {
      "interestsListInput": {
        "selectedInterestsJsonString": "[
           {
             \"id\": 6003347596674,
             \"name\": \"Nadav\",
             \"size\": 3780
           }
        ]"
        "name": "NewListName",
        "categoryName": "SelectedCategoryName",
        "clientId": 274
		}
},
 */
export const createInterestsList = interestsListInput =>
  qraphqlMutate(
    {interestsListInput},
    gql`
      mutation CreateInterestList($interestsListInput: InterestsListInput!) {
        createInterestsList(interestsListInput: $interestsListInput) {
          id
          name
          numOfInterests
        }
      }
    `
  );
