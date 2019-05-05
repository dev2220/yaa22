import React from 'react';
import {isEqual} from 'lodash';
import styled from 'styled-components';
import {SelectableButton} from './Button';

export const SelectableButtons = styled.div`
  display: flex;
  ${SelectableButton} {
    color: ${({theme}) => theme.palette.black};
    border-color: ${({theme}) => theme.palette.greyWhite};
    border-radius: 0;
    border-right-width: 0;
    &:last-child {
      border-right-width: 1px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    &:first-child {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
  }
  &&& {
    width: auto;
  }
`;

const ButtonGroup = ({value, disabledOptions, onChange, options}) => (
  <SelectableButtons>
    {options.map((item, idx) => (
      <SelectableButton
        key={JSON.stringify(item)}
        selected={isEqual(value, item)}
        onClick={() => onChange(item)}
        disabled={disabledOptions?.includes(item)}
        shouldDisplayBorderLeft={idx > 0 && !disabledOptions?.includes(options[idx - 1])}
        groupOption
      >
        {item}
      </SelectableButton>
    ))}
  </SelectableButtons>
);

export default ButtonGroup;
