import {ofType} from 'redux-observable';
import {get, set} from 'lodash';
import {map, mergeMap} from 'rxjs/operators';
import {defaultCreateLine} from 'shared/utils/variation';
import {ALL} from 'shared/constants/genderOptions';
import {
  getKeys,
  isExistOrSingleOptionDefault,
  firstOptionDefault,
  lastOptionDefault,
} from './utils';
import {
  availableChannelsSelector,
  availableOffersSelector,
  availableAccountsSelector,
  availableObjectivesSelector,
  availableTargetedMobileOSsSelector,
  availableOsVersionsSelector,
  defaultMobileDevicesSelector,
  hasMoreThanOneCaLalSelector,
  availableAgesSelector,
  budgetTypeSelector,
  availableCBOBidStrategiesSelector,
  isCboSelector,
  selectedOptimizationGoalSelector,
  customAudiencesSelector,
  interestsListsSelector,
  availableBidStrategiesSelector,
  availableAttributionWindowsSelector,
  availableRelevantOptimizationGoalIdsToBeUsedAsChargeEventSelector,
} from '../selectors';
import * as actions from '../actions';
import {AUTOMATIC_PLACEMENTS_MODE} from '../../constants/placementsModes';
import {
  BUDGET_TYPE_DAILY,
  BUDGET_TYPE_LIFETIME,
  budgetAndScheduling,
} from '../../constants/budgetTypes';
import {BID_STRATEGY_LOWEST_COST_WITH_CAP_ID} from '../../constants/bidStrategies';
import {FACEBOOK_OPTIMIZATION_GOAL_ID_APP_INSTALL} from '../../constants/optimizationGoals';

