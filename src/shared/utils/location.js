import {capitalize} from 'lodash';

import {COORDINATES, ADDRESS, DMA, ZIP} from '../constants/locationTypes';

export const getInputTypeByLocationType = locationType => {
  switch (locationType) {
    case COORDINATES:
    case ADDRESS:
      return 'text';
    default:
      return 'select';
  }
};

export const getLocationNameByLocationType = locationType => {
  switch (locationType) {
    case DMA:
      return 'DMA';
    case ZIP:
      return 'ZIP';
    default:
      return capitalize(locationType);
  }
};
