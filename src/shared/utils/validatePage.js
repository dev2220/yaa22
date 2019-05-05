import {OFFERS_AND_CAMAPIGNS_STEP, AD_SETS_STEP} from 'shared/constants/general';
import {AUTOMATIC_PLACEMENTS_MODE} from 'shared/constants/placementsModes';
import {BID_STRATEGY_LOWEST_COST_ID} from 'shared/constants/bidStrategies';
import {FACEBOOK_OPTIMIZATION_GOAL_ID_APP_EVENTS} from 'shared/constants/optimizationGoals';

const mandatoryFields = {
  offer: [
    {name: 'offerId', errorMsg: 'Select an offer', type: 'emptyValue'},
    {name: 'accountId', errorMsg: 'Select an Offer Account', type: 'emptyValue'},
    {name: 'budget', errorMsg: 'Enter budget value', type: 'cboBudget'},
    {name: 'campaignId', errorMsg: 'Fill in Campaign Association', type: 'emptyValue'},
  ],
  adset: [
    {
      targeting: [
        {
          name: 'mobileDevicesVariations',
          propToCheck: 'includes',
          type: 'includes',
          errorMsg: 'Select a device',
        },
        {
          name: 'placements',
          propToCheck: 'placementIds',
          type: 'placements',
          errorMsg: 'Select At least one placement',
        },
        {
          name: 'locationsVariations',
          type: 'location',
          errorMsg: 'Select a location/custom audience',
        },
      ],
      budgetAndScheduling: [{name: 'budgetValue', errorMsg: 'Enter budget value'}],
      optimizationAndBidding: [
        {name: 'bidValue', type: 'bid', errorMsg: 'Enter Bid Cap value'},
        {name: 'appEventId', type: 'appEventId', errorMsg: 'Enter App Event type'},
      ],
    },
  ],
};

export const isVariationArrayHasValue = items => {
  let hasValue = false;
  items.forEach(({value}) => {
    if (value?.length) {
      hasValue = true;
    }
  });

  return hasValue;
};

export const isValidToAdvanceStep = (currentStep, recipe) => {
  switch (currentStep) {
    case OFFERS_AND_CAMAPIGNS_STEP:
      return validateOfferLevel(recipe);
    case AD_SETS_STEP:
      return validateAdsetLevel(recipe);
    default:
      break;
  }
};

const validateOfferLevel = recipe => {
  const errorFields = [];
  const offerMandatoryFields = mandatoryFields.offer;
  offerMandatoryFields.forEach(field => {
    const {name, type, errorMsg} = field;
    switch (type) {
      case 'emptyValue':
        if (!recipe[name]) {
          errorFields.push(errorMsg);
        }
        break;

      case 'cboBudget':
        const {isCBO, budgetValue} = recipe.budgetAndScheduling;
        const isCBOValid = isCBO ? isCBO && budgetValue : true;
        if (!isCBOValid) {
          errorFields.push(errorMsg);
        }
        break;
    }
  });

  return errorFields;
};

const validateAdsetLevel = recipe => {
  const errorFields = [];
  const adSetMandatoryFields = mandatoryFields.adset;
  adSetMandatoryFields.forEach(section => {
    for (const sectionName in section) {
      const sectionFields = section[sectionName];
      sectionFields.forEach(field => {
        const {name, type, propToCheck, errorMsg} = field;
        switch (type) {
          case 'includes':
            if (!isVariationArrayHasValue(recipe[sectionName][name][propToCheck])) {
              errorFields.push(errorMsg);
            }
            break;
          case 'location':
            const isLocationHasValue = isVariationArrayHasValue(
              recipe[sectionName][name]?.includes
            );
            const isCustomAudienceHasValue = isVariationArrayHasValue(
              recipe[sectionName]?.customAudiences?.variations?.includes
            );
            if (!isLocationHasValue && !isCustomAudienceHasValue) {
              errorFields.push(errorMsg);
            }
            break;
          case 'placements':
            if (
              !recipe[sectionName][name][propToCheck].length &&
              recipe[sectionName][name].mode !== AUTOMATIC_PLACEMENTS_MODE
            ) {
              errorFields.push(errorMsg);
            }
            break;
          case 'bid':
            const isBidCapVisible =
              recipe[sectionName].bidStrategyId &&
              recipe[sectionName].bidStrategyId !== BID_STRATEGY_LOWEST_COST_ID;
            if (isBidCapVisible && !recipe[sectionName][name]) {
              errorFields.push(errorMsg);
            }
            break;
          case 'appEventId':
            const isAppEventIdVisible =
              recipe[sectionName].optimizationGoalId === FACEBOOK_OPTIMIZATION_GOAL_ID_APP_EVENTS;
            const appEventId = recipe[sectionName][name];
            if (isAppEventIdVisible && !appEventId) {
              errorFields.push(errorMsg);
            }
            break;
          default:
            if (!recipe[sectionName][name]) {
              errorFields.push(errorMsg);
            }
            break;
        }
      });
    }
  });

  return errorFields;
};
