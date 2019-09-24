import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import styled from 'styled-components';
import {Img as BaseImg, Loading} from 'shared/components';

const Wrapper = styled.div`
  direction: ltr;
`;

const Img = styled(BaseImg)`
  height: 210px;
  background: white;
`;

const imgs = [
  'assets/carousel/1.jpg',
  'assets/carousel/2.jpg',
  'assets/carousel/3.jpg',
  'assets/carousel/4.jpg',
  'assets/carousel/5.jpg',
  'assets/carousel/6.jpg',
  'assets/carousel/7.jpg',
  'assets/carousel/8.jpg',
  'assets/carousel/9.jpg',
  'assets/carousel/10.jpg',
];

const AppCarousel = () => (
  <Wrapper>
    <Carousel
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      className="presentation-mode"
      autoPlay
      infiniteLoop
    >
      {imgs.map(img => (
        <Img src={img} key={img} fallback={<Loading />} />
      ))}
    </Carousel>
  </Wrapper>
);

export default AppCarousel;
