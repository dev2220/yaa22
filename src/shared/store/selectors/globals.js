import {createSelector} from 'reselect';

export const clientSelector = state => state?.client?.data;

export const recipeSelector = state => state.recipe;

export const campaignSelector = createSelector([recipeSelector], recipe => recipe.campaignId);

export const targetingSelector = createSelector([recipeSelector], recipe => recipe.targeting);

export const clientAccountsSelector = createSelector(clientSelector, client => client?.accounts);

export const budgetAndSchedulingSelector = createSelector(
  [recipeSelector],
  recipe => recipe.budgetAndScheduling
);

export const cboSelector = createSelector([recipeSelector], recipe => recipe.cbo);

export const selectedChannelIdSelector = createSelector(
  [recipeSelector],
  recipe => recipe.channelId
);

export const selectedOfferIdSelector = createSelector([recipeSelector], recipe => recipe.offerId);

export const selectedClientIdSelector = createSelector([recipeSelector], recipe => recipe.clientId);

export const selectedAccountIdSelector = createSelector(
  [recipeSelector],
  recipe => recipe.accountId
);

export const selectedObjectiveIdSelector = createSelector(
  [recipeSelector],
  recipe => recipe.objectiveId
);

export const selectedMobileOSId = createSelector(
  [targetingSelector],
  targeting => targeting.mobileOSId
);

export const selectedLanguageIds = createSelector(
  [targetingSelector],
  targeting => targeting.languageIds
);

// export const accountCurrencySelector = createSelector(
//   [selectedAccountSelector],
//   selectedAccount => selectedAccount?.currency
// );
