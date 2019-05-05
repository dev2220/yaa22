import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: fit-content;
  & > * {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const FieldsGroup = ({children}) => <Wrapper>{children}</Wrapper>;

export default FieldsGroup;
