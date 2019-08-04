// @flow
import React, {useState, useCallback, useEffect} from 'react';
import {hot} from 'react-hot-loader';
import ReactModal from 'react-modal';
import {YaaLoader} from 'shared/components';
import Defense from 'defense';
import {Switch, Route} from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';

ReactModal.setAppElement('#root');

const App = () => (
  <Switch>
    <Route path="/" exact component={Body} />
    <Route path="/defense" component={Defense} />
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
      <Navbar />
      <App />
      {/* <Sidebar /> */}
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar setIsSideBar={setIsSideBar} isSidebar={isSidebar} />
    </>
  );
};

export default hot(module)(Root);
