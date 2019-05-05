import colors from '../theme/colors';

const getColorByType = type => {
  switch (type) {
    case 'info':
      return colors.infoBlue;
    case 'danger':
      return colors.red;
    case 'success':
      return colors.green;
    case 'alert':
      return colors.yellow;
    case 'system':
      return colors.greySystemMsg;
    default:
      return colors.infoBlue;
  }
};

export default getColorByType;
