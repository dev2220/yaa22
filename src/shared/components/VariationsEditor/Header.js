import React from 'react';
import styled from 'styled-components';
import {Caption} from '../SectionHeaders';

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const ExcludeButton = styled.button`
  color: ${({theme}) => theme.palette.blue};
  background: transparent;
  padding: 0;
  margin-right: ${({shouldExcludeSpace}) => shouldExcludeSpace && '63px'};
  margin-bottom: 7px;
  :disabled {
    color: ${({theme}) => theme.palette.grey};
    opacity: 0.4;
    cursor: initial;
  }
  cursor: pointer;
`;

const Header = ({title, tooltip, shouldExcludeSpace, setExcludeOn, isExcludeOn}) => (
  <HeaderWrapper>
    {title && <Caption tooltip={tooltip}>{title}</Caption>}
    {setExcludeOn && (
      <ExcludeButton
        shouldExcludeSpace={shouldExcludeSpace}
        disabled={isExcludeOn}
        onClick={setExcludeOn}
      >
        Exclude
      </ExcludeButton>
    )}
  </HeaderWrapper>
);

export default Header;
