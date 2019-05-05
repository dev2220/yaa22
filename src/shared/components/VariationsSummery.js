import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {numOfAdsetsAccordingToSelectedVariationsSelector, numOfTotalAdsSelector} from '../store/selectors';

const Root = styled.div`
  display: flex;
  align-items: center;
`;

const VariationsSummeryOval = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({theme}) => theme.palette.blue};
  color: ${({theme}) => theme.palette.white};
  font-size: 13px;
  font-weight: 600;
  line-height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 18px;
`;

const Text = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme}) => theme.palette.black};
`;

const Line = styled.div`
  height: 36px;
  background-color: #d8d8d8;
  width: 1px;
  margin-left: 32px;
  margin-right: 32px;
`;

const VariationsSummery = ({numOfAdsets, numOfAds, className}) => (
  <Root className={className}>
    <Text marginLeft={20}>Ad Sets</Text>
    <VariationsSummeryOval>{numOfAdsets}</VariationsSummeryOval>
    <Line />
    <Text marginLeft={32}>Ads</Text>
    <VariationsSummeryOval>{numOfAds}</VariationsSummeryOval>
  </Root>
);

const mapStateToProps = state => ({
  numOfAdsets: numOfAdsetsAccordingToSelectedVariationsSelector(state),
  numOfAds: numOfTotalAdsSelector(state),
});

export default connect(mapStateToProps)(VariationsSummery);
