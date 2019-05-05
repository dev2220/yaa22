import React from 'react';
import styled from 'styled-components';
import {compose, withPropsOnChange, lifecycle, onlyUpdateForKeys} from 'recompose';
import {toWholeCurrency} from 'shared/utils/numberUtils';
import OptionWrapper from '../OptionWrapper';
import TextWrapper from '../TextWrapper';
import InfoWrapper from '../InfoWrapper';
import Checkbox from '../Checkbox';
import Icon from '../Icon';
import Tooltip from '../Tooltip';

const SecondTextWrapper = styled(TextWrapper)`
  margin-left: auto;
  font-size: 12px;
  color: ${({theme}) => theme.palette.greyBlack};
`;

const LeftCheckboxWrapper = styled.div`
  margin-left: auto;
`;

const OptionLabel = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Option = ({
  innerProps,
  isDisabled,
  label,
  data,
  isSelected,
  requiredOptions,
  isCheckedOption,
  iconSpace,
  indention = 0,
  secondLabel,
  selectProps: {isCheckedOptions, getSecondRow, hideSelectedOptions, isGrouped},
  theme: _ignore2,
  cx: _ignore3,
  children,
  useChildren,
  isFocused,
  innerRef,

  ...rest
}) =>
  !hideSelectedOptions || !isSelected || isCheckedOptions || isCheckedOption ? (
    <OptionWrapper
      isGrouped={isGrouped}
      isCheckedOptions={isCheckedOptions}
      isSelected={!isCheckedOption && isSelected}
      iconSpace={iconSpace}
      indention={indention}
      isDisabled={isDisabled}
      isFocused={!isCheckedOptions && isFocused}
      ref={innerRef}
      {...innerProps}
      {...rest}
    >
      {useChildren ? (
        children
      ) : (
        <InfoWrapper>
          {isCheckedOptions && <Checkbox disabled checked={isSelected} />}
          {data.icon && <Icon icon={data.icon} />}
          <TextWrapper>
            <OptionLabel>{label}</OptionLabel>
            {getSecondRow && getSecondRow(data)}
          </TextWrapper>
          {requiredOptions.length ? (
            <Tooltip theme="forthiary" position="top" text={`Requires: ${requiredOptions}`}>
              <div>&nbsp;*</div>
            </Tooltip>
          ) : (
            ''
          )}
        </InfoWrapper>
      )}
      {secondLabel && <SecondTextWrapper>{secondLabel}</SecondTextWrapper>}
      {isCheckedOption && (
        <LeftCheckboxWrapper>
          <Checkbox disabled checked={isSelected} />
        </LeftCheckboxWrapper>
      )}
    </OptionWrapper>
  ) : null;

export default compose(
  onlyUpdateForKeys(['isSelected', 'isFocused', 'children', 'data']),
  lifecycle({
    componentDidMount() {
      const {
        selectProps: {setCurrentHint},
        isFocused,
        data,
      } = this.props;
      if (isFocused && setCurrentHint) {
        setCurrentHint(data);
      }
    },
    componentDidUpdate(prevProps) {
      const {
        selectProps: {setCurrentHint},
        isFocused,
        data,
      } = this.props;
      if (isFocused !== prevProps.isFocused && setCurrentHint) {
        setCurrentHint(data);
      }
    },
  }),
  withPropsOnChange(
    ['data'],
    ({data, selectProps: {getSecondLabel, allOptions, getOptionLabel, getOptionValue}}) => ({
      secondLabel: getSecondLabel
        ? typeof getSecondLabel(data) === 'number'
          ? toWholeCurrency(getSecondLabel(data))
          : getSecondLabel(data)
        : null,
      requiredOptions: data?.requiredOptions
        ? data.requiredOptions
            .map(required => allOptions?.find(opt => getOptionValue(opt) == required))
            .map(reqOpt => `${getOptionLabel(reqOpt)} `)
            .toString()
        : [],
    })
  )
)(Option);
