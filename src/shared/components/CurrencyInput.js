import React from 'react';
import InputNumber from 'rc-input-number';
import styled from 'styled-components';
import {faDollarSign, faPercent} from '@fortawesome/free-solid-svg-icons';
import {inputCss, AlertText} from './Input';
import Icon from './Icon';

const StyledInputNumber = styled(InputNumber)`
  width: 67px;
  &.rc-input-number {
    .rc-input-number-handler-wrap {
      display: none;
    }

    .rc-input-number-input-wrap > input {
      ${inputCss};
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

const IconWrapper = styled.div`
  background-color: ${({theme}) => theme.palette.greyBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  flex-shrink: 0;
  font-size: 10px;
  border: solid 1px ${({theme}) => theme.palette.greyWhite};
  border-right: ${({side}) => (side === 'left' ? 'none' : 'inital')};
  border-left: ${({side}) => (side === 'right' ? 'none' : 'inital')};
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;

  > svg {
    margin: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 13px;
  margin-right: 8px;
  align-self: center;
`;

const SecondaryText = styled(Text)`
  font-weight: normal;
  color: ${({theme}) => theme.palette.greyBlack};
  margin-right: 0;
  margin-left: 7px;
`;

const CustomAlertText = styled(AlertText)`
  position: absolute;
  top: 35px;
  left: ${({inlineError}) => (inlineError ? '55' : '0')}px;
  width: 135px;
  margin-left: 0;
`;

const icons = {PERCENTAGE: faPercent, CURRENCY: faDollarSign};
const CurrencyInput = ({
  value,
  sign = 'CURRENCY',
  min = 0,
  text,
  secondaryText,
  disabled,
  onChange,
  error,
  inlineError = false,
}) => (
  <Wrapper>
    {text && <Text>{text}</Text>}
    {sign === 'CURRENCY' && (
      <IconWrapper side="left">
        <Icon icon={icons[sign]} />
      </IconWrapper>
    )}
    <StyledInputNumber
      full
      min={min}
      disabled={disabled}
      value={value}
      onChange={onChange}
      precision={sign === 'PERCENTAGE' ? 0 : 2}
      formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      error={error}
    />
    {sign === 'PERCENTAGE' && (
      <IconWrapper side="right">
        <Icon icon={icons[sign]} />
      </IconWrapper>
    )}
    {secondaryText && <SecondaryText>{secondaryText}</SecondaryText>}
    {error && <CustomAlertText inlineError={inlineError} error={error}>{error}</CustomAlertText>}
  </Wrapper>
);

export default CurrencyInput;
