// @flow
import React, {useState, useEffect} from 'react';
import {hot} from 'react-hot-loader';
import ReactModal from 'react-modal';
import {YaaLoader} from 'shared/components';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Body from './Body';

ReactModal.setAppElement('#root');

const App = () => {
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
      <Carousel />
      <Body />
    </>
  );
};

export default hot(module)(App);
