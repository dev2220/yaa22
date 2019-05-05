/* eslint-disable prettier/prettier */
import {GENERIC_ENTITY_TYPE} from '../variation';

/**
 * Given unlimited number of variationsObjects, this functions returns the number of the expected Adsets that will be created,
 * according to the selected variations.
 *
 * More Info: https://bidalgo.atlassian.net/browse/DEV-16124
 *
 * @param {boolean[]} additionsOfEmptyVariationsArray - array of booleans, represents explicit user requests of empty adsets,
 *                                             Like "Add ad sets without CA & LAL"  "Add ad sets without interests".
 * @param entitiesVariationsObjectsArr
 * @returns {number}
 */
export const calculateNumberOfAdsets = (entitiesVariationsObjectsArr) => {
  const entitiesVariationsAmounts = buildArrayOfVariationsAmounts(entitiesVariationsObjectsArr);
  
  return calculateNumberOfAdsetsAsResultOfVariations(entitiesVariationsAmounts);
};

/**
 * @param {number[]} entitiesVariationsAmounts
 * @returns {number}
 */
const calculateNumberOfAdsetsAsResultOfVariations = (entitiesVariationsAmounts) => {
  return entitiesVariationsAmounts.reduce(
    (accumulator, currentValue) => (accumulator * currentValue), 1
  );
};

/**
 * Returns a simple array of numbers, that indicates the number of variations for each different entity (mobileDevice, Country, City, etc..).
 *
 * Example response: [2, 1, 7, 3, 1]
 *
 * @param entitiesVariationsObjects
 * @returns {number[]}
 */
const buildArrayOfVariationsAmounts = (entitiesVariationsObjects) => {
  const objectOfVariationsAmounts = buildObjectOfVariationsAmounts(entitiesVariationsObjects);
  return Object.keys(objectOfVariationsAmounts).map(key => objectOfVariationsAmounts[key]);
};

/**
 * Given an array of entitiesVariationsObjects, this functions builds a single object that indicates the number,
 * of variations per each different entity (Consider only entities with positive variations number, i.e. greater than one).
 *
 * Example response: {Country: 2, ZIP: 2, devices: 2}
 *
 * @param entitiesVariationsObjects
 */
const buildObjectOfVariationsAmounts = (entitiesVariationsObjects) => {
  const response = {};
  
  // TODO: change the 'default' mechanism in the variations editor
  entitiesVariationsObjects.forEach((entityVariationsObject, idx) => {
    if (entityVariationsObject.includes?.length) {
      entityVariationsObject.includes.forEach(singleVariation => {
        const entityName = singleVariation.entity === GENERIC_ENTITY_TYPE ? `${GENERIC_ENTITY_TYPE}_${idx}` : singleVariation.entity;
        
        // count non-empty variations only
        if (isContainNonEmptyValue(singleVariation.value)) {
          response[entityName] = response[entityName] ? response[entityName] + 1 : 1;
        }
      });
    }
  });
  
  return response;
};

const isContainNonEmptyValue = (singleVariationValue) => {
  if (singleVariationValue === "") {
    return false;
  
  } else if (singleVariationValue === null) {
    return false;
    
  } else if (Array.isArray(singleVariationValue) && singleVariationValue.length === 0) {
    return false;
    
    // special case for ages
  } else if (singleVariationValue.min === "" || singleVariationValue.max === "" ) {
    return false;
  }
  
  return true;
};
