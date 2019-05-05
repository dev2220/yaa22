import {createSelector} from 'reselect';
import {selectedObjectiveIdSelector, recipeSelector} from './globals';
import {selectedChannelSelector} from './campaign';

export const selectedCreativeSpec = createSelector([recipeSelector], recipe => recipe.creativeSpec);

export const availableCallToActionTypesSelector = createSelector(
  [selectedChannelSelector, selectedObjectiveIdSelector],
  (channel, selectedObjectiveId) =>
    channel?.callToActionTypes?.filter(callToActionType =>
      callToActionType.relevantForObjectiveIds.includes(selectedObjectiveId)
    ) || []
);

export const callToActionTypeSelector = createSelector(
  [selectedCreativeSpec],
  creativeSpecs => creativeSpecs.callToActionType
);

/**
 * This is selector is relevant only for single-creative-type support
 * and should be irrelevant for multi-creative-type support
 *
 * TODO: delete when implementing multi-creative-type support
 */
export const selectedCreativeBundlesSelector = createSelector(
  [selectedCreativeSpec],
  creativeSpec => {
    if (creativeSpec.videoBundles.length && creativeSpec.videoBundles.length > 0) {
      return creativeSpec.videoBundles;
    } else if (creativeSpec.imageBundles.length && creativeSpec.imageBundles.length > 0) {
      return creativeSpec.imageBundles;
    }
    return [];
  }
);
