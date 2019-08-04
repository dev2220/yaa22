// @flow
import React, {useState, useEffect} from 'react';
import {hot} from 'react-hot-loader';
import ReactModal from 'react-modal';
import {YaaLoader} from 'shared/components';
import Defense from 'defense';
import {Switch, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Body from './Body';
import Sidebar from './Sidebar';

ReactModal.setAppElement('#root');

const App = () => (
  <Switch>
    <Route path="/" exact component={Body} />
    <Route path="/defense" component={Defense} />
  </Switch>
);

const Root = () => {
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
    </>
  );
};

export default hot(module)(Root);
