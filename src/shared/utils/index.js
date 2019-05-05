import {isEqual} from 'lodash';

export const mergeDeepWithOutConcatingArrays = ({objects, override}) => {
  const isObject = obj => obj && typeof obj === 'object';
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = [...oVal];
      } else if (isObject(pVal) && isObject(oVal)) {
        if (override && Object.values(oVal).filter(a => typeof a === 'object').length === 0) {
          prev[key] = oVal;
        } else {
          prev[key] = mergeDeepWithOutConcatingArrays({objects: [pVal, oVal], override});
        }
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
};

export const deepInclude = (array, obj) => {
  for (let i = 0; i < array.length; i++) {
    if (isEqual(array[i], obj)) {
      return true;
    }
  }
  return false;
};

export const mergeObjectsByProp = (array, prop) =>
  array.reduce((all, el) => ({...all, ...el[prop]}), {});
