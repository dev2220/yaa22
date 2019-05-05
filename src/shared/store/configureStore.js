import {applyMiddleware, createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createEpicMiddleware, combineEpics} from 'redux-observable';
import epics from './epics';
import * as reducers from './reducers';

const rootReducer = combineReducers({
  ...reducers,
});

const rootEpic = combineEpics(...epics);

export default function configureStore({history, i18n}) {
  const epicMiddleware = createEpicMiddleware({dependencies: {history, i18n}});

  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));

  epicMiddleware.run(rootEpic);

  return store;
}
