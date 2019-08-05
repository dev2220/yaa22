import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import styled from 'styled-components';
import {Img as BaseImg, Loading} from 'shared/components';

const Wrapper = styled.div`
  direction: ltr;
`;

const Img = styled(BaseImg)`
  height: 210px;
`;

const imgs = ['assets/yaa1.jpg', 'assets/yaa2.jpg', 'assets/yaa3.png'];

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
