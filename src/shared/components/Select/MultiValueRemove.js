import React from 'react';
import {components} from 'react-select';
import RemoveIcon from '../RemoveIcon';

const MultiValueRemove = props =>
  !props.data.hideRemove ? (
    <components.MultiValueRemove {...props}>
      <RemoveIcon disabled={props.selectProps.isDisabled} />
    </components.MultiValueRemove>
  ) : (
    <RemoveIcon hide />
  );

export default MultiValueRemove;
