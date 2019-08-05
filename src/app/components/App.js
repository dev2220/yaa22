// @flow
import React, {useState, useCallback, useEffect} from 'react';
import {hot} from 'react-hot-loader';
import ReactModal from 'react-modal';
import {YaaLoader} from 'shared/components';
import Defense from 'defense';
import Phones from 'phones';
import Protocols from 'protocols';
import Vision from 'vision';
import Roads from 'roads';
import {Switch, Route} from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';

ReactModal.setAppElement('#root');

const App = () => (
  <Switch>
    <Route path="/" exact component={Body} />
    <Route path="/defense" component={Defense} />
    <Route path="/phones" component={Phones} />
    <Route path="/protocols" component={Protocols} />
    <Route path="/roads" component={Roads} />
    <Route path="/vision" component={Vision} />
  </Switch>
);

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
    <>
      <YaaLoader visible={displayLoader} />
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar setIsSideBar={setIsSideBar} isSidebar={isSidebar} />
      <App />
    </>
  );
};

export default hot(module)(Root);
