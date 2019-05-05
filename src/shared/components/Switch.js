import React from 'react';
import styled from 'styled-components';
import RcSwitch from 'rc-switch';

import {Text} from './Typography';

const Label = styled(Text)`
  margin-left: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

const Switch = ({label, value, ...rest}) => (
  <Wrapper>
    <RcSwitch checked={value} {...rest} />
    {label && <Label>{label}</Label>}
  </Wrapper>
);

export default Switch;
