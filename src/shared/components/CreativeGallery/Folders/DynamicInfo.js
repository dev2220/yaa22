import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Header = styled.div`
  font-weight: 600;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({theme}) => theme.palette.greyBlack};
`;

const Wrapper = styled.div`
  margin: 10px 36px;
`;

const DynamicInfo = ({selectedFolder}) => (
  <Wrapper>
    <Header>{selectedFolder?.name}</Header>
    <InfoItem>
      <span>Creation Date</span>
      <span>{moment(new Date(selectedFolder?.createdTime)).format('DD/MM/YYYY')}</span>
    </InfoItem>
  </Wrapper>
);

export default DynamicInfo;
