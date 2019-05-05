import React from 'react';
import {isEqual} from 'lodash';
import Radio from './Radio';
import {RadioGroupWrapper} from '../VariationsEditor/styled';
import {Caption, WithInfo} from '../Typography';

const RadioGroup = ({value, onChange, groupLabel, groupTooltip, options, children}) => (
  <RadioGroupWrapper>
    {groupLabel && (
      <WithInfo tooltip={groupTooltip}>
        <Caption>{groupLabel}</Caption>
      </WithInfo>
    )}
    {options.map((item, idx) => {
      const isSelected = isEqual(value, item);
      return (
        <Radio
          key={idx}
          tooltip={item?.tooltip}
          checked={isSelected}
          name={item.label}
          disabled={item.disabled}
          onClick={() => !item.disabled && onChange(item)}
        >
          {isSelected && children}
        </Radio>
      );
    })}
  </RadioGroupWrapper>
);

export default RadioGroup;
