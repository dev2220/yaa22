import React from 'react';
import {compose, withHandlers, withStateHandlers, withState, withProps} from 'recompose';
import styled from 'styled-components';
import Select from '../Select';
import Menu from './Menu';
import NestedOption from './NestedOption';
import TextIndicator from '../TextIndicator';

const Root = styled.div`
  flex-grow: 1;

  .select__dropdown-indicator {
    align-self: stretch;
  }
`;

const NestedSelect = ({
  browseOptions,
  loadAutoComplete,
  onBrowserModeOpen,
  isAutocomplete,
  setAutocompleteMode,
  isLoading,
  onChange,
  setCurrentHint,
  ...rest
}) => (
  <Root>
    {isAutocomplete ? (
      <Select
        {...rest}
        components={{
          DropdownIndicator: TextIndicator({
            onClick: onBrowserModeOpen,
            isSelected: !isAutocomplete,
            title: 'Browse',
          }),
          Menu,
        }}
        setCurrentHint={setCurrentHint}
        loadOptions={loadAutoComplete}
        onChange={onChange}
      />
    ) : (
      <Select
        {...rest}
        onMenuClose={setAutocompleteMode}
        components={{
          DropdownIndicator: TextIndicator({
            onClick: onBrowserModeOpen,
            isSelected: !isAutocomplete,
            title: 'Browse',
          }),
          Option: NestedOption,
          Menu,
        }}
        setCurrentHint={setCurrentHint}
        isLoading={isLoading}
        isSearchable={false}
        autoFocus
        closeMenuOnSelect={false}
        openMenuOnFocus={false}
        menuIsOpen={!isAutocomplete}
        options={browseOptions}
        cacheOptions
        onChange={val => onChange(val)}
      />
    )}
  </Root>
);

const enhance = compose(
  withState('currentHint', 'setHint', null),
  withStateHandlers(() => ({isExtended: false}), {
    toggleExtend: () => isExtended => ({isExtended}),
  }),
  withStateHandlers(
    {isAutocomplete: true, browseOptions: [], isLoading: false},
    {
      setBrowseMode: () => () => ({isAutocomplete: false, isLoading: true}),
      setLoading: () => isLoading => ({isLoading}),
      setBrowserOptions: () => browseOptions => ({browseOptions}),
      setAutocompleteMode: () => () => ({isAutocomplete: true}),
    }
  ),
  withProps(({getNestedValue, getOptionsValue}) => ({
    getNestedValue: getNestedValue || (opt => opt.nestedLevels),
    getOptionsValue: getOptionsValue || (opt => opt.behaviors),
  })),
  withHandlers({
    onBrowserModeOpen: ({
      setBrowseMode,
      setBrowserOptions,
      browseOptions,
      onBrowse,
      setLoading,
    }) => async () => {
      setBrowseMode();
      if (!browseOptions?.length) {
        const options = await onBrowse();
        setBrowserOptions(options || []);
      }
      setLoading(false);
    },
    setCurrentHint: ({setHint, hintTitle}) => data => {
      const paths = Object.keys(data)
        .filter(pathKey => pathKey.startsWith('path'))
        .slice(0, data.numOfPrecedingPaths)
        .map(pathKey => data[pathKey])
        .toString()
        .split(' ')
        .join(' > ');
      let hints = [
        {title: hintTitle, value: paths},
        {title: 'Description', value: data.description},
      ];
      if (!paths && !data?.description){
        hints = [];
      }
      setHint(hints);
    },
  })
);

export default enhance(NestedSelect);
