// @flow
import React from 'react';
import {hot} from 'react-hot-loader';
import ReactModal from 'react-modal';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Body from './Body';

ReactModal.setAppElement('#root');

const App = () => (
  <>
    <Navbar />
    <Carousel />
    <Body />
  </>
);

export default hot(module)(App);
