import React from 'react';
import styled, {css} from 'styled-components';

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const selectedTabCss = css`
  font-weight: 600;
  color: ${({theme}) => theme.palette.black};
  border-bottom-color: ${({theme}) => theme.palette.blue};
`;

const Tab = styled.div`
  padding: 18px;
  cursor: pointer;
  padding-bottom: 10px;
  line-height: 17px;
  border-radius: 2px;
  font-size: 20px;
  color: ${({theme}) => theme.palette.greyBlack};
  border-bottom: 4px solid transparent;
  margin-right: 50px;
  &:last-child {
    margin-right: 0;
  }
  ${({isSelected}) => isSelected && selectedTabCss};
`;

const Tabs = ({tabs, onTabClick, selectedTab}) => (
  <Root>
    {tabs.map((tab, idx) => (
      <Tab onClick={() => onTabClick(tab)} key={idx} isSelected={tab === selectedTab}>
        {tab}
      </Tab>
    ))}
  </Root>
);

export default Tabs;
