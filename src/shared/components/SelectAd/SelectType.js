import React from 'react';
import styled, {css} from 'styled-components';

const disabledOptionCss = css`
  cursor: not-allowed;
  opacity: 0.6;
  &:hover {
    box-shadow: 0 2px 4px 1px rgba(51, 51, 51, 0.2);
  }
`;

const Option = styled.div`
  border-radius: 2px;
  box-shadow: 0 2px 4px 1px rgba(51, 51, 51, 0.2);
  background-color: #ffffff;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  height: 102px;
  width: 210px;
  overflow: auto;
  cursor: pointer;
  &:hover {
    box-shadow: 0 6px 14px 1px rgba(51, 51, 51, 0.2);
  }
  ${({disabled}) => disabled && disabledOptionCss};
`;

const OptionHeader = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

const OptionText = styled.div`
  color: ${({theme}) => theme.palette.greyBlack};
`;

const SelectType = ({options, onChange}) =>
  options.map((option, idx) => (
    <Option
      onClick={
        !option.disabled
          ? () => {
              onChange(option);
            }
          : undefined
      }
      disabled={option.disabled}
      key={idx}
    >
      <OptionHeader>{option.header}</OptionHeader>
      <OptionText>{option.text}</OptionText>
    </Option>
  ));

export default SelectType;
