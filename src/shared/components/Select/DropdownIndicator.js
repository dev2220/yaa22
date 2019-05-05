import React from 'react';
import {components} from 'react-select';
import ArrowIcon from '../ArrowIcon';

const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <ArrowIcon isMenu={props.selectProps.menuIsOpen} />
  </components.DropdownIndicator>
);

export default DropdownIndicator;
