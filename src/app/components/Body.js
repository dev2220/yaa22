import React from 'react';
import styled from 'styled-components';
import {faRoad, faPencilRuler, faPhone, faShieldAlt} from '@fortawesome/free-solid-svg-icons';
import {faNewspaper} from '@fortawesome/free-regular-svg-icons';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {Icon as BaseIcon} from '../../shared/components';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  padding: 20px;
  height: 150px;
  border: 2px solid ${({theme}) => theme.palette.greyWhite};
  &:nth-child(1) {
    border: 0;
  }
  &:nth-child(2) {
    border-top: 0;
    border-bottom: 0;
  }
  &:nth-child(3) {
    border: 0;
  }
  &:nth-child(4) {
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
  }
  &:nth-child(5) {
    border-bottom: 0;
  }
  &:nth-child(6) {
    border-left: 0;
    border-bottom: 0;
    border-right: 0;
  }
`;

const ItemText = styled.span`
  color: ${({color}) => color};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const Icon = styled(BaseIcon)`
  &&& {
    width: 50px;
    height: 50px;
  }
`;

const Item = ({color, icon, children}) => (
  <ItemWrapper>
    <Icon icon={icon} color={color} />
    <ItemText color={color}>{children}</ItemText>
  </ItemWrapper>
);

const Body = () => (
  <Root>
    <Item icon={faRoad}>דרכי הגעה</Item>
    <Item icon={faPencilRuler} color="rgb(29,61,99)">
      נהלי יחידה
    </Item>
    <Item icon={faPhone} color="rgb(216,154,70)">
      טלפונים חשובים
    </Item>
    <Item icon={faShieldAlt} color="rgb(137,66,127)">
      התגוננות
    </Item>
    <Item icon={faFacebook} color="#3C5A99">
      פייסבוק יחידתי
    </Item>
    <Item icon={faNewspaper} color="rgb(189,63,60)">
      כתבות
    </Item>
  </Root>
);

export default Body;
