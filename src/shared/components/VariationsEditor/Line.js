import React from 'react';
import {compose, pure, withHandlers, withPropsOnChange} from 'recompose';
import {faTimes, faPlus} from '@fortawesome/free-solid-svg-icons';
import {omit} from 'lodash';
import {defaultGetOptionLabel, defaultGetOptionValue} from 'shared/utils/select';
import withToggle from '../../hoc/withToggle';
import SelectMinMax from '../SelectMinMax';
import {
  LineWrapper,
  GroupSelects,
  RadiusWrapper,
  Radius,
  ButtonsWrapper,
  CustomIcon,
  CustomRemoveIcon,
  AddLineButton,
  RemoveLineButton,
  ErrorMsg,
  GroupTextInput,
  GroupTextInputWrapper,
  GroupRadioWrapper,
} from './styled';
import RadioGroup from '../RadioGroup';
import Select from '../Select';
import CustomAudienceSelect from '../CustomAudienceSelect';
import EntitySelect from '../EntitySelect';
import {InterestsSelect} from '../InterestsSelect';
import NestedSelect from '../NestedSelect';
import CategoriesSelect from '../CategoriesSelect';
import ButtonGroup from '../ButtonGroup';
import DayParting from '../DayParting';

const Line = ({
  toggleEntityFocus,
  toggleOptionsFocus,
  toggleRadiusFocus,
  isEntityFocus,
  removeAble,
  index,
  addLine,
  removeLine,
  line,
  entityValue,
  entityOptions,
  handleLineChange,
  getOptionLabel,
  getOptionValue,
  addAble,
  hasError,
  hasLeftItem,
  hasRightItem,
  loadOptions,
  options,
  otherLinesValue,
  disabled,
  shouldExcludeSpace,
  isExcludeSection,
  forbiddenOptions,
  isFull,
}) => (
  <LineWrapper {...{disabled, removeAble,isFull}}>
    <GroupSelects isActions={removeAble || addAble || shouldExcludeSpace}>
      {hasLeftItem && (
        <EntitySelect
          error={hasError}
          onFocus={toggleEntityFocus}
          onBlur={toggleEntityFocus}
          isEntityFocus={isEntityFocus}
          options={entityOptions.map(ent => omit(ent, ['options']))}
          value={entityValue}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionLabel}
          isDisabled={disabled}
          onChange={selectedEntity => handleLineChange('entity', selectedEntity, index)}
          isSearchable={false}
          showInternalError={false}
        />
      )}
      {entityValue?.inputType === 'select' ? (
        <Select
          error={hasError}
          variationIndex={index}
          hasRightItem={hasRightItem}
          isEntityFocus={isEntityFocus}
          onFocus={toggleOptionsFocus}
          onBlur={toggleOptionsFocus}
          placeholder="Type here to search"
          loadOptions={entityValue.loadOptions ? loadOptions : null}
          {...entityValue.selectProps}
          isDisabled={disabled}
          options={options}
          isDropDown={!hasLeftItem && !hasRightItem}
          isMulti
          closeMenuOnSelect={false}
          isExcludeSection={isExcludeSection}
          value={line.lineValue.value}
          onChange={value => handleLineChange('value', value, index)}
          getOptionValue={getOptionValue}
          getOptionLabel={getOptionLabel}
          showInternalError={entityValue?.showInternalError !== false}
        />
      ) : entityValue?.inputType === 'customAudienceSelect' ? (
        <CustomAudienceSelect
          hasError={hasError}
          forbiddenOptions={forbiddenOptions}
          variationIndex={index}
          hasRightItem={hasRightItem}
          isEntityFocus={isEntityFocus}
          onFocus={toggleOptionsFocus}
          onBlur={toggleOptionsFocus}
          placeholder="Type here to search"
          loadCustomOptions={entityValue.loadCustomOptions}
          {...entityValue.selectProps}
          isDisabled={disabled}
          options={options}
          isDropDown={!hasLeftItem && !hasRightItem}
          isMenuWithFilter={!!entityValue?.customOptions?.menuFilters}
          isMulti
          customOptions={entityValue?.customOptions}
          closeMenuOnSelect={false}
          isExcludeSection={isExcludeSection}
          value={line.lineValue.value}
          onChange={value => handleLineChange('value', value, index)}
          getOptionValue={getOptionValue}
          getOptionLabel={getOptionLabel}
        />
      ) : entityValue?.inputType === 'browseSelect' ? (
        <InterestsSelect
          hasError={hasError}
          variationIndex={index}
          isDisabled={disabled}
          placeholder="Type here to search"
          isMulti
          {...entityValue.selectProps}
          isCheckedOptions
          value={line.lineValue.value}
          onChange={value => handleLineChange('value', value, index)}
          isExcludeSection={isExcludeSection}
        />
      ) : entityValue?.inputType === 'nestedSelect' ? (
        <NestedSelect
          {...entityValue.selectProps}
          hasError={hasError}
          variationIndex={index}
          isDisabled={disabled}
          placeholder="Type here to search"
          isMulti
          value={line.lineValue.value || []}
          onChange={value => handleLineChange('value', value, index)}
          isExcludeSection={isExcludeSection}
        />
      ) : entityValue?.inputType === 'text' ? (
        <GroupTextInputWrapper>
          <GroupTextInput
            disabled={disabled}
            value={line.lineValue.value}
            onChange={({target: {value}}) => handleLineChange('value', value, index)}
            error={!!hasError}
          />
        </GroupTextInputWrapper>
      ) : entityValue?.inputType === 'radio' ? (
        <GroupRadioWrapper>
          <RadioGroup
            disabled={disabled}
            value={line.lineValue.value}
            options={entityValue?.options}
            onChange={value => handleLineChange('value', value, index)}
          />
        </GroupRadioWrapper>
      ) : entityValue?.inputType === 'buttonGroup' ? (
        <ButtonGroup
          value={line.lineValue.value}
          onChange={value => handleLineChange('value', value, index)}
          disabledOptions={otherLinesValue?.map(otherLine => otherLine.value)}
          options={entityValue?.buttonOptions}
        />
      ) : entityValue?.inputType === 'minMax' ? (
        <SelectMinMax
          isVariation
          value={line.lineValue.value}
          hasError={hasError}
          onChange={value => handleLineChange('value', value, index)}
          options={entityValue?.minMaxOptions}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isMappedValue={entityValue?.isMappedValue}
        />
      ) : entityValue?.inputType === 'categoriesSelect' ? (
        <CategoriesSelect
          {...entityValue.selectProps}
          isMulti
          forbiddenOptions={forbiddenOptions}
          value={line.lineValue.value}
          onChange={value => handleLineChange('value', value, index)}
        />
      ) : entityValue?.inputType === 'dayParting' ? (
        <DayParting
          variationIndex={index}
          value={line.lineValue.value}
          onChange={value => handleLineChange('value', value, index)}
          {...entityValue}
        />
      ) : null}
      {(entityValue?.defaultRadius || entityValue?.defaultRadius === 0) && (
        <RadiusWrapper hasError={hasError}>
          <Radius
            disabled={disabled}
            onFocus={toggleRadiusFocus}
            onBlur={toggleRadiusFocus}
            type="number"
            onChange={({target: {value}}) =>
              // TODO: In future if needed change it to min max value from prop
              value >= 0 && value < 100 && handleLineChange('radius', Number(value), index)
            }
            value={line.lineValue.radius}
          />
          <div>mi</div>
        </RadiusWrapper>
      )}
      {(removeAble || addAble || shouldExcludeSpace) && (
        <ButtonsWrapper addAble={addAble}>
          <AddLineButton display={addAble ? 1 : 0} onClick={() => addLine(index)}>
            <CustomIcon icon={faPlus} />
          </AddLineButton>
          <RemoveLineButton display={removeAble ? 1 : 0} onClick={() => removeLine(index)}>
            <CustomRemoveIcon icon={faTimes} />
          </RemoveLineButton>
        </ButtonsWrapper>
      )}
    </GroupSelects>
    {hasError && <ErrorMsg>{hasError}</ErrorMsg>}
  </LineWrapper>
);

