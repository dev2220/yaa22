import React from 'react';
import styled from 'styled-components';
import {CardImg} from 'shared/components';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Phone = styled.a`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid ${({theme}) => theme.palette.greyWhite};
`;

const Text = styled.span`
  color: black;
  font-size: 16px;
`;

const Headline = styled(Text)`
  font-weight: bold;
`;

const Phones = () => (
  <Root>
    <CardImg src="assets/contacts.webp">טלפונים חשובים</CardImg>
    <Phone href="tel:+972542479065">
      <Headline>ממונת יוהל"ם- ציונה בנימין</Headline>
      <Text>054-2479065</Text>
    </Phone>
    <Phone href="tel:+97288685177">
      <Headline>אבטחת מידע</Headline>
      <Text>08-8685177</Text>
    </Phone>
    <Phone href="tel:+97286443397">
      <Headline>נוהל 9</Headline>
      <Text>08-6443397</Text>
    </Phone>
    <Phone href="tel:+97288684616">
      <Headline>משוב יא"א 22 (נוהל 9)</Headline>
      <Text>08-8684616</Text>
    </Phone>
    <Phone href="tel:+97288684466">
      <Headline>מרפאת בח"א 8</Headline>
      <Text>08-8684466</Text>
    </Phone>
    <Phone href="tel:+972768600368">
      <Headline>מרפאת שניים בח"א 8</Headline>
      <Text>076-8600368</Text>
    </Phone>
    <Phone href="tel:+97252-9634663">
      <Headline>שק"ם נייד בתוך הבסיס</Headline>
      <Text>052-9634663</Text>
    </Phone>
  </Root>
);

export default Phones;
