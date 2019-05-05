import {faCircle} from '@fortawesome/free-regular-svg-icons';
import {
  faFacebook,
  faSnapchat,
  faPinterest,
  faGoogle,
  faApple,
} from '@fortawesome/free-brands-svg-icons';
import {
  CHANNEL_ID_APPLE,
  CHANNEL_ID_FACEBOOK,
  CHANNEL_ID_GOOGLE,
  CHANNEL_ID_PINTEREST,
  CHANNEL_ID_SNAPCHAT,
} from './index';

const getIconByChannelId = channelId => {
  switch (channelId) {
    case CHANNEL_ID_FACEBOOK:
      return faFacebook;
    case CHANNEL_ID_PINTEREST:
      return faPinterest;
    case CHANNEL_ID_GOOGLE:
      return faGoogle;
    case CHANNEL_ID_APPLE:
      return faApple;
    case CHANNEL_ID_SNAPCHAT:
      return faSnapchat;
    default:
      return faCircle;
  }
};

export default getIconByChannelId;
