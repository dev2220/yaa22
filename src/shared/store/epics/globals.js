import {map, filter} from 'rxjs/operators';
import {showSnack} from 'react-redux-snackbar';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import escapeRegexp from 'escape-string-regexp';
import {
  ACTION_ASYNC_REQUEST_SUFFIX,
  ACTION_ASYNC_FAILURE_SUFFIX,
  ACTION_ASYNC_SUCCESS_SUFFIX,
} from 'redux-toolbelt';

const errorMessageTimeout = 5000;

const getErrorMessagePrefix = i18n => i18n.getFixedT(null, 'errors')('errorMessagePrefix');

const makeSufixesEpic = (suffixes, metaPredicate, mapper) => (action$, state$, dependencies) => {
  const regex = new RegExp(suffixes.map(e => `(${escapeRegexp(e)}$)`).join('|'));
  return action$.pipe(
    filter(({meta}) => !meta || !metaPredicate(meta)),
    map(action => ({...action, typePrefix: action.type.replace(regex, '')})),
    filter(({type, typePrefix}) => typePrefix !== type),
    map(action => mapper(action, state$, dependencies))
  );
};

export const globalErrorHandlingInAsyncRequests = makeSufixesEpic(
  [ACTION_ASYNC_FAILURE_SUFFIX],
  meta => meta.shouldIgnoreGlobalError,
  ({payload, typePrefix}, _, {i18n}) =>
    showSnack(Date.now(), {
      label: `${getErrorMessagePrefix(i18n)} ${typePrefix}. ${payload.message}\u200e`,
      timeout: errorMessageTimeout,
    })
);

export const showLoadingDuringAsyncRequests = makeSufixesEpic(
  [ACTION_ASYNC_REQUEST_SUFFIX],
  meta => meta.shouldIgnoreGlobalLoading,
  () => showLoading()
);

export const hideLoadingAfterAsyncRequests = makeSufixesEpic(
  [ACTION_ASYNC_SUCCESS_SUFFIX, ACTION_ASYNC_FAILURE_SUFFIX],
  meta => meta.shouldIgnoreGlobalLoading,
  () => hideLoading()
);
