import React from 'react';
import styled from 'styled-components';

import {Caption} from 'shared/components';
import {Text} from 'shared/components/Typography';

const DataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({isInfo, theme}) => (isInfo ? theme.palette.grey : 'inherit')};
`;

const Image = styled.img`
  margin-right: 8px;
  width: 24px;
  height: 24px;
  border-width: 0;
`;

const TextAndIcon = ({tooltip, title, isInfo, value = {}}) => (
  <div>
    {title && <Caption tooltip={tooltip}>{title}</Caption>}
    <DataWrapper isInfo={isInfo}>
      {value.icon && <Image src={value.icon} />}
      <Text disabled={isInfo}>{value.text}</Text>
    </DataWrapper>
  </div>
);

export default TextAndIcon;
