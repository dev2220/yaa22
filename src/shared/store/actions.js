import {makeActionCreator, makeAsyncActionCreator} from 'redux-toolbelt';

/** Async Actions */
export const fetchClientById = makeAsyncActionCreator('FETCH_CLIENT_BY_ID');

/** Regular Actions */
export const setOperationType = makeActionCreator('SET_OPERATION_TYPE');
export const setRecipeFields = makeActionCreator('SET_RECIPE_FIELDS');
export const setStep = makeActionCreator('SET_STEP');
export const setActiveSubSection = makeActionCreator('SET_ACTIVE_SUB_SECTION');

export const openModal = makeActionCreator('OPEN_MODAL');
export const closeModal = makeActionCreator('CLOSE_MODAL');

export const setCreativesMetadata = makeActionCreator('SET_CREATIVES_METADATA');

export const setPageErrors = makeActionCreator('SET_PAGE_ERRORS');

export const launchRecipe = makeAsyncActionCreator('LAUNCH_RECIPE');

export const resetLaunchRecipe = makeActionCreator('RESET_LAUNCH_RECIPE');
