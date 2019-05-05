import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import getCookie from 'shared/utils/getCookie';
import {accessTokenCookieName, apiBaseUrl} from 'shared/config';

const httpLink = createHttpLink({
  uri: apiBaseUrl,
});

export const addAuthHeader = (headers = {}) => {
  const token =
    getCookie(accessTokenCookieName) ||
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMDAwMjM0IiwiaWF0IjoxNTUzMDkyOTUzLCJleHAiOjE2MTM1NzI5NTN9.lNtifUX3_51Ct0K0cgmTig-jPHzll3pVZENTeaXEw00';

  return {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
  }
};

const authLink = setContext((_, {headers}) => ({
  headers: addAuthHeader(headers),
}));

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// TODO: Handle any possible error result
const extractErrorMessage = result => result?.message || 'Error calling GraphQL';

export const graphqlQuery = (query, options = {}) =>
  apolloClient
    .query({
      query,
      ...options,
    })
    .then(result => {
      if (result.error) {
        const message = extractErrorMessage(result.error);
        throw new Error(message);
      }

      return Object.keys(result.data).length === 1
        ? result.data[Object.keys(result.data)[0]]
        : result.data;
    })
    .catch(result => {
      // Handle graphql error
      const message = extractErrorMessage(result);
      throw new Error(message);
    });

export const qraphqlMutate = (variables, mutation) =>
  apolloClient
    .mutate({
      variables,
      mutation,
    })
    .then(result => {
      if (result.error) {
        const message = extractErrorMessage(result.error);
        throw new Error(message);
      }

      return Object.keys(result.data).length === 1
        ? result.data[Object.keys(result.data)[0]]
        : result.data;
    })
    .catch(result => {
      // Handle graphql error
      const message = extractErrorMessage(result);
      throw new Error(message);
    });
