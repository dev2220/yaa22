import gql from 'graphql-tag';
import {graphqlQuery} from '../graphqlService';

/**
 Input should look like:
 -----------------------
 {
  "campaignAssociationInput": {
    "offerId": 11,
    "accountId": 22,
    "objectiveId": 9,
    "isCBO": false,
    "bidStrategyId": "CHANNEL_AUTO_BID"
  }
}
 */
export const fetchAssociatedCampaigns = campaignAssociationInput =>
  graphqlQuery(
    gql`
      query AssociatedCampaigns($campaignAssociationInput: CampaignAssociationInput!) {
        associatedCampaigns(campaignAssociationInput: $campaignAssociationInput) {
          id
          name
          idInChannel
          createdTime
          status
          stats {
            numberOfAdsets
            mediaSpend
            installs
            cpi
          }
        }
      }
    `,
    {variables: {campaignAssociationInput}}
  );
