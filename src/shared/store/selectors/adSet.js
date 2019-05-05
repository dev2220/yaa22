import {createSelector} from 'reselect';
import {defaultCreateLine} from 'shared/utils/variation';
import {clientSelector, targetingSelector, selectedObjectiveIdSelector} from './globals';
import {selectedAccountSelector, selectedOfferSelector} from './offer';
import {selectedChannelSelector} from './campaign';

export const availableTargetedMobileOSsSelector = createSelector(
  [selectedOfferSelector],
  offer => offer?.targetedMobileOSs
);

export const targetedAppSelector = createSelector(
  [selectedOfferSelector],
  offer => offer?.targetedApp
);

const selectedMobileOSIdSelector = state => state.recipe.targeting.mobileOSId;
export const selectedMobileOSSelector = createSelector(
  [availableTargetedMobileOSsSelector, selectedMobileOSIdSelector],
  (mobileOSs, selectedMobileOSId) => {
    if (mobileOSs && selectedMobileOSId) {
      return mobileOSs.find(mobileOs => mobileOs.id === selectedMobileOSId);
    }
    return null;
  }
);

export const selectedMobileOSVersionsSelector = createSelector(
  [targetingSelector],
  targeting => targeting?.mobileOSVersion
);

export const isOnlyConnectedToWifiSelector = createSelector(
  [targetingSelector],
  targeting => targeting?.isOnlyConnectedToWifi
);

export const availableMinAndMaxMobileOSVersionsSelector = createSelector(
  [selectedMobileOSSelector, selectedMobileOSVersionsSelector],
  (mobileOS, selectedVersions) => {
    const versions = mobileOS?.versions;
    if (versions && (selectedVersions.min || selectedVersions.max)) {
      const min =
        selectedVersions.max &&
        versions.slice(0, versions.findIndex(v => v === selectedVersions.max) + 1);
      const max =
        selectedVersions.min &&
        versions.slice(versions.findIndex(v => v === selectedVersions.min), versions.length);
      return {
        min: min || versions,
        max: max || versions,
      };
    }
    return {min: mobileOS?.versions, max: mobileOS?.versions};
  }
);

export const availableOsVersionsSelector = createSelector(
  [selectedMobileOSSelector],
  mobileOS => mobileOS?.versions || []
);

export const defaultMobileDevicesSelector = createSelector([selectedMobileOSSelector], mobileOS => [
  defaultCreateLine({value: mobileOS?.defaultMobileDevices}),
]);

export const selectedMobileDevicesSelector = state =>
  state.recipe.targeting?.mobileDevicesVariations;

export const availablePlacementGroupsSelector = createSelector(
  [selectedChannelSelector, selectedObjectiveIdSelector],
  (channel, selectedObjective) =>
    channel?.placementGroups
      ?.map(placementGroup => ({
        ...placementGroup,
        placements: placementGroup.placements.filter(placement =>
          placement.relevantForObjectiveIds.includes(selectedObjective)
        ),
      }))
      ?.map(option => ({
        ...option,
        options: option.placements.map(groupOption => ({
          ...groupOption,
          requiredOptions: groupOption.requiredPlacementIdsToComeWith,
          forbiddenOptions: groupOption.forbiddenPlacementIdsToComeWith,
        })),
      })) || []
);

export const availablePlacementGroupsCustomizationSelector = createSelector(
  [availablePlacementGroupsSelector],
  placements =>
    placements
      .map(placementGroup => ({
        ...placementGroup,
        placements: placementGroup.placements.filter(
          placement => placement.isRelevantForAssetCustomization
        ),
      }))
      ?.map(option => ({
        ...option,
        options: option.placements.map(groupOption => ({
          ...groupOption,
          requiredOptions: groupOption.requiredPlacementIdsToComeWith,
          forbiddenOptions: groupOption.forbiddenPlacementIdsToComeWith,
        })),
        placements: undefined,
      })) || []
);

export const selectedPlacementGroupSelector = state => state.recipe?.targeting?.placements;
export const excludedContentCategoriesSelector = state =>
  state.recipe?.targeting?.excludedContentCategories;

export const availableAgesSelector = createSelector(
  [selectedChannelSelector],
  channel => channel?.agesToTarget || []
);

export const availableContentCategoriesSelector = createSelector(
  [selectedChannelSelector],
  channel => channel?.contentCategories || []
);

export const availableLanguagesSelector = createSelector(
  [selectedChannelSelector],
  channel => channel?.languages
);

export const availableLocationTypesSelector = createSelector(
  [selectedChannelSelector],
  channel => channel?.locationTypes || []
);

export const allOptimizationGoalsSelector = createSelector(
  [selectedChannelSelector],
  channel => channel?.optimizationGoals || []
);

