import styled from 'styled-components';
import BaseOptionWrapper from '../OptionWrapper';
import Icon from '../Icon';

export const OptionWrapper = styled(BaseOptionWrapper)`
  display: flex;
  padding: 10px 8px 10px 16px;
  padding-left: ${({leftPadding}) => leftPadding || 16}px;
  border: none;
  background-color: white;

  > ${Icon} {
    color: ${({theme}) => theme.palette.greyWhite};
    font-size: 11px;
    margin-right: 10px;
  }
  &:hover > ${Icon} {
    color: #ffffff;
  }
`;

export const Label = styled.label`
  text-align: left;
  cursor: pointer;
  flex-grow: 1;
`;

export const Score = styled.span`
  color: ${({theme}) => theme.palette.grey};
  margin-right: 6px;
`;
