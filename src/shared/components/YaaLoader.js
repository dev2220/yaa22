import React, {useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';

const transitionTime = 0.75;

const rotate = keyframes`
0% {
  transform: rotateZ(0);
}
100% {
  transform: rotateZ(360deg);
}`;

const Wrapper = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  padding: 15vw;
  opacity: ${({visible}) => (visible ? 1 : 0)};
  transition: opacity ${transitionTime}s;
  &:before {
    content: '';
    display: block;
    position: absolute;
    border-radius: 50%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 3vw solid transparent;
    border-top: 3vw skyblue;
    border-right-color: rgb(165, 40, 40);
    animation: ${rotate} 1.5s linear infinite;
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 50%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 3vw solid transparent;
    border-top: 3vw skyblue;
    border-right-color: rgb(165, 40, 40);
    width: 50%;
    height: 50%;
    left: 25%;
    top: 25%;
    border-width: 2.5vw;
    border-right-color: skyblue;
    transform: translate(-50%, -50%);
    animation: ${rotate} ${transitionTime}s linear infinite;
  }
`;
const YaaImage = styled.img`
  padding-left: 2.5vw;
  padding-top: 1.5vw;
  width: 25vw;
  height: 25vw;
`;

const BackDrop = styled.div`
  position: fixed;
  background-color: ${({visible}) => (visible ? 'rgba(0,0,0,0.3)' : 'rgba(0, 0, 0, 0)')};
  height: 100vh;
  width: 100vw;
  z-index: 2;
  transition: background-color ${transitionTime}s;
`;

const Root = styled.div`
  position: unset;
  display: ${({shouldDisplay}) => (shouldDisplay ? 'block' : 'none')};
`;

const YaaLoader = ({visible}) => {
  const [shouldDisplay, setShouldDisplay] = useState(!!visible);
  useEffect(() => {
    setTimeout(() => {
      setShouldDisplay(visible);
    }, transitionTime * 1000);
  }, [visible]);
  return (
    <Root shouldDisplay={shouldDisplay}>
      <BackDrop visible={visible} />
      <Wrapper visible={visible}>
        <YaaImage src="yaa22.png" />
      </Wrapper>
    </Root>
  );
};

export default YaaLoader;
