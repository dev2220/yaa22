/* eslint-disable prettier/prettier */
/**
 * Given creativeBundlesArray (like videoBundles or imageBundles),
 * this function will return the amount of the ads that will be generated from this bundle.
 *
 * @param creativeBundlesArray
 * @returns {number}
 */
export const calculateNumOfAdsBySingleCreativeTypeBundles = (creativeBundlesArray) => {
  return creativeBundlesArray.reduce(
    (accumulator, currentBundle) => (accumulator + currentBundle.texts.length), 0
  );
};
