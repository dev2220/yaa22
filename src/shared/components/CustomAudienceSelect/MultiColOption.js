import React from 'react';
import {withProps, compose, lifecycle, withHandlers} from 'recompose';
import styled from 'styled-components';
import {toWholeCurrency} from 'shared/utils/numberUtils';
import Wrapper from '../OptionWrapper';
import Icon from '../Icon';
import {Column} from './Menu';

const OptionWrapper = styled(Wrapper)`
  padding: 0;
  &:hover {
    background: ${({theme}) => theme.palette.greyWhite};
  }
  &:hover div {
    color: ${({theme}) => theme.palette.black};
  }
`;

const Option = ({
  innerProps,
  label,
  data,
  isSelected,
  isFocused,
  isIconVisible,
  onIconClick,
  isDisabled,
  selectProps: {isCheckedOptions, isGrouped, customOptions},
}) => (
  <OptionWrapper
    isGrouped={isGrouped}
    isCheckedOptions={isCheckedOptions}
    isSelected={isSelected || isFocused}
    isDisabled={isDisabled}
    {...innerProps}
  >
    <Column>{label}</Column>
    {isIconVisible &&
      isFocused && <Icon icon={customOptions.optionIcon.icon} onClick={onIconClick} />}
    {customOptions?.additionalColumns?.map(c => (
      <Column key={c.title} align={c.align} width={c.width}>
        {toWholeCurrency(data[c.prop])}
      </Column>
    ))}
  </OptionWrapper>
);

const enhance = compose(
  withProps(({data, selectProps: {customOptions}}) => ({
    isIconVisible:
      typeof customOptions?.optionIcon?.isVisible === 'function'
        ? customOptions.optionIcon.isVisible(data)
        : customOptions?.optionIcon?.isVisible,
  })),

  withHandlers({
    onIconClick: ({data, selectProps: {customOptions, isExcludeSection, variationIndex}}) => e => {
      if (customOptions?.optionIcon?.onClick) {
        e.stopPropagation();
        customOptions.optionIcon.onClick({
          data,
          variationIndex: variationIndex || 0,
          isExcludeSection,
        });
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const {
        isFocused,
        data,
        selectProps: {setFocusedOption},
      } = this.props;
      if (isFocused) {
        setFocusedOption(data);
      }
    },
    componentDidUpdate(prevProps) {
      const {
        isFocused,
        data,
        selectProps: {setFocusedOption},
      } = this.props;
      if (isFocused !== prevProps.isFocused && isFocused) {
        setFocusedOption(data);
      }
    },
  })
);

export default enhance(Option);
