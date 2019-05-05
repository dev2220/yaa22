import styled from 'styled-components';
import {components} from 'react-select';
import React from 'react';
import {TertiaryButton} from './Button';

const Button = styled(TertiaryButton)`
  font-size: 11px;
  color: ${({isSelected, theme: {palette}}) => (isSelected ? palette.black : palette.grey)};
  padding: 8px 10px;
  pointer-events: ${({isSelected}) => (isSelected ? 'none' : 'auto')};
`;

const Separator = styled.span`
  align-self: stretch;
  background: ${({theme}) => theme.palette.controlBorder};
  margin: 6px 0;
  width: 1px;
`;

const TextDropdownIndicator = ({onClick, isSelected, title, disabled}) => props => (
  <components.DropdownIndicator {...props}>
    <Separator />
    <Button
      isSelected={isSelected}
      disabled={disabled}
      onMouseDown={e => e.stopPropagation()}
      onClick={e => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      {title}
    </Button>
  </components.DropdownIndicator>
);

export default TextDropdownIndicator;
