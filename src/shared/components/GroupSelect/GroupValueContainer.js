import React from 'react';
import {withPropsOnChange, lifecycle, compose} from 'recompose';
import {differenceWith, isEqual} from 'lodash';
import styled from 'styled-components';
import {Text} from 'shared/components/Typography';

const GroupedWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;
`;

const GroupValueContainer = ({getValue, sumOptions, children}) => {
  const valuesCount = getValue().length;
  return (
    <GroupedWrapper>
      {valuesCount ? (
        `${valuesCount}/${sumOptions} selected`
      ) : (
        <Text error>At least one placement must be selected</Text>
      )}
      {children[1]}
    </GroupedWrapper>
  );
};

const compareToString = (val1, val2) => val1.toString() === val2.toString();

const removeForbiddenOptions = ({option, currentValue, getOptionValue}) => {
  let newValue = [...currentValue];
  option.forbiddenOptions.forEach(forbiddenOption => {
    newValue = currentValue
      .filter(val => !compareToString(getOptionValue(val), forbiddenOption))
      .filter(val => val.requiredOptions.indexOf(forbiddenOption) === -1);
  });
  return newValue;
};

const addRequiredOption = ({option, currentValue, getOptionValue, allOptions}) => {
  let newValue = [...currentValue];
  option.requiredOptions.forEach(requiredOption => {
    if (!currentValue.find(val => compareToString(getOptionValue(val), requiredOption))) {
      newValue.push(
        allOptions.find(globalOption =>
          compareToString(getOptionValue(globalOption), requiredOption)
        )
      );
    }
    newValue = newValue.filter(val => val.forbiddenOptions.indexOf(requiredOption) === -1);
  });
  return newValue;
};

const removeDependentRequiredOptions = ({currentValue, getOptionValue, option}) =>
  currentValue.filter(val => val.requiredOptions.indexOf(getOptionValue(option)) === -1);

const removeDependentForbiddenOption = ({currentValue, getOptionValue, option}) =>
  currentValue.filter(val => val.forbiddenOptions.indexOf(getOptionValue(option)) === -1);

export default compose(
  withPropsOnChange(['options'], ({options}) => ({
    sumOptions: options.reduce((sum, option) => sum + option.options.length, 0),
  })),
  lifecycle({
    componentDidUpdate(prevProps) {
      const {
        selectProps: {value, allOptions, getOptionValue, isGrouped},
        setValue,
      } = this.props;
      const prevValue = prevProps.selectProps.value || [];
      const currentValue = value || [];
      if (isGrouped && !isEqual(prevValue, currentValue)) {
        let newValue = [...currentValue];
        if (prevValue.length < currentValue.length) {
          const optionsToCheck = differenceWith(currentValue, prevValue, isEqual);
          optionsToCheck.forEach(option => {
            newValue = addRequiredOption({
              option,
              currentValue: newValue,
              getOptionValue,
              allOptions,
            });
            newValue = removeForbiddenOptions({currentValue: newValue, getOptionValue, option});
            newValue = removeDependentForbiddenOption({
              currentValue: newValue,
              getOptionValue,
              option,
            });
          });
          setValue(newValue);
        } else {
          const optionsToCheck = differenceWith(prevValue, currentValue, isEqual);
          optionsToCheck.forEach(option => {
            newValue = removeDependentRequiredOptions({
              currentValue: newValue,
              getOptionValue,
              option,
            });
          });
          setValue(newValue);
        }
      }
    },
  })
)(GroupValueContainer);
