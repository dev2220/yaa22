import React from 'react';
import styled from 'styled-components';
import {components} from 'react-select';

const SecondRowWrapper = styled.div`
  display: flex;
`;

const Status = styled.div`
  color: ${({isActive}) => (isActive ? '#43a047' : '#adadad')};
  font-size: 11px;
`;

const CampaignID = styled.div`
  color: #adadad;
  font-size: 11px;
`;

const SingleValue = ({children, ...props}) => (
  <components.SingleValue {...props}>
    {children}
    <SecondRowWrapper>
      <Status isActive={props.data.status === 'Active'}>{props.data.status}- &nbsp;</Status>
      <CampaignID>Campaign ID: {props.data.idInChannel}</CampaignID>
    </SecondRowWrapper>
  </components.SingleValue>
);

export default SingleValue;
