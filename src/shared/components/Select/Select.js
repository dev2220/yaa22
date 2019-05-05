import React from 'react';
import SimpleSelect from 'react-select';
import Creatable from 'react-select/lib/Creatable';
import {withProps, compose} from 'recompose';
import styled, {css} from 'styled-components';
import {defaultGetOptionLabel, defaultGetOptionValue} from 'shared/utils/select';
import {Caption} from '../SectionHeaders';
import {AlertText, Root, inputCss, focusCss} from '../Input';
import Option from './Option';
import MultiValueRemove from './MultiValueRemove';
import DropdownIndicator from './DropdownIndicator';
import RemoveIcon from '../RemoveIcon';
import ValueContainer from './ValueContainer';
import {Text} from '../Typography';
import AsyncSelect from '../AsyncSelect';

const SyncSelect = ({onCreateOption, ...props}) =>
  onCreateOption ? (
    <Creatable onCreateOption={onCreateOption} {...props} />
  ) : (
    <SimpleSelect {...props} />
  );

const ReactSelect = ({loadOptions, ...rest}) =>
  loadOptions ? (
    <AsyncSelect loadOptions={loadOptions} cacheOptions={false} {...rest} />
  ) : (
    <SyncSelect {...rest} />
  );

const styleLessCss = css`
  background-color: transparent !important;
  border: none !important;
  height: 25px;
`;

const hoverRemove = css`
  &:hover {
    ${RemoveIcon} {
      background-color: ${({theme}) => theme.palette.lightBlue};
    }
  }
`;

const StyledSelect = styled(ReactSelect)`
  min-width: ${({theme, size = 'full'}) => theme.input.sizes[size]};
  max-width: ${({theme, size = 'full'}) => theme.input.sizes[size]};
  display: inline-block;
  flex: 1;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
  border-color: ${({theme, error}) => (error || error?.length) && theme.palette.red};
  .select__menu {
    position: ${({isGrouped}) => isGrouped && 'relative'};
    box-shadow: ${({isGrouped}) => isGrouped && 'none'};
    margin: 0;
    top: auto;
    &-list {
      max-height: ${({isGrouped}) => isGrouped && 'unset'};
      padding: 0;
    }
  }
  .select__single-value {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .select__placeholder {
    font-size: ${({theme}) => theme.typography.texts.sizes.medium}px;
    color: ${({theme}) => theme.palette.placeholderText};
    margin: 0;
    padding: 0;
  }

  .select__control {
    ${inputCss};
    width: auto;
    box-shadow: none;
    padding: 0;
    height: auto;
    min-height: 35px;
    padding-left: ${({theme}) => theme.input.padding}px;
    ${({styleLess}) => styleLess && styleLessCss};
  }

  .select__dropdown-indicator {
    color: ${({theme}) => theme.palette.black};
    :hover {
      color: ${({theme}) => theme.palette.black};
    }
  }

  .select__indicator-separator,
  .select__clear-indicator {
    display: none;
  }

  .select__dropdown-indicator {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${({isSearchable}) => (isSearchable ? 'default' : 'hand')};
  }

  .select__control--is-focused {
    ${({error, success}) => !error && !success && focusCss};

    &:hover {
      ${({error, success}) => !error && !success && focusCss};
    }
  }

  .select__value-container {
    padding: 0;
    overflow: hidden;
    flex-wrap: nowrap;
    cursor: ${({isSearchable}) => (isSearchable ? 'text' : 'hand')};
  }

  .select__multi-value {
    cursor: hand;
    justify-content: center;
    align-items: center;
    height: 25px;
    flex-direction: row-reverse;
    border-radius: 100px;
    background-color: ${({theme}) => theme.palette.blue};
    margin: 2px 3px 2px 0;
    flex-shrink: 0;
    max-width: 255px;

    &__label {
      font-size: 13px;
      padding: 2px 0;
      padding-right: 22px;
      color: ${({theme}) => theme.palette.selectedText};
    }

    &__remove {
      padding-right: 0;
      svg {
        border: none;
        background-color: ${({theme}) => theme.palette.selectedText};
        color: ${({theme}) => theme.palette.blue};
      }
      :hover {
        background-color: transparent;
      }
    }
    ${hoverRemove};
  }
`;

const customComponents = ({isMulti, isRemovedArrow}) => {
  const components = {
    Option,
    DropdownIndicator: isRemovedArrow ? null : DropdownIndicator,
    MultiValueRemove,
    ...(isMulti && {ValueContainer}),
  };
  return components;
};

const Select = ({
  components = {},
  RootComponent = Root,
  title,
  subTitle,
  tooltip,
  error,
  required,
  success,
  info,
  disabled,
  placeholder,
  isCheckedOptions,
  options,
  isMulti,
  styleLess,
  isRemovedArrow,
  loadOptions,
  isPortal,
  hideSelectedOptions,
  isFull,
  className,
  isSearchable = true,
  showInternalError = true,
  style = null,
  ...rest
}) => (
  <RootComponent isFull={isFull} className={className} style={style}>
    {title && <Caption tooltip={tooltip}>{title}</Caption>}
    {subTitle && <Text titleMargin>{subTitle}</Text>}
    <StyledSelect
      classNamePrefix="select"
      isDisabled={disabled}
      components={{...customComponents({isMulti, isRemovedArrow}), ...components}}
      placeholder={required ? `${placeholder} *` : placeholder}
      error={error}
      options={options}
      success={success}
      styleLess={styleLess}
      isMulti={isMulti}
      hideSelectedOptions={
        hideSelectedOptions !== undefined ? hideSelectedOptions : isMulti && !isCheckedOptions
      }
      closeMenuOnSelect={!isCheckedOptions}
      isCheckedOptions={isCheckedOptions}
      loadOptions={loadOptions}
      isSearchable={isSearchable}
      {...isPortal && {
        menuPortalTarget: document.body,
        styles: {menuPortal: base => ({...base, zIndex: 9999})},
      }}
      {...rest}
    />
    {error && showInternalError && <AlertText error={error}>{error}</AlertText>}
    {success && <AlertText success={success}>{success}</AlertText>}
    {required && <AlertText disabled={disabled}>{`*${required}`}</AlertText>}
    {info && <AlertText info>{info}</AlertText>}
  </RootComponent>
);

export default compose(
  withProps(({getOptionLabel, getOptionValue}) => ({
    getOptionLabel: getOptionLabel || defaultGetOptionLabel,
    getOptionValue: getOptionValue || defaultGetOptionValue,
  })),
  withProps(({getBracketLabel, getOptionLabel}) => ({
    getOptionLabel: getBracketLabel
      ? val => `${getOptionLabel(val)} (${getBracketLabel(val)})`
      : getOptionLabel,
  })),
  withProps(({loadOptions, options, isMappedValue, value, getOptionValue, isMulti}) => {
    if (loadOptions) {
      return {value};
    } else if (isMulti && isMappedValue) {
      if (value?.length) {
        return {
          value: value.map(val =>
            options?.find(option => getOptionValue(option).toString() === val.toString())
          ),
        };
      }
    } else if (!isMulti) {
      return {value: options?.find(option => getOptionValue(option) === value) || value};
    } else {
      return {value};
    }
  })
)(Select);
