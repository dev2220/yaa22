// @flow
import React, {useState, useCallback, useEffect} from 'react';
import {hot} from 'react-hot-loader';
import ReactModal from 'react-modal';
import {YaaLoader} from 'shared/components';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Body from './Body';

ReactModal.setAppElement('#root');

const App = () => {
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
      <Carousel />
      <Body />
      <Sidebar setIsSideBar={setIsSideBar} isSidebar={isSidebar} />
    </>
  );
};

export default hot(module)(App);
