import React, {Fragment} from 'react';
import {components} from 'react-select';
import styled from 'styled-components';
import {compose, withPropsOnChange} from 'recompose';
import Hint from '../Hint';

export const Column = styled.div`
  padding: 10px;
  text-align: ${({align}) => align || 'left'};
  flex: ${({width}) => (width ? `0 ${width}px` : '1')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MenuHeader = styled.div`
  display: flex;
  background-color: ${({theme}) => theme.palette.greyBackground};
  > ${Column} {
    border-left: 1px solid ${({theme}) => theme.palette.controlBorder};
    border-top: 1px solid ${({theme}) => theme.palette.controlBorder};
    border-bottom: 1px solid ${({theme}) => theme.palette.controlBorder};
  }

  &:last-child {
    border-right: 1px solid ${({theme}) => theme.palette.controlBorder};
  }
`;

const FilterItem = styled.span`
  cursor: pointer;
  font-weight: ${({selected}) => (selected ? 'bold' : 'inherit')};
`;

const Menu = props => {
  const {
    selectProps: {customOptions, setFilterValue, filterValue},
    children,
    details,
  } = props;
  return (
    <>
      <Hint hint={details} />
      <components.Menu {...props}>
        <MenuHeader>
          <Column>
            {customOptions?.menuFilters?.map((f, i) => (
              <Fragment key={f.value}>
                <FilterItem
                  selected={f.value === filterValue}
                  onClick={() => setFilterValue(f.value)}
                >
                  {f.label}
                </FilterItem>
                {i < customOptions?.menuFilters?.length - 1 ? ' | ' : ''}
              </Fragment>
            ))}
          </Column>
          {customOptions?.additionalColumns?.map(c => (
            <Column key={c.title} align={c.align} width={c.width}>
              {c.title}
            </Column>
          ))}
        </MenuHeader>
        {children}
      </components.Menu>
    </>
  );
};

const enhance = compose(
  withPropsOnChange(
    ({selectProps: {focusedOption}}, {selectProps: {focusedOption: nextFocusedOption}}) =>
      focusedOption !== nextFocusedOption,
    ({selectProps: {customOptions, focusedOption}}) =>
      typeof customOptions?.getOptionDetails === 'function' && focusedOption
        ? {details: customOptions.getOptionDetails(focusedOption)}
        : {details: null}
  )
);

export default enhance(Menu);
