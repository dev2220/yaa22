// @flow
import React, {useState, useCallback, useEffect} from 'react';
import {hot} from 'react-hot-loader';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import {YaaLoader} from 'shared/components';
import Defense from 'defense';
import Phones from 'phones';
import Protocols from 'protocols';
import Vision from 'vision';
import Gallery from 'gallery';
import Roads from 'roads';
import Wiki from 'wiki';
import NewSoldier from 'newsoldier';
import posed, {PoseGroup} from 'react-pose';
import {Switch, Route} from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';

const RouteContainer = posed.div({
  enter: {opacity: 1, beforeChildren: true},
  exit: {opacity: 0},
});
ReactModal.setAppElement('#root');

const security = new Array(10)
  .fill(0)
  .map((val, idx) => `assets/secure/${idx + 1}.jpg`)
  .reverse();
const quality = new Array(9)
  .fill(0)
  .map((val, idx) => `assets/quality/${idx + 1}.jpg`)
  .reverse();
const App = () => (
  <Route
    render={({location}) => (
      <PoseGroup>
        <RouteContainer key={location.key}>
          <Switch location={location}>
            <Route path="/" exact component={Body} />
            <Route path="/defense" component={Defense} />
            <Route path="/phones" component={Phones} />
            <Route path="/protocols" component={Protocols} />
            <Route path="/roads" component={Roads} />
            <Route path="/vision" component={Vision} />
            <Route path="/wiki" component={Wiki} />
            <Route path="/newsoldier" component={NewSoldier} />
            <Route path="/security" component={() => <Gallery imgs={security} />} />
            <Route path="/quality" component={() => <Gallery imgs={quality} />} />
          </Switch>
        </RouteContainer>
      </PoseGroup>
    )}
  />
);

const Wrapper = styled.div`
  padding-top: ${({theme}) => theme.navBar.height.mobile};
`;

const Root = () => {
  const [isSidebar, setIsSideBar] = useState(false);
  const toggleSidebar = useCallback(() => setIsSideBar(e => !e), []);
  const [displayLoader, setDisplayLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisplayLoader(false);
    }, 1500);
  }, []);
  return (
    <Wrapper>
      <YaaLoader visible={displayLoader} />
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar setIsSideBar={setIsSideBar} isSidebar={isSidebar} />
      <App />
    </Wrapper>
  );
};

export default hot(module)(Root);
