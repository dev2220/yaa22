import React from 'react';
import {compose, withHandlers, withStateHandlers} from 'recompose';
import styled from 'styled-components';
import Select from '../Select';
import {Label, OptionWrapper, Score} from './styled';
import TextIndicator from '../TextIndicator';

const Root = styled.div`
  flex-grow: 1;

  .select__dropdown-indicator {
    align-self: stretch;
  }
`;

const Option = ({innerProps, data, isSelected}) =>
  !isSelected ? (
    <OptionWrapper {...innerProps}>
      <Label>{data.name}</Label>
      <Score>{data.size?.toLocaleString()}</Score>
    </OptionWrapper>
  ) : null;

const InterestsSelect = ({
  suggestionOptions,
  loadSearchOptions,
  onSuggestionModeOpen,
  isAutocomplete,
  setAutocompleteMode,
  value,
  loadSuggestions,
  title,
  className,
  ...rest
}) => (
  <Root className={className}>
    <Select
      title={title}
      onMenuClose={setAutocompleteMode}
      components={{
        Option,
        ...(loadSuggestions && {
          DropdownIndicator: TextIndicator({
            onClick: onSuggestionModeOpen,
            isSelected: !isAutocomplete,
            title: 'Suggestions',
            disabled: !value?.length,
          }),
        }),
      }}
      value={value}
      isMulti
      isSearchable={isAutocomplete}
      closeMenuOnSelect={false}
      autoFocus={!isAutocomplete}
      openMenuOnFocus={false}
      menuIsOpen={!isAutocomplete || undefined}
      options={!isAutocomplete ? suggestionOptions : undefined}
      loadOptions={isAutocomplete ? loadSearchOptions : undefined}
      {...rest}
    />
  </Root>
);

const enhance = compose(
  withStateHandlers(() => ({isExtended: false}), {
    toggleExtend: () => isExtended => ({isExtended}),
  }),
  withStateHandlers(
    {isAutocomplete: true, suggestionOptions: [], isLoading: false},
    {
      setLoading: () => isLoading => ({isLoading}),
      setSuggestionMode: () => () => ({
        isAutocomplete: false,
        suggestionOptions: [],
        isLoading: true,
      }),
      setSuggestionOptions: () => suggestionOptions => ({suggestionOptions, isLoading: false}),
      setAutocompleteMode: () => () => ({isAutocomplete: true}),
    }
  ),
  withHandlers({
    onSuggestionModeOpen: ({
      setSuggestionMode,
      setSuggestionOptions,
      loadSuggestions,
      value,
    }) => async () => {
      setSuggestionMode();
      const suggestions = await loadSuggestions(value);
      setSuggestionOptions(suggestions);
    },
  })
);

export default enhance(InterestsSelect);
