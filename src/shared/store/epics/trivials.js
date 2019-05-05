import {makeAsyncEpic} from 'redux-toolbelt-observable';
import * as api from 'shared/services/api';
import * as actions from '../actions';

const trivials = [].map(name => makeAsyncEpic(actions[name], api[name]));

export default trivials;
