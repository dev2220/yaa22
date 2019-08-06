import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import styled from 'styled-components';
import {Img as BaseImg, Loading} from 'shared/components';

const Wrapper = styled.div`
  direction: ltr;
`;

const Img = styled(BaseImg)`
  height: ${({theme}) => `calc(100vh - ${theme.navBar.height.mobile}px)`};
  background: white;
`;

const Gallery = ({imgs}) => (
  <Wrapper>
    <Carousel
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      className="presentation-mode"
      infiniteLoop
      selectedItem={imgs.length - 1}
    >
      {imgs.map(img => (
        <Img src={img} key={img} fallback={<Loading />} />
      ))}
    </Carousel>
  </Wrapper>
);

export default Gallery;
