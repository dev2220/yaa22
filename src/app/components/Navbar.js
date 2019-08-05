import React from 'react';
import styled from 'styled-components';
import {Icon} from 'shared/components';
import {withRouter} from 'react-router-dom';
import {faArrowLeft, faBars} from '@fortawesome/free-solid-svg-icons';

const Root = styled.div`
  height: ${({theme}) => theme.navBar.height.mobile};
  border-bottom: 1px solid ${({theme}) => theme.palette.greyWhite};
  padding: 4px;
  display: flex;
  justify-content: space-between;
`;

const MenuIcon = styled(Icon).attrs(() => ({icon: faBars}))`
  height: 100%;
  padding: 10px;
  &&& {
    width: unset !important;
  }
`;

const YaaIcon = styled.img`
  width: auto;
  height: 100%;
`;

const BackIcon = styled(MenuIcon).attrs(() => ({icon: faArrowLeft}))`
  opacity: ${({hidden}) => (hidden ? 0 : 1)};
  pointer-events: ${({hidden}) => hidden && 'none'};
`;

const Navbar = ({toggleSidebar, history: {location, push}}) => (
  <Root>
    <MenuIcon onClick={toggleSidebar} />
    <YaaIcon src="yaa22.png" />
    <BackIcon hidden={location.pathname === '/'} onClick={() => push('/')} />
  </Root>
);
export default withRouter(Navbar);
