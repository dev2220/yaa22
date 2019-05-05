import React from 'react';
import styled from 'styled-components';
import {Caption} from './SectionHeaders';

const Wrapper = styled.div`
  width: 384px;
`;

const Root = styled.div`
  display: flex;
`;

const InputWrapper = styled.div`
  flex: ${({grow}) => `${grow || 1} 1`};
  margin-right: 5px;
`;

const InlineInputs = ({children, title, tooltip}) => (
  <Wrapper>
    {title && <Caption tooltip={tooltip}>{title}</Caption>}
    <Root>
      {children?.map((child, idx) => (
        <InputWrapper key={idx} grow={child.grow}>
          {child}
        </InputWrapper>
      ))}
    </Root>
  </Wrapper>
);

export default InlineInputs;
