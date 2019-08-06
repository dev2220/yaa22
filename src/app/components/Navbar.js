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
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
`;

const IconWithOutExtraProps = ({isHidden: _ignore, ...rest}) => <Icon {...rest} />;

const MenuIcon = styled(IconWithOutExtraProps).attrs(() => ({icon: faBars}))`
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
  opacity: ${({isHidden}) => (isHidden ? 0 : 1)};
  pointer-events: ${({isHidden}) => isHidden && 'none'};
`;

const Navbar = ({toggleSidebar, history: {location, push}}) => (
  <Root>
    <MenuIcon onClick={toggleSidebar} />
    <YaaIcon src="yaa22.png" />
    <BackIcon isHidden={location.pathname === '/'} onClick={() => push('/')} />
  </Root>
);
export default withRouter(Navbar);
