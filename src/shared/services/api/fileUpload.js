import {apiBaseUrl} from 'shared/config';
import {addAuthHeader} from './graphqlService';

export const fileUpload = (formData) => {
  const headers = addAuthHeader();

  return fetch(`${apiBaseUrl}/../upload`, {
    method: 'post',
    body: formData,
    headers,
  })
};
