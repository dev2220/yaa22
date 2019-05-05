const isObject = x => Object.prototype.toString.call(x) === '[object Object]';

const isExist = ({options, getOptionValue = option => option.id, value}) =>
  options?.find(option => value === getOptionValue(option));

const singleOptionDefault = selector => state =>
  selector(state)?.length === 1 ? selector(state)[0]?.id : null;

export const isExistOrSingleOptionDefault = selector => (state, value) =>
  !isExist({options: selector(state), value}) ? singleOptionDefault(selector)(state) : value;
export const firstOptionDefault = (selector, selectedProp) => state =>
  selector(state)?.length
    ? selectedProp
      ? selector(state)[0][selectedProp]
      : selector(state)[0]
    : null;

export const lastOptionDefault = selector => state =>
  selector(state)?.length ? selector(state)[selector(state).length - 1] : null;

export const getKeys = (obj, prefix) => {
  const keys = Object.keys(obj);
  prefix = prefix ? `${prefix}.` : '';
  return keys.reduce((result, key) => {
    if (isObject(obj[key])) {
      result = result.concat(getKeys(obj[key], prefix + key));
    } else {
      result.push(prefix + key);
    }
    return result;
  }, []);
};