export default compose(
  withToggle('isEntityFocus', 'toggleEntityFocus', false),
  withToggle('isOptionsFocus', 'toggleOptionsFocus', false),
  withToggle('isRadiusFocus', 'toggleRadiusFocus', false),
  withPropsOnChange(
    ['isEntityFocus', 'isOptionsFocus', 'isRadiusFocus', 'hasError'],
    ({isEntityFocus, isOptionsFocus, isRadiusFocus, hasError}) => ({
      hasError: hasError && !isEntityFocus && !isOptionsFocus && !isRadiusFocus ? hasError : null,
    })
  ),
  withPropsOnChange(['line'], ({line, entityOptions}) => ({
    entityValue: entityOptions.find(ent => ent.name === line.lineValue.entity),
  })),
  withPropsOnChange(['entityValue'], ({entityValue}) => {
    if (entityValue) {
      return {
        getOptionValue: entityValue.getOptionValue || defaultGetOptionValue,
        getOptionLabel: entityValue.getOptionLabel || defaultGetOptionLabel,
      };
    }
    return {getOptionValue: defaultGetOptionValue, getOptionLabel: defaultGetOptionLabel};
  }),
  withPropsOnChange(['entityValue', 'entityOptions'], ({entityValue, entityOptions}) => ({
    hasRightItem: entityValue?.defaultRadius || entityValue?.defaultRadius === 0,
    hasLeftItem: entityOptions?.length > 1,
  })),
  withPropsOnChange(['entityValue', 'forbiddenOptions'], ({entityValue, forbiddenOptions}) => ({
    options: entityValue?.options?.map(
      option =>
        forbiddenOptions.map(forbidOpt => forbidOpt.id).includes(option.id)
          ? {...option, isDisabled: true}
          : option
    ),
  })),
  withHandlers({
    loadOptions: ({entityValue, forbiddenOptions}) => inputText =>
      entityValue
        ?.loadOptions(inputText)
        .then(response =>
          response?.map(
            option =>
              forbiddenOptions.map(forbidOpt => forbidOpt.id).includes(option.id)
                ? {...option, isDisabled: true}
                : option
          )
        ),
  }),
  pure
)(Line);
