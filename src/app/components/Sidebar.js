import React, {useCallback} from 'react';
import styled, {css} from 'styled-components';
import Icon from 'shared/components/Icon';
import {Link, Route} from 'react-router-dom';
import {faHome, faCheck} from '@fortawesome/free-solid-svg-icons';
import ClickOutSide from 'react-click-outside';

const ClickOutSideWithoutExtraProps = ({isSidebar: _ignore, ...rest}) => <ClickOutSide {...rest} />;

const Root = styled(ClickOutSideWithoutExtraProps)`
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

const activeLink = css`
  background-color: rgba(120, 150, 255, 0.8);
`;

const MyLink = styled(Link)`
  color: black;
  display: flex;
  align-items: center;
  border-bottom: rgba(200, 200, 200, 0.7) 1px solid;
  padding: 15px;
  &:focus,
  &:active {
    color: black;
    text-decoration: none;
  }
  ${({isActive}) => isActive && activeLink}
`;

const Wrapper = ({to, ...rest}) => (
  <Route exact path={to}>
    {({match}) => <MyLink {...rest} to={to} isActive={match} />}
  </Route>
);

const Text = styled.p`
  margin: 0;
`;

const StyledIcon = styled(Icon)`
  margin-left: 10px;
  &&& {
    width: 30px;
    height: 30px;
  }
`;

const Item = ({icon, closeSideBar, to, children}) => (
  <Wrapper to={to} onClick={closeSideBar}>
    <StyledIcon icon={icon} />
    <Text>{children}</Text>
  </Wrapper>
);

const Sidebar = ({setIsSideBar, isSidebar}) => {
  const closeSideBar = useCallback(() => setIsSideBar(false), [setIsSideBar]);
  return (
    <Root isSidebar={isSidebar} onClickOutside={() => setIsSideBar(false)}>
      <Item closeSideBar={closeSideBar} to="/" isSelected icon={faHome}>
        ראשי
      </Item>
      <Item closeSideBar={closeSideBar} to="/wiki" icon={faCheck}>
        ויקיפדיה
      </Item>
    </Root>
  );
};
export default Sidebar;
