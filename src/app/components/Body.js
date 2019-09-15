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
import {Icon as BaseIcon, CardImg, Img} from 'shared/components';
import {Carousel as ReactCarousel} from 'react-responsive-carousel';
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
const SecondCarouselWrapper = styled.div`
  direction: ltr;
`;
const BlackCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(transparent, transparent, black);
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  font-weight: bold;
  font-size: 16px;
  color: white;
`;

const Body = () => (
  <>
    <Carousel />
    <Root>
      <Item to="/roads" icon={faRoad} color="rgb(0,0,0)">
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
      <Item color="rgb(189,63,60)" />
      <Item to="/vision" icon={faEye} color="#3C5A99">
        חזון היחידה
      </Item>
    </Root>
    <ImagesWrapper>
      <SecondCarouselWrapper>
        <ReactCarousel
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          className="presentation-mode"
          autoPlay
          infiniteLoop
        >
          <Img style={{height: 180}} src="assets/commander/commander.jpeg" />
          <Img style={{height: 180}} src="assets/commander/1.jpeg" />
          <Img style={{height: 180}} src="assets/commander/2.jpeg" />
          <Img style={{height: 180}} src="assets/commander/3.jpeg" />
        </ReactCarousel>
        <BlackCover>ביקור מח״א</BlackCover>
      </SecondCarouselWrapper>
    </ImagesWrapper>
  </>
);

export default Body;
