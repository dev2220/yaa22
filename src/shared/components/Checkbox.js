import React from 'react';
import styled, {withTheme} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {WithInfo} from './Typography';
import {Caption} from './SectionHeaders';

const Icon = styled(FontAwesomeIcon)`
  width: 100% !important;
  height: 100%;
  padding: 0 2px;
  color: white;
`;

const CheckboxWrapper = styled.div`
  white-space: nowrap;
`;

const Label = styled.label`
  display: flex;
  position: relative;
  cursor: ${({disabled}) => (disabled ? 'arrow' : 'hand')};
  height: ${({theme}) => theme.checkbox.height}px;
  padding-left: ${({theme, showBox}) => (showBox ? theme.checkbox.height : 0)}px;
  margin-top: ${({title}) => (title ? 10 : 0)}px;
  align-items: center;
`;

const Text = styled.span`
  margin-left: 6px;
  color: ${({theme, disabled}) =>
    disabled ? theme.checkbox.disabledTextColor : theme.checkbox.textColor};
`;

const Helper = styled.i`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  user-select: none;
  width: ${({theme}) => theme.checkbox.checkBoxSize}px;
  height: ${({theme}) => theme.checkbox.checkBoxSize}px;
  z-index: 0;
  border: ${({theme}) => theme.checkbox.helperBorderWidth}px solid
    ${({theme}) => theme.checkbox.helperBorderColor};
  border-radius: 2px;
  transition: border-color 0.18s ease;
`;

const Input = styled.input`
  width: auto;
  opacity: 0.00000001;
  position: absolute;
  margin: 0;
  left: 0;
  top: 0;
  cursor: ${({disabled}) => (disabled ? 'arrow' : 'hand')};

  &:disabled ${Helper}, &:disabled + ${Text} {
    color: ${({theme}) => theme.checkbox.textColor};
    opacity: 0.5;
  }

  &:checked ~ ${Helper} {
    border-color: ${({theme}) => theme.checkbox.selectedColor};
    background-color: ${({theme}) => theme.checkbox.selectedColor};
  }

  &:checked + ${Text} {
    color: ${({theme}) => theme.checkbox.selectedTextColor};
  }

  &:invalid ~ ${Helper}, &:invalid + ${Text} {
    color: ${({theme}) => theme.checkbox.invalidColor};
    border-color: ${({theme}) => theme.checkbox.invalidColor};
  }
`;
const CheckboxInfo = styled(WithInfo)`
  line-height: 15px;
  margin: 0;
  color: ${({theme, disabled}) => (disabled ? theme.palette.grey : 'inherit')};
`;

const Checkbox = ({
  checked,
  disabled,
  onChange,
  onClick,
  title,
  tooltip,
  checkboxLabel,
  checkType = 'check',
  showBox = true,
  className,
  theme,
}) => (
  <CheckboxWrapper className={className} onClick={onClick}>
    {title && <Caption tooltip={tooltip}>{title}</Caption>}
    <Label title={title} showBox={showBox} disabled={disabled}>
      <Input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={({target: {checked: isChecked}}) => {
          onChange(isChecked);
        }}
      />
      {checkboxLabel && (
        <CheckboxInfo tooltip={tooltip}>
          <Text disabled={disabled}>{checkboxLabel}</Text>
        </CheckboxInfo>
      )}
      {showBox && (
        <Helper>{checked ? <Icon icon={theme.checkbox.checkIcons[checkType]} /> : null}</Helper>
      )}
    </Label>
  </CheckboxWrapper>
);

export default withTheme(Checkbox);
