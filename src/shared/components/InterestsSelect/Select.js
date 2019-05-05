import React from 'react';
import {compose, withHandlers, withStateHandlers, withState} from 'recompose';
import styled from 'styled-components';
import {components} from 'react-select';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import Select from '../Select';
import GroupOption from './GroupOption';
import TextIndicator from '../TextIndicator';
import Icon from '../Icon';

const Root = styled.div`
  flex-grow: 1;

  .select__dropdown-indicator {
    align-self: stretch;
  }
`;

const getOptionLabel = data => `${data.name} ${data.numOfInterests || ''}`;

const MenuFooter = styled.div`
  cursor: pointer;
  padding: 10px 18px;
  text-align: left;
  background-color: ${({theme}) => theme.palette.greyBackground};
  color: ${({theme}) => theme.palette.grey};
`;

const EditIcon = styled(Icon)`
  margin-left: 10px;
`;

const Menu = props => (
  <components.Menu {...props}>
    {props.children}
    <MenuFooter onClick={() => props.selectProps.createList(props.selectProps)}>
      Create new interests list <EditIcon size="xs" icon={faEdit} />
    </MenuFooter>
  </components.Menu>
);

const InterestsSelect = ({
  browseOptions,
  loadSearchOptions,
  onBrowserModeOpen,
  isAutocomplete,
  setAutocompleteMode,
  isCheckedOptions,
  isLoading,
  ...rest
}) => (
  <Root>
    {isAutocomplete ? (
      <Select
        components={{
          DropdownIndicator: TextIndicator({
            onClick: onBrowserModeOpen,
            isSelected: !isAutocomplete,
            title: 'Browse',
          }),
          Menu,
        }}
        getOptionLabel={getOptionLabel}
        loadOptions={loadSearchOptions}
        {...rest}
      />
    ) : (
      <Select
        onMenuClose={setAutocompleteMode}
        components={{
          Option: GroupOption,
          DropdownIndicator: TextIndicator({
            onClick: onBrowserModeOpen,
            isSelected: !isAutocomplete,
            title: 'Browse',
          }),
          Menu,
        }}
        isLoading={isLoading}
        isSearchable={false}
        autoFocus
        closeMenuOnSelect={false}
        openMenuOnFocus={false}
        menuIsOpen={!isAutocomplete}
        options={browseOptions}
        getOptionLabel={getOptionLabel}
        cacheOptions
        isCheckedOptions={isCheckedOptions}
        {...rest}
      />
    )}
  </Root>
);

const enhance = compose(
  withState('isLoading', 'setLoading', false),
  withStateHandlers(() => ({isExtended: false}), {
    toggleExtend: () => isExtended => ({isExtended}),
  }),
  withStateHandlers(
    {isAutocomplete: true, browseOptions: [], isLoading: false},
    {
      setLoading: () => isLoading => ({isLoading}),
      setBrowseMode: () => () => ({isAutocomplete: false, isLoading: true}),
      setBrowserOptions: () => browseOptions => ({browseOptions}),
      setAutocompleteMode: () => () => ({isAutocomplete: true}),
    }
  ),
  withHandlers({
    onBrowserModeOpen: ({
      setBrowseMode,
      setBrowserOptions,
      browseOptions,
      loadGroups,
      setLoading,
    }) => async () => {
      setBrowseMode();
      if (!browseOptions?.length) {
        const options = await loadGroups();
        setBrowserOptions(options || []);
      }
      setLoading(false);
    },
  })
);

export default enhance(InterestsSelect);
