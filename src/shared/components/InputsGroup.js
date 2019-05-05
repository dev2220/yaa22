import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 14px;
  border-radius: 4px;
  background-color: ${({theme}) => theme.palette.greyBackground};
  width: fit-content;
  & > * {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const InputsGroup = ({children}) => <Wrapper>{children}</Wrapper>;

export default InputsGroup;
