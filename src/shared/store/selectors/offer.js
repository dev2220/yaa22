import {createSelector} from 'reselect';
import {
  clientAccountsSelector,
  clientSelector,
  selectedAccountIdSelector,
  selectedChannelIdSelector,
  selectedOfferIdSelector,
} from './globals';

export const availableChannelsSelector = createSelector(clientSelector, client => client?.channels);

export const availableOffersSelector = createSelector(
  clientSelector,
  selectedChannelIdSelector,
  (client, channelId) =>
    client && client.offers && client.offers.filter(offer => offer.channel.id === channelId)
);

export const selectedOfferSelector = createSelector(
  [availableOffersSelector, selectedOfferIdSelector],
  (offers, selectedOfferId) => {
    if (offers && selectedOfferId) {
      return offers.find(offer => offer.id === selectedOfferId);
    }
    return null;
  }
);

export const availableAccountsSelector = createSelector(
  [selectedOfferSelector],
  offer => offer?.accounts
);

export const selectedAccountSelector = createSelector(
  [clientAccountsSelector, selectedAccountIdSelector],
  (accounts, selectedAccountId) => {
    if (accounts && selectedAccountId) {
      return accounts.find(account => account.id === selectedAccountId);
    }
    return null;
  }
);

export const accountTimezoneSelector = createSelector(
  [selectedAccountSelector],
  selectedAccount => selectedAccount?.timezone
);
