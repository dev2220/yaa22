// @flow
import React from 'react';
import {hot} from 'react-hot-loader';
import {GlobalStyles} from 'shared/theme';
import ReactModal from 'react-modal';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}
ReactModal.setAppElement('#root');

const App = () => (
  <>
    <GlobalStyles />
    <div>shon</div>
  </>
);

export default hot(module)(App);
