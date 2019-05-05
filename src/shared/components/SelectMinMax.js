import React from 'react';
import styled from 'styled-components';
import {defaultGetOptionValue} from 'shared/utils/select';
import {ErrorMsg} from 'shared/components/VariationsEditor/styled';
import Select from './Select';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  &&& {
    width: auto;
  }
`;
const SelectWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  &&& {
    width: 240px;
  }
  .select__menu {
    z-index: 3;
  }
`;

const Space = styled.div`
  margin: 0px 16px;
  margin-bottom: 17.5px;
  width: 30px;
  border-bottom: 1px solid ${({theme}) => theme.palette.grey};
`;

const SelectMinMax = ({
  value = {},
  getOptionValue = defaultGetOptionValue,
  onChange,
  isMappedValue,
  hasError,
  minTitle,
  maxTitle,
  title,
  tooltip,
  options,
  isVariation,
  ...rest
}) => (
  <Root>
    <SelectWrapper>
      <Select
        title={title}
        tooltip={tooltip}
        subTitle={minTitle}
        value={value.min}
        onChange={selected =>
          onChange({
            ...value,
            min: isMappedValue ? getOptionValue(selected) : selected,
            max: parseFloat(selected.id) > parseFloat(value.max) ? selected.id : value.max,
          })
        }
        isMappedValue={isMappedValue}
        error={!!hasError}
        options={options.slice(0, options.length - 1)}
        isSearchable={false}
        {...rest}
      />
      <Space />
      <Select
        subTitle={maxTitle}
        value={value.max}
        onChange={selected =>
          onChange({
            ...value,
            max: isMappedValue ? getOptionValue(selected) : selected,
            min: parseFloat(selected.id) < parseFloat(value.min) ? selected.id : value.min,
          })
        }
        isMappedValue={isMappedValue}
        error={!!hasError}
        options={options}
        isSearchable={false}
        {...rest}
      />
    </SelectWrapper>
    {hasError && !isVariation && <ErrorMsg>{hasError}</ErrorMsg>}
  </Root>
);

export default SelectMinMax;
