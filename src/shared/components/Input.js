import React from 'react';
import styled, {css} from 'styled-components';
import {Text} from './Typography';
import {Caption} from './SectionHeaders';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({isFull = true}) => isFull && '100%'};
  color: ${({theme}) => theme.palette.black};
`;

export const disabledCss = css`
  border: solid 1px ${({theme}) => theme.palette.disableInputBorder};
  background-color: ${({theme}) => theme.palette.disableInput};
  ::placeholder {
    opacity: 0.5;
  }
  :hover {
    border: solid 1px ${({theme}) => theme.palette.disableInputBorder};
  }
`;

export const focusCss = css`
  border: solid 1px ${({theme}) => theme.palette.blue};
`;

export const basicBorder = css`
  border: solid 1px ${({theme}) => theme.palette.greyWhite};
  border-color: ${({theme, error}) =>
    error || error?.length ? theme.palette.red : theme.palette.greyWhite};
  border-color: ${({theme, success}) => success && theme.palette.green};
`;

export const AlertText = styled(Text)`
  margin-left: ${({theme}) => theme.input.padding}px;
  margin-top: 5px;
  font-size: 11px;
  line-height: 1.1;
`;

export const inputCss = css`
  background-color: white;
  padding: ${({theme}) => theme.input.padding}px;
  width: ${({full}) => (full ? '100%' : '300px')};
  height: 35px;
  font-size: 14px;
  border-radius: 2px;
  :hover {
    ${basicBorder};
  }
  :focus {
    ${({error, success}) => !error && !success && focusCss};
  }

  ${basicBorder};
  ${({disabled, isDisabled}) => (disabled || isDisabled) && disabledCss};
`;

export const Input = styled.input.attrs(({disabled}) => ({
  disabled,
  type: 'text',
}))`
  ${inputCss};
`;

const TextInput = ({error, success, label, required, disabled, placeholder, tooltip, ...rest}) => (
  <Root>
    {label && <Caption tooltip={tooltip}>{label}</Caption>}
    <Input
      {...{error, success, required, disabled, ...rest}}
      placeholder={required && !disabled ? `${placeholder} *` : placeholder}
    />
    {error?.length && <AlertText error={error}>{error}</AlertText>}
    {success && <AlertText success={success}>{success}</AlertText>}
    {required && <AlertText disabled={disabled}>{`*${required}`}</AlertText>}
  </Root>
);

export default TextInput;
