import React from 'react';
import styled from 'styled-components';
import {Icon} from 'shared/components';
import {faSearch, faBars} from '@fortawesome/free-solid-svg-icons';
import yaa22 from 'shared/assets/yaa22.png';

const Root = styled.div`
  height: ${({theme}) => theme.navBar.height.mobile};
  border-bottom: 1px solid ${({theme}) => theme.palette.greyWhite};
  padding: 4px;
  display: flex;
  justify-content: space-between;
`;

const SearchIcon = styled(Icon).attrs(() => ({icon: faSearch}))`
  height: 100%;
  padding: 10px;
  &&& {
    width: unset !important;
  }
`;

const YaaIcon = styled.img.attrs(() => ({src: yaa22}))`
  width: auto;
  height: 100%;
`;

const MenuIcon = styled(SearchIcon).attrs(() => ({icon: faBars}))``;

const Navbar = ({toggleSidebar}) => (
  <Root>
    <MenuIcon onClick={toggleSidebar} />
    <YaaIcon />
    <SearchIcon />
  </Root>
);
export default Navbar;
