import {createSelector} from 'reselect';

import {selectedChannelIdSelector, selectedObjectiveIdSelector} from './globals';
import {availableChannelsSelector} from './offer';

export const selectedChannelSelector = createSelector(
  [availableChannelsSelector, selectedChannelIdSelector],
  (channels = [], channelId) => channels.find(channel => channel.id === channelId)
);

export const availableObjectivesSelector = createSelector(
  [selectedChannelSelector],
  channel => channel?.objectives
);

export const selectedObjectiveSelector = createSelector(
  [availableObjectivesSelector, selectedObjectiveIdSelector],
  (objectives, selectedObjectiveId) => {
    if (objectives && selectedObjectiveId) {
      return objectives.find(offer => offer.id === selectedObjectiveId);
    }
    return null;
  }
);

export const availableCBOBidStrategiesSelector = createSelector(
  [selectedChannelSelector],
  channel => channel?.cboBidStrategies
);
