import React from 'react';
import styled from 'styled-components';
import {WithInfo} from '../Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 18px;
`;

const Text = styled.div`
  color: #858585;
`;

const Information = ({title, tooltip, children}) => (
  <Wrapper>
    <WithInfo tooltip={tooltip}>
      <Title>{title}</Title>
    </WithInfo>
    <Text>{children}</Text>
  </Wrapper>
);

export default Information;
