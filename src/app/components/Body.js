import React from 'react';
import styled from 'styled-components';
import {
  faRoad,
  faPencilRuler,
  faPhone,
  faShieldAlt,
  faBalanceScale,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {Icon as BaseIcon, CardImg} from 'shared/components';
import Carousel from './Carousel';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`;

const CustomLink = ({href, ...rest}) => (href ? <a href={href} {...rest} /> : <Link {...rest} />);

const ItemWrapper = styled(CustomLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  padding: 20px;
  height: 150px;
  border: 2px solid ${({theme}) => theme.palette.greyWhite};
  &:active {
    border-bottom-color: none;
  }
  &:visited {
    border-bottom-color: none;
  }
  &:focus {
    border-bottom-color: none;
  }
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

const Item = ({color, href, to, icon, children}) => (
  <ItemWrapper href={href} to={to}>
    <Icon icon={icon} color={color} />
    <ItemText color={color}>{children}</ItemText>
  </ItemWrapper>
);

const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Body = () => (
  <>
    <Carousel />
    <Root>
      <Item icon={faRoad} color="rgb(0,0,0)">
        דרכי הגעה
      </Item>
      <Item to="/protocols" icon={faPencilRuler} color="rgb(29,61,99)">
        נהלי יחידה
      </Item>
      <Item to="/phones" icon={faPhone} color="rgb(216,154,70)">
        טלפונים חשובים
      </Item>
      <Item to="/defense" icon={faShieldAlt} color="rgb(137,66,127)">
        התגוננות
      </Item>
      <Item icon={faEye} color="#3C5A99">
        חזון היחידה
      </Item>
      <Item icon={faBalanceScale} color="rgb(189,63,60)">
        זכויות החיילים
      </Item>
    </Root>
    <ImagesWrapper>
      <CardImg title="ביקור מח״א" src="assets/commander.jpeg" />
      <CardImg
        href="https://www.mako.co.il/pzm-units/air-force/Article-00897aae7467d41006.htm"
        title="מאקו מספרת על היחידה"
        src="assets/mako.png"
      />
      <CardImg
        href="https://www.facebook.com/YAA22"
        title="פייסבוק יחידתי"
        src="assets/facebook.png"
      />
    </ImagesWrapper>
  </>
);

export default Body;
