import {makeAsyncReducer, makeReducer, composeReducers} from 'redux-toolbelt';
import {mergeDeepWithOutConcatingArrays} from '../utils';
import {defaultCreateLine} from '../utils/variation';
import * as actions from './actions';
import {BUDGET_TYPE_DAILY} from '../constants/budgetTypes';
import {DIVISION_STRATEGY_ALL_TO_ALL} from '../constants/divisionStrategies';
import {CALL_TO_ACTION_INSTALL_MOBILE_APP} from '../constants/callToActionTypes';
/** Regular Reducers */
// TODO: this reducer below should be used instead of the logic in CreationPage.js
export const operationType = makeReducer(
  actions.setOperationType,
  (state, action) => action.payload,
  {defaultState: null}
);

const recipeInitialState = {
  clientId: null,
  channelId: null,
  offerId: null,
  accountId: null,
  campaignId: null,
  objectiveId: null,
  targeting: {
    mobileOSId: null,
    mobileOSVersion: {
      min: null,
      max: null,
    },
    mobileDevicesVariations: {
      includes: [],
      excludes: [],
    },
    locationsVariations: {includes: [], excludes: []},
    isOnlyConnectedToWifi: false,
    placements: null,
    excludedContentCategories: [],
    genderVariations: {includes: [], excludes: []},
    agesVariations: {includes: [], excludes: []},
    languageIds: [],
    customAudiences: {
      variations: {includes: [], excludes: []},
      isIntersect: false,
      shouldAddEmptyVariation: false,
    },
    peopleWhoAreConnectedToVariations: {includes: [defaultCreateLine({value: []})], excludes: []},
    friendsOfPeopleWhoAreConnectedTo: [],
    interestsLists: {
      variations: {includes: [], excludes: []},
      isIntersect: false,
      isExpand: true,
      shouldAddEmptyVariation: false,
    },
    behaviorsVariations: {includes: [], excludes: []},
    broadCategoriesVariations: {includes: [], excludes: []},
    jobTitles: [],
    educationCategoryId: null,
    relationshipStatusesVariations: {includes: [], excludes: []},
  },
  budgetAndScheduling: {
    isCBO: false,
    budgetType: BUDGET_TYPE_DAILY,
    budgetValue: null,
    scheduling: null,
  },
  optimizationAndBidding: {
    optimizationGoalId: null,
    appEventId: null,
    optimizationGoalIdForCharge: null,
    attributionWindow: null,
    bidStrategyId: null,
    bidValue: null,
    isAcceleratedDelivery: false,
  },
  creativeSpec: {
    divisionStrategy: DIVISION_STRATEGY_ALL_TO_ALL,
    callToActionType: CALL_TO_ACTION_INSTALL_MOBILE_APP,
    videoBundles: [],
    imageBundles: [],
  },
  // promoted object
  // TODO: [nadav] remove if redundant (or change to targeted entity type?)
  // TODO: currently it is not been used
  targetedEntity: {
    targetedAppId: null,
  },
};

export const recipe = makeReducer(
  actions.setRecipeFields,
  (state, {payload, meta}) =>
    mergeDeepWithOutConcatingArrays({objects: [state, payload], override: meta?.override}),
  {defaultState: recipeInitialState}
);

/** Async Reducers */
export const client = makeAsyncReducer(actions.fetchClientById, {
  shouldDestroyData: false,
  defaultData: {},
});

export const currentStep = makeReducer(actions.setStep, (state, {payload}) => payload, {
  defaultState: 0,
});

export const pageErrors = makeReducer(
  actions.setPageErrors,
  (state, {payload, meta}) =>
    mergeDeepWithOutConcatingArrays({objects: [state, payload], override: meta?.override}),
  {defaultState: []}
);

export const activeSubSection = makeReducer(
  actions.setActiveSubSection,
  (state, {payload}) => payload,
  {defaultState: 0}
);

export const modalManager = makeReducer(
  {
    [actions.closeModal]: () => null,
    [actions.openModal]: (state, {payload}) => payload,
  },
  {defaultState: null}
);

export const creativesMetadata = makeReducer(
  actions.setCreativesMetadata,
  (state, {payload}) => ({...state, ...payload}),
  {defaultState: {}}
);

export const launchRecipe = composeReducers(
  makeAsyncReducer(actions.launchRecipe),
  makeReducer(actions.resetLaunchRecipe, () => ({loading: false}))
);
