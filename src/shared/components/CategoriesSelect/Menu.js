import React, {Fragment} from 'react';
import {components} from 'react-select';
import styled from 'styled-components';

const Column = styled.div`
  padding: 10px;
  text-align: ${({align}) => align || 'left'};
  flex: ${({width}) => (width ? `0 ${width}px` : '1')};
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
    selectProps: {optionsArray, currentOptionsIdx, setOptionsIdx},
    children,
  } = props;
  return (
    <components.Menu {...props}>
      <MenuHeader>
        <Column>
          {optionsArray?.map((option, i) => (
            <Fragment key={i}>
              <FilterItem selected={i === currentOptionsIdx} onClick={() => setOptionsIdx(i)}>
                {option.header}
              </FilterItem>
              {i < optionsArray?.length - 1 ? ' | ' : ''}
            </Fragment>
          ))}
        </Column>
      </MenuHeader>
      {children}
    </components.Menu>
  );
};

export default Menu;
