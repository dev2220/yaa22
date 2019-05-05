import React, {useMemo, useCallback} from 'react';
import styled from 'styled-components';
import {defaultGetOptionLabel, defaultGetOptionValue} from '../../shared/utils/select';
import RadioGroup from './RadioGroup';
import GroupSelect from './GroupSelect';

const AddtitionalFieldsWrapper = styled.div`
  margin-left: 23px;
  max-width: ${({theme}) => theme.input.sizes.medium};
`;

const defaultGetSelectedLabel = option => option?.label;
const defaultGetSelectedValue = option => option?.mode;

const getAllOptions = ({radio}) =>
  radio?.options?.reduce((prev, next) => [...prev, ...next.options], []) || [];

const PlacementRadioGroup = ({
  options,
  value,
  onChange,
  placeholder,
  getSelectedOption = option => option?.options,
  selectValueProp = 'placementIds',
  getSelectedLabel = defaultGetSelectedLabel,
  getSelectedValue = defaultGetSelectedValue,
  getOptionLabel = defaultGetOptionLabel,
  getOptionValue = defaultGetOptionValue,
  getHeaderLabel = option => option.name,
  children,
}) => {
  const {allOptions, selectedValue} = useMemo(() => {
    const selected = options.find(option => getSelectedValue(option) === getSelectedValue(value));
    const all = getAllOptions({radio: selected});
    return {allOptions: all, selectedValue: selected};
  }, [getSelectedValue, options, value]);

  const handleOnRadioChange = useCallback(
    radio => {
      const all = getAllOptions({radio});
      onChange({...radio, [selectValueProp]: all.map(val => getOptionValue(val))});
    },
    [getOptionValue, onChange, selectValueProp]
  );
  return (
    <RadioGroup options={options} value={selectedValue} onChange={handleOnRadioChange}>
      {selectedValue?.options && (
        <GroupSelect
          marginLeft={23}
          size="medium"
          menuIsOpen
          isRemovedArrow
          label={getSelectedLabel(selectedValue)}
          placeholder={placeholder}
          onChange={values =>
            onChange({...value, [selectValueProp]: values.map(val => getOptionValue(val))})
          }
          isMulti
          isGrouped
          isCheckedOptions
          value={
            value &&
            value[selectValueProp]?.map(val => allOptions?.find(opt => getOptionValue(opt) === val))
          }
          allOptions={allOptions}
          options={getSelectedOption(selectedValue)}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          getHeaderLabel={getHeaderLabel}
          error={!value?.placementIds?.length}
        />
      )}
      {selectedValue?.options && <AddtitionalFieldsWrapper>{children}</AddtitionalFieldsWrapper>}
    </RadioGroup>
  );
};

export default PlacementRadioGroup;
