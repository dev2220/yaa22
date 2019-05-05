export const serverHost =
  process.env.SERVER_HOST || `${window.location.protocol}//${window.location.host}`;

export const accessTokenCookieName = process.env.ACCESS_TOKEN_COOKIE_NAME || 'xs';

export const isProd = process.env.IS_PROD || process.env.NODE_ENV === 'production' || false;

export const apiBaseUrl = getApiBaseUrl();

function getApiBaseUrl() {
  if (isProd) {
    return `${serverHost}/creation/api`;
  } else {
    return process.env.API_BASE_URL || 'http://creation.bidalgo.com/api';
  }
}
