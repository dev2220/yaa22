import React from 'react';
import styled from 'styled-components';
import Icon from 'shared/components/Icon';
import {faHome, faCheck, faVideo} from '@fortawesome/free-solid-svg-icons';
import ClickOutSide from 'react-click-outside';

const Root = styled(ClickOutSide)`
  display: flex;
  flex-direction: column;
  position: fixed;
  background: white;
  left: ${({isSidebar}) => (isSidebar ? '90px' : '100vw')};
  padding-right: 90px;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  transition: left 0.5s;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: rgba(200, 200, 200, 0.7) 1px solid;
  background-color: ${({isSelected}) => isSelected && 'rgba(120, 150, 255, 0.8)'};
`;

const Text = styled.p``;

const StyledIcon = styled(Icon)`
  margin: 0 15px;
  &&& {
    width: 30px;
    height: 30px;
  }
`;

const Item = ({icon, children, isSelected}) => (
  <Wrapper isSelected={isSelected}>
    <StyledIcon icon={icon} />
    <Text>{children}</Text>
  </Wrapper>
);

const Sidebar = ({setIsSideBar, isSidebar}) => (
  <Root isSidebar={isSidebar} onClickOutside={() => setIsSideBar(false)}>
    <Item isSelected icon={faHome}>
      בבנייה
    </Item>
    <Item icon={faCheck}>בבנייה2</Item>
    <Item icon={faVideo}>בבנייה3</Item>
  </Root>
);
export default Sidebar;
