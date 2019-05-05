import numeral from 'numeral';

export const toPercent = value => {
  const num = typeof value !== 'number' ? parseFloat(value) : value;

  return typeof num === 'number' ? `${(num * 100).toFixed(2)}%` : '';
};

export const toWholeCurrency = value => numeral(value).format('0,000');
export const toFractionalCurrency = value => numeral(value).format('0,000.00');
