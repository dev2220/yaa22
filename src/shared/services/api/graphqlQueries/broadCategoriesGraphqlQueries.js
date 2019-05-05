import gql from 'graphql-tag';
import {graphqlQuery} from '../graphqlService';

// for auto-complete
export const searchBroadCategories = ({accountId, partOfName}) =>
  graphqlQuery(gql`
  {
    searchBroadCategories(accountId: ${accountId}, partOfName: "${partOfName}") {
      id
      name
      collectionName
      size
      description
    }
  }
`);
