import React, {useCallback, useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {debounce} from 'lodash';
import {Icon} from 'shared/components';
import Select from 'shared/components/Select/Select';
import {TABS} from '../../../constants/creatives';
import {SEARCH_NAME, SEARCH_TEXT} from './filterOptions';

const Wrapper = styled.div`
  display: flex;
  height: 32px;
  min-width: 200px;
  position: relative;
  margin: 16px 0 16px auto;
`;

const Input = styled.input.attrs({type: 'text'})`
  padding: 0 0 0 5px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  background-color: ${({theme}) => theme.palette.white};
  width: 245px;
`;

const SearchType = styled(Select)`
  .select__control {
    border: 1px solid ${({theme}) => theme.palette.white};
    border-radius: 16px 0 0 16px;
    box-shadow: none;
    min-width: 75px;
    min-height: 32px;
  }

  .select__indicator-separator {
    display: none;
  }

  .select__indicator.select__dropdown-indicator {
    padding: 0px;
  }
`;

const iconsCss = css`
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 9px;
  color: ${({theme}) => theme.palette.grey};
`;

const DeleteIcon = styled(Icon).attrs({icon: faTimesCircle})`
  ${iconsCss};
`;

const defaultSearch = {
  [TABS.CREATIVES]: {
    type: SEARCH_NAME,
    value: '',
  },
  [TABS.TEXTS]: {
    type: SEARCH_TEXT,
    value: '',
  },
};

const Search = ({value, onChange, options, selectedTab}) => {
  const [search, setSearch] = useState(value);
  useEffect(() => setSearch(value), [value]);
  const debouncedOnChange = useCallback(debounce(onChange, 300), [onChange]);
  useEffect(() => {
    debouncedOnChange(search);
    return debouncedOnChange.cancel;
  }, [search, debouncedOnChange]);
  const clear = useCallback(() => onChange(defaultSearch[selectedTab]), [onChange, selectedTab]);
  const searchValue = search.value;
  return (
    <Wrapper>
      <SearchType
        options={options}
        value={search.type}
        onChange={type => setSearch({...search, type})}
        isFull={false}
      />
      <Input
        value={searchValue || ''}
        onChange={e => setSearch({...search, value: e.currentTarget.value})}
      />
      {searchValue && <DeleteIcon onClick={clear} />}
    </Wrapper>
  );
};

export default Search;