const propsToCompare = [
  {prop: 'clientId', dependentProps: ['channelId']},
  {
    prop: 'channelId',
    dependentProps: [
      'offerId',
      'objectiveId',
      'targeting.placements',
      'targeting.genderVariations.includes',
      'targeting.agesVariations.includes',
      'optimizationAndBidding.optimizationGoalId',
    ],
    getDefault: isExistOrSingleOptionDefault(availableChannelsSelector),
  },
  {
    prop: 'offerId',
    dependentProps: ['accountId', 'targeting.mobileOSId', 'campaignId'],
    getDefault: isExistOrSingleOptionDefault(availableOffersSelector),
  },
  {
    prop: 'accountId',
    dependentProps: ['campaignId'],
    getDefault: isExistOrSingleOptionDefault(availableAccountsSelector),
  },
  {
    prop: 'objectiveId',
    dependentProps: ['targeting.placements', 'campaignId'],
    getDefault: firstOptionDefault(availableObjectivesSelector, 'id'),
  },
  {prop: 'campaignId', getDefault: () => null},
  {
    prop: 'targeting.mobileOSId',
    dependentProps: [
      'targeting.mobileOSVersion.min',
      'targeting.mobileOSVersion.max',
      'targeting.mobileDevicesVariations.includes',
      'targeting.mobileDevicesVariations.excludes',
    ],
    getDefault: isExistOrSingleOptionDefault(availableTargetedMobileOSsSelector),
  },
  {
    prop: 'targeting.mobileOSVersion.min',
    getDefault: firstOptionDefault(availableOsVersionsSelector),
  },
  {
    prop: 'targeting.mobileOSVersion.max',
    getDefault: lastOptionDefault(availableOsVersionsSelector),
  },
  {
    prop: 'targeting.mobileDevicesVariations.includes',
    getDefault: defaultMobileDevicesSelector,
  },
  {
    prop: 'targeting.mobileDevicesVariations.excludes',
    getDefault: () => [],
  },
  {
    prop: 'targeting.placements',
    getDefault: () => ({
      mode: AUTOMATIC_PLACEMENTS_MODE,
      placementIds: [],
    }),
  },
  {
    prop: 'targeting.genderVariations.includes',
    getDefault: () => [defaultCreateLine({value: ALL})],
  },
  {
    prop: 'targeting.agesVariations.includes',
    getDefault: state => {
      const ages = availableAgesSelector(state);
      return [
        defaultCreateLine({
          value: {min: '18', max: ages[ages.length - 1]},
        }),
      ];
    },
  },
  {
    prop: 'targeting.interestsLists.variations.includes',
    dependentProps: [
      'targeting.interestsLists.isIntersect',
      'targeting.interestsLists.shouldAddEmptyVariation',
    ],
  },
  {
    prop: 'targeting.interestsLists.isIntersect',
    getDefault: (state, value) => {
      const interestsLists = interestsListsSelector(state);
      return interestsLists.variations?.includes.some(i => i?.value?.length > 1) ? value : false;
    },
  },
  {
    prop: 'targeting.interestsLists.shouldAddEmptyVariation',
    getDefault: (state, value) => {
      const interestsLists = interestsListsSelector(state);
      return interestsLists.variations?.includes.some(i => i?.value?.length > 0) ? value : false;
    },
  },
  {
    prop: 'targeting.customAudiences.variations.includes',
    dependentProps: [
      'targeting.customAudiences.isIntersect',
      'targeting.customAudiences.shouldAddEmptyVariation',
    ],
  },
  {
    prop: 'targeting.customAudiences.shouldAddEmptyVariation',
    getDefault: (state, value) => {
      const audiences = customAudiencesSelector(state);
      return audiences.variations.includes?.some(item => item?.value?.length > 0) ? value : false;
    },
  },
  {
    prop: 'targeting.customAudiences.isIntersect',
    getDefault: (state, value) => (hasMoreThanOneCaLalSelector(state) ? value : false),
  },
  {
    prop: 'budgetAndScheduling.budgetType',
    dependentProps: ['budgetAndScheduling.scheduling', 'budgetAndScheduling.budgetValue'],
    getDefault: (state, value) => {
      const isCBO = isCboSelector(state);
      return isCBO ? BUDGET_TYPE_DAILY : value;
    },
  },
  {
    prop: 'budgetAndScheduling.budgetValue',
    getDefault: () => null,
  },
  {
    prop: 'budgetAndScheduling.scheduling',
    getDefault: state => {
      const budgetType = budgetTypeSelector(state);
      if (budgetType === BUDGET_TYPE_LIFETIME) {
        return budgetAndScheduling();
      }
      return null;
    },
  },
  {
    prop: 'budgetAndScheduling.scheduling.startDateTime',
    dependentProps: ['budgetAndScheduling.scheduling.endDateTime'],
    getDefault: (state, value) => {
      if (state.recipe.budgetAndScheduling.scheduling.endDateTime < value) {
        return state.recipe.budgetAndScheduling.scheduling.endDateTime;
      }
      return value;
    },
  },
  {
    prop: 'budgetAndScheduling.scheduling.endDateTime',
    dependentProps: ['budgetAndScheduling.scheduling.startDateTime'],
    getDefault: (state, value) => {
      if (state.recipe.budgetAndScheduling.scheduling.startDateTime > value) {
        return state.recipe.budgetAndScheduling.scheduling.startDateTime;
      }
      return value;
    },
  },
  {
    prop: 'budgetAndScheduling.isCBO',
    dependentProps: [
      'optimizationAndBidding.bidStrategyId',
      'budgetAndScheduling.budgetType',
      'budgetAndScheduling.budgetValue',
      'campaignId',
    ],
  },
  {
    prop: 'optimizationAndBidding.bidStrategyId',
    dependentProps: [
      'optimizationAndBidding.bidValue',
      'optimizationAndBidding.isAcceleratedDelivery',
      'campaignId',
    ],
    getDefault: state => {
      const isCBO = isCboSelector(state);
      const strategies = isCBO
        ? availableCBOBidStrategiesSelector(state)
        : availableBidStrategiesSelector(state);
      return strategies[0]?.id;
    },
  },
  {
    prop: 'optimizationAndBidding.isAcceleratedDelivery',
    getDefault: (state, value) =>
      state.recipe.optimizationAndBidding.bidStrategyId !== BID_STRATEGY_LOWEST_COST_WITH_CAP_ID
        ? false
        : value,
  },
  {
    prop: 'optimizationAndBidding.optimizationGoalId',
    getDefault: () => FACEBOOK_OPTIMIZATION_GOAL_ID_APP_INSTALL,
    dependentProps: [
      'optimizationAndBidding.appEventId',
      'optimizationAndBidding.optimizationGoalIdForCharge',
      'optimizationAndBidding.attributionWindow',
      'optimizationAndBidding.bidValue',
      'optimizationAndBidding.bidStrategyId',
    ],
  },
  {
    prop: 'optimizationAndBidding.appEventId',
    getDefault: (state, value) => {
      const optimizationGoalId = selectedOptimizationGoalSelector(state);
      return optimizationGoalId === '0' ? value : null;
    },
  },
  {
    prop: 'optimizationAndBidding.optimizationGoalIdForCharge',
    getDefault: state => {
      const options = availableRelevantOptimizationGoalIdsToBeUsedAsChargeEventSelector(state);
      return options[0]?.id;
    },
  },
  {
    prop: 'optimizationAndBidding.attributionWindow',
    getDefault: state => {
      const options = availableAttributionWindowsSelector(state);
      return options[0] || null;
    },
  },
  {
    prop: 'optimizationAndBidding.bidValue',
    getDefault: () => null,
  },
];

export const validateRecipe = (action$, state$) =>
  action$.pipe(
    ofType(actions.setRecipeFields.TYPE),
    mergeMap(({payload}) => {
      const setActions = [];
      const propsToCheck = getKeys(payload);
      propsToCheck.forEach(propToCheck => {
        if (propToCheck) {
          const propToCompare = propsToCompare.find(({prop}) => prop === propToCheck);
          const propsToValidate = propToCompare?.dependentProps?.map(prop =>
            propsToCompare.find(propToValidate => prop === propToValidate.prop)
          );

          if (propsToValidate?.length) {
            propsToValidate.forEach(({prop, getDefault}) => {
              const currentValue = get(state$.value.recipe, prop);
              const defaultValue = getDefault(state$.value, currentValue);
              if (currentValue !== defaultValue) {
                setActions.push(actions.setRecipeFields(set({}, prop, defaultValue)));
              }
            });
          }
        }
      });
      return setActions;
    })
  );

export const onFetchClient = action$ =>
  action$.pipe(
    ofType(actions.fetchClientById.success.TYPE),
    map(({payload}) =>
      actions.setRecipeFields({
        clientId: payload.id,
      })
    )
  );
