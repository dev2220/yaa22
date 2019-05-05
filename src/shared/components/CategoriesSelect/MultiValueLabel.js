import React from 'react';
import {components} from 'react-select';

const MultiValueLabel = ({children, ...rest}) => {
  const {
    selectProps: {getSecondValueLabel},
    data,
  } = rest;
  return (
    <components.MultiValueLabel {...rest}>
      {children}
      {getSecondValueLabel && getSecondValueLabel(data)}
    </components.MultiValueLabel>
  );
};

export default MultiValueLabel;