export const availableOptimizationGoalsSelector = createSelector(
  [selectedChannelSelector, selectedObjectiveIdSelector],
  (channel, selectedObjectiveId) =>
    channel?.optimizationGoals?.filter(optimizationGoal =>
      optimizationGoal.relevantForObjectiveIds.includes(selectedObjectiveId)
    ) || []
);

const selectedOptimizationSelector = state => state.recipe.optimizationAndBidding;

export const selectedOptimizationGoalSelector = createSelector(
  [selectedOptimizationSelector],
  optimization => optimization?.optimizationGoalId
);

export const selectedAttributionWindowSelector = createSelector(
  [selectedOptimizationSelector],
  optimization => optimization?.attributionWindow
);

export const availableAttributionWindowsSelector = createSelector(
  [selectedOptimizationGoalSelector, availableOptimizationGoalsSelector],
  (selectedGoalId, optimizationGoals) =>
    optimizationGoals?.find(optimization => optimization.id === selectedGoalId)
      ?.attributionWindows || []
);

export const availableBidStrategiesSelector = createSelector(
  [selectedOptimizationGoalSelector, availableOptimizationGoalsSelector],
  (selectedGoalId, optimizationGoals) =>
    optimizationGoals?.find(optimization => optimization.id === selectedGoalId)?.bidStrategies || []
);

export const availableRelevantOptimizationGoalIdsToBeUsedAsChargeEventSelector = createSelector(
  [selectedOptimizationGoalSelector, allOptimizationGoalsSelector],
  (selectedGoalId, allOptimizationGoals) =>
    allOptimizationGoals
      ?.find(optimization => optimization.id === selectedGoalId)
      ?.relevantOptimizationGoalIdsToBeUsedAsChargeEvent?.map(relOpt =>
        allOptimizationGoals.find(optGoal => optGoal.id === relOpt)
      ) || []
);

export const selectedAppEventIdSelector = createSelector(
  [selectedOptimizationSelector],
  optimization => optimization?.appEventId
);

export const selectedBidStrategyIdSelector = createSelector(
  [selectedOptimizationSelector],
  optimization => optimization?.bidStrategyId
);

export const selectedOptimizationGoalIdForChargeSelector = createSelector(
  [selectedOptimizationSelector],
  optimization => optimization?.optimizationGoalIdForCharge
);

export const selectedBidValueSelector = createSelector(
  [selectedOptimizationSelector],
  optimization => optimization?.bidValue
);

export const selectedIsAcceleratedDeliverySelector = createSelector(
  [selectedOptimizationSelector],
  optimization => optimization?.isAcceleratedDelivery
);

export const availableAppEventsSelector = createSelector(
  [selectedChannelSelector],
  channel => channel?.appEvents || []
);

export const customAudiencesSelector = createSelector(
  [targetingSelector],
  targeting => targeting?.customAudiences
);

export const interestsListsSelector = createSelector(
  [targetingSelector],
  targeting => targeting?.interestsLists
);

export const selectedJobTitles = createSelector(
  [targetingSelector],
  targeting => targeting?.jobTitles
);

export const selectedEducationCategoryIdCategories = createSelector(
  [targetingSelector],
  targeting => targeting?.educationCategoryId
);

export const selectedFriendsOfPeopleWhoAreConnectedTo = createSelector(
  [targetingSelector],
  targeting => targeting?.friendsOfPeopleWhoAreConnectedTo
);

export const hasMoreThanOneCaLalSelector = state =>
  state.recipe.targeting?.customAudiences.variations?.includes?.some(v => v.value?.length > 1);

export const selectedLocationsSelector = state => state.recipe?.targeting?.locationsVariations;

export const availableInterestsCategoriesSelector = createSelector(
  clientSelector,
  client => client?.interestsCategories
);

export const broadCategoriesCollectionsSelector = createSelector(
  selectedAccountSelector,
  account => account?.broadCategoriesCollections
);

export const relationshipStatusesSelector = createSelector(
  [selectedChannelSelector],
  channel => channel?.relationshipStatuses || []
);

export const educationCategoriesSelector = createSelector(
  [selectedChannelSelector],
  channel => channel?.educationCategories || []
);

export const selectedAccountAppsSelector = createSelector(
  selectedAccountSelector,
  account => account?.apps
);

export const selectedAccountPagesSelector = createSelector(
  selectedAccountSelector,
  account => account?.pages
);

export const selectedBidStrategySelector = createSelector(
  [availableBidStrategiesSelector, selectedBidStrategyIdSelector],
  (bidStrategies, bidStrategyId) => bidStrategies?.find(bid => bid.id === bidStrategyId)
);
