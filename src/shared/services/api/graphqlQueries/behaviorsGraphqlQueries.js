import gql from 'graphql-tag';
import {graphqlQuery} from '../graphqlService';

// for auto-complete
export const searchBehaviors = ({partOfName}) =>
  graphqlQuery(gql`
  {
    searchBehaviors(partOfName: "${partOfName}") {
      id
      name
      size
      description
      numOfPrecedingPaths
      path1
      path2
      path3
      path4
    }
  }
`);

// for 'BROWSE'
export const fetchBehaviors = () =>
  graphqlQuery(gql`
    {
      behaviorsTree {
        root {
          name
          behaviors {
            id
            name
            size
            description
          }
          nestedLevels {
            name
            behaviors {
              id
              name
              size
              description
              numOfPrecedingPaths
              path1
              path2
              path3
              path4
            }
            nestedLevels {
              name
              behaviors {
                id
                name
                size
                description
                numOfPrecedingPaths
                path1
                path2
                path3
                path4
              }
              nestedLevels {
                name
                behaviors {
                  id
                  name
                  size
                  description
                  numOfPrecedingPaths
                  path1
                  path2
                  path3
                  path4
                }
              }
            }
          }
        }
      }
    }
  `);
