import React from 'react';
import styled from 'styled-components';
import BaseImg from './Img';
import Loading from './Loading';

const LinkOrDiv = ({href, ...rest}) => (href ? <a href={href} {...rest} /> : <div {...rest} />);

const Wrapper = styled(LinkOrDiv)`
  display: flex;
  height: 180px;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
  background-image: linear-gradient(transparent, transparent, black);
  box-shadow: 1px 1px 1px black;
`;

const Img = styled(BaseImg)`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: white;
`;

const CardImg = ({src, href, title}) => (
  <Wrapper href={href}>
    <Img src={src} fallback={<Loading />} />
    <Title>{title}</Title>
  </Wrapper>
);

export default CardImg;
