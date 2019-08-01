import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import styled from 'styled-components';
import yaa1 from 'shared/assets/yaa1.jpg';
import yaa2 from 'shared/assets/yaa2.jpg';
import yaa3 from 'shared/assets/yaa3.png';

const Wrapper = styled.div`
  direction: ltr;
`;

const Img = styled.img`
  max-height: 210px;
`;

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
      <Img src={yaa1} />
      <Img src={yaa2} />
      <Img src={yaa3} />
    </Carousel>
  </Wrapper>
);

export default AppCarousel;
