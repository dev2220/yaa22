import React, {Fragment} from 'react';
import styled from 'styled-components';
import {RadioRoot} from '../VariationsEditor/styled';
import {WithInfo} from '../Typography';

const Button = styled.span`
  position: absolute;
  top: calc(50% - 8px);
  left: 0;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  border: solid 1px ${({theme}) => theme.palette.grey};
  opacity: ${({disabled}) => (disabled ? 0.3 : 1)};

  :after {
    content: '';
    position: absolute;
    background: white;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Input = styled.input.attrs(({disabled}) => ({
  type: 'radio',
  disabled,
}))`
  margin: 0;
  opacity: 0;
  height: 16px;
  width: 16px;
  cursor: pointer;
  :checked + ${Button} {
    background-color: white;
    border-color: ${({theme}) => theme.palette.blue};
    :after {
      display: block;
      background-color: ${({theme}) => theme.palette.blue};
    }
  }
`;

const Label = styled.span`
  font-size: ${({theme}) => theme.typography.texts.sizes.medium}px;
  margin-left: 8px;
  color: ${({disabled, theme}) => (disabled ? theme.palette.grey : 'initial')};
`;

const CustomInfo = styled(WithInfo)`
  margin-bottom: 0;
`;

const Radio = ({name, onClick, tooltip, checked, disabled, children, className, ...rest}) => (
  <Fragment>
    <RadioRoot disabled={disabled} onClick={onClick} className={className}>
      <Input readOnly disabled={disabled} {...{...rest, checked, disabled}} />
      <Button disabled={disabled} />
      <CustomInfo tooltip={tooltip}>
        <Label disabled={disabled}>{name}</Label>
      </CustomInfo>
    </RadioRoot>
    {children}
  </Fragment>
);

export default Radio;
