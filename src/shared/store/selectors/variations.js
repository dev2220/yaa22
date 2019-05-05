/* eslint-disable prettier/prettier */
import {createSelector} from 'reselect';
import {targetingSelector} from './globals';
import {selectedMobileDevicesSelector} from './adSet';
import {calculateNumberOfAdsets} from '../../utils/variationsCalculators/adsetsVariationsCalculators';
import {selectedCreativeBundlesSelector} from './ad';
import {calculateNumOfAdsBySingleCreativeTypeBundles} from '../../utils/variationsCalculators/adsVariationsCalculators';
import {DUMMY_VARIATION_RECORD_TO_REPRESENT_EMPTY_VARIATION} from '../../utils/variation';

export const selectedAgesVariations = createSelector(
  [targetingSelector],
  targeting => targeting.agesVariations
);

export const selectedGenderVariations = createSelector(
  [targetingSelector],
  targeting => targeting.genderVariations
);

export const selectedLocationsVariations = createSelector(
  [targetingSelector],
  targeting => targeting.locationsVariations
);

export const selectedAudiencesVariations = createSelector(
  [targetingSelector],
  targeting => targeting?.customAudiences?.variations
);

export const selectedInterestsListsVariations = createSelector(
  [targetingSelector],
  targeting => targeting?.interestsLists?.variations
);

export const selectedBehaviorsVariations = createSelector(
  [targetingSelector],
  targeting => targeting.behaviorsVariations
);

export const selectedBroadVariations = createSelector(
  [targetingSelector],
  targeting => targeting.broadCategoriesVariations
);

export const selectedShouldAddEmptyAudiencesVariation = createSelector(
  [targetingSelector],
  targeting => targeting?.customAudiences?.shouldAddEmptyVariation
);

export const selectedShouldAddEmptyInterestsListsVariation = createSelector(
  [targetingSelector],
  targeting => targeting?.interestsLists?.shouldAddEmptyVariation
);

export const selectedAudiencesVariationsEnhanced = createSelector(
  [selectedAudiencesVariations, selectedShouldAddEmptyAudiencesVariation],
  (selectedAudiences, shouldAddEmptyAudiencesVariation) => {
    
    if (shouldAddEmptyAudiencesVariation) {
      const audiencesVariationsEnhanced = {
        ...selectedAudiences,
      };
      
      audiencesVariationsEnhanced.includes = [
        ...audiencesVariationsEnhanced.includes,
        DUMMY_VARIATION_RECORD_TO_REPRESENT_EMPTY_VARIATION,
      ];
      
      return audiencesVariationsEnhanced;
    }
    
    return selectedAudiences;
  }
);

export const selectedInterestsListsVariationsEnhanced = createSelector(
  [selectedInterestsListsVariations, selectedShouldAddEmptyInterestsListsVariation],
  (selectedInterestsLists, shouldAddEmptyInterestsListsVariation) => {
    
    if (shouldAddEmptyInterestsListsVariation) {
      const interestsListsVariationsEnhanced = {
        ...selectedInterestsLists,
      };
      
      interestsListsVariationsEnhanced.includes = [
        ...interestsListsVariationsEnhanced.includes,
        DUMMY_VARIATION_RECORD_TO_REPRESENT_EMPTY_VARIATION,
      ];
      
      return interestsListsVariationsEnhanced;
    }
    
    return selectedInterestsLists;
  }
);

export const numOfAdsetsAccordingToSelectedVariationsSelector = createSelector(
  [
    selectedMobileDevicesSelector,
    selectedLocationsVariations,
    selectedAgesVariations,
    selectedGenderVariations,
    selectedAudiencesVariationsEnhanced,
    selectedInterestsListsVariationsEnhanced,
    selectedBehaviorsVariations,
    selectedBroadVariations,
  ],
  (...entitiesVariationsObjectsArr) => calculateNumberOfAdsets(entitiesVariationsObjectsArr)
);

// Currently we hardcoded the logic of "ALL_TO_ALL", until additional logic will be defined.
export const numOfTotalAdsSelector = createSelector(
  [numOfAdsetsAccordingToSelectedVariationsSelector, selectedCreativeBundlesSelector],
  (numOfAdsets, selectedCreativeBundles) => {
    const numOfAdsForEachAdset = calculateNumOfAdsBySingleCreativeTypeBundles(selectedCreativeBundles);
    return numOfAdsForEachAdset * numOfAdsets;
  }
);

// ===== Additional semi-variations selectors (max include = 1)  =====
export const selectedRelationshipStatusesVariations = createSelector(
  [targetingSelector],
  targeting => targeting.relationshipStatusesVariations
);

export const selectedPeopleWhoAreConnectedToVariations = createSelector(
  [targetingSelector],
  targeting => targeting.peopleWhoAreConnectedToVariations
);
