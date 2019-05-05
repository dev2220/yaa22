import {makeAsyncEpic} from 'redux-toolbelt-observable';
import * as api from 'shared/services/api';
import * as actions from '../actions';

const queries = ['fetchClientById', 'launchRecipe'].map(name =>
  makeAsyncEpic(actions[name], api[name])
);

export default queries;
