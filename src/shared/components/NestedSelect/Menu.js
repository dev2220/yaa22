import React from 'react';
import {components} from 'react-select';
import Hint from '../Hint';

const Menu = props => {
  const {
    selectProps: {currentHint},
  } = props;
  return (
    <>
      <Hint hint={currentHint} />
      <components.Menu {...props} />
    </>
  );
};

export default Menu;
