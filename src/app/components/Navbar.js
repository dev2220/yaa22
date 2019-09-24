import React from 'react';
import styled, {keyframes} from 'styled-components';
import {Icon} from 'shared/components';
import {withRouter} from 'react-router-dom';
import {faArrowLeft, faBars} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF} from '@fortawesome/free-brands-svg-icons';

const anim = keyframes`
 from{
 transform: rotateY(0deg);
 }
 to{
 transform: rotateY(360deg);
}`;

const Root = styled.div`
  height: ${({theme}) => theme.navBar.height.mobile};
  border-bottom: 1px solid ${({theme}) => theme.palette.greyWhite};
  padding: 4px;
  background-size: 100%;
  display: flex;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const FacebookIcon = styled(Icon).attrs(() => ({icon: faFacebookF}))`
  &&& {
    width: 55px;
    height: 40px;
    color: #3c5a99;
  }
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
  animation: ${anim} 2s infinite ease-in-out;
  position: absolute;
  right: 40%;
`;

const MakoIcon = styled.img`
  width: 75px;
`;

const BackIcon = styled(MenuIcon).attrs(() => ({icon: faArrowLeft}))`
  display: ${({isHidden}) => (isHidden ? 'none' : 'flex')};
`;

const SocialWrapper = styled.div`
  display: ${({isHidden}) => (isHidden ? 'none' : 'flex')};
  align-items: center;
  justify-content: flex-end;
`;

const Navbar = ({toggleSidebar, history: {location, push}}) => (
  <Root>
    <Wrapper>
      <MenuIcon onClick={toggleSidebar} />
      <YaaIcon src="yaa22.png" />
      <SocialWrapper isHidden={location.pathname !== '/'}>
        <a href="https://www.facebook.com/YAA22">
          <FacebookIcon />
        </a>
        <a href="https://www.mako.co.il/pzm-units/air-force/Article-00897aae7467d41006.htm">
          <MakoIcon src="assets/mako.png" />
        </a>
      </SocialWrapper>
      <BackIcon isHidden={location.pathname === '/'} onClick={() => push('/')} />
    </Wrapper>
  </Root>
);
export default withRouter(Navbar);
