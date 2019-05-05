export const lowerCaseFirstLetter = string => string.charAt(0).toLowerCase() + string.slice(1);

export const splitCamelCaseString = string =>
  string.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

export const ellipsisString = (string, maxLength) => {
  if (string && string.length > maxLength) {
    return `${string.substr(0, maxLength)}...`;
  }
  return string;
};
