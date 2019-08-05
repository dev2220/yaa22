import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const IndicatorWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: white;
  opacity: 0.5;
`;

const LoadingIndicator = ({className, color = 'gray', size = 40}) => (
  <IndicatorWrapper className={className}>
    <ReactLoading type="spin" color={color} height={size} width={size} />
  </IndicatorWrapper>
);

export default LoadingIndicator;
