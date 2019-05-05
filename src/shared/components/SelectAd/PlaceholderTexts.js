import React from 'react';
import styled from 'styled-components';
import {
  PLACEHOLDER_TEXT_DESCRIPTION,
  PLACEHOLDER_TEXT_HEADLINE,
} from 'shared/constants/translations';
import {Texts, TextActions, HiddenOverflow, TextTabs, TabWrapper, Tab} from './styled';

const HeadlineText = styled.div`
  width: 220px;
  font-size: 12px;
  font-weight: 600;
  color: ${({theme}) => theme.palette.greyBlack};
  margin-top: 16px;
`;

const DescriptionText = styled.div`
  width: 220px;
  font-size: 12px;
  color: ${({theme}) => theme.palette.greyBlack};
  margin-top: 35px;
`;

const PlaceholderTexts = () => (
  <Texts>
    <TextActions>
      <HiddenOverflow>
        <TextTabs>
          <TabWrapper>
            <Tab>1</Tab>
          </TabWrapper>
        </TextTabs>
      </HiddenOverflow>
    </TextActions>
    <HeadlineText>{PLACEHOLDER_TEXT_HEADLINE}</HeadlineText>
    <DescriptionText>{PLACEHOLDER_TEXT_DESCRIPTION}</DescriptionText>
  </Texts>
);

export default PlaceholderTexts;
