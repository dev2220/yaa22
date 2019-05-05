import React from 'react';
import {intersectionWith, isEqual, remove, indexOf} from 'lodash';
import styled from 'styled-components';
import {compose, withProps, withState, withHandlers} from 'recompose';
import BaseOptionWrapper from '../OptionWrapper';
import ArrowIcon from '../ArrowIcon';
import Checkbox from '../Checkbox';

const OptionWrapper = styled(BaseOptionWrapper)`
  background-color: ${({theme}) => theme.palette.white};
`;

const Grouped = styled.div`
  border: 1px solid ${({theme}) => theme.palette.greyWhite};
  border-top: none;
  ${BaseOptionWrapper} {
    background: ${({theme}) => theme.palette.selectedText};
    height: 36px;
    padding: 10px;
    padding-right: 4px;
    border-top: none;
    &:hover {
      background: ${({theme}) => theme.palette.brightWhite};
    }
    &:hover div {
      color: ${({theme}) => theme.palette.black};
    }
  }

  > ${BaseOptionWrapper}:first-child {
    &:hover {
      background: ${({theme}) => theme.palette.brightWhite};
    }
    &:hover label {
      color: ${({theme}) => theme.palette.black};
    }
  }
`;

const OptionsWrapper = styled.div`
  display: ${({isMenu}) => !isMenu && 'none'};
`;

const Label = styled.label`
  font-weight: 600;
  cursor: pointer;
`;

const Group = ({
  isMenu,
  data,
  children,
  checkType,
  groupOptionsInValue,
  toggleMenu,
  handleGroupCheck,
  selectProps: {isHeaderHidden, getHeaderLabel = header => header.label},
}) => (
  <Grouped>
    {!isHeaderHidden && (
      <OptionWrapper isHeaderHidden={isHeaderHidden} isCheckedOptions onClick={toggleMenu}>
        <Checkbox
          checkType={checkType}
          onClick={handleGroupCheck}
          disabled
          checked={groupOptionsInValue.length}
        />
        <Label>{getHeaderLabel(data)}</Label>
        <ArrowIcon shouldRotate isMenu={isMenu} />
      </OptionWrapper>
    )}
    <OptionsWrapper isMenu={isMenu}>{children}</OptionsWrapper>
  </Grouped>
);

export default compose(
  withProps(({options, getValue}) => ({
    groupOptions: options.map(option => option.data),
    currentValue: getValue(),
  })),
  withProps(({currentValue, groupOptions}) => ({
    groupOptionsInValue: intersectionWith(currentValue, groupOptions, isEqual),
  })),

  withProps(({groupOptionsInValue, groupOptions}) => ({
    checkType: groupOptionsInValue.length === groupOptions.length ? 'check' : 'minus',
  })),
  withState('isMenu', 'setIsMenu', true),
  withHandlers({
    handleGroupCheck: ({groupOptionsInValue, groupOptions, currentValue, setValue}) => e => {
      if (e) {
        e.stopPropagation();
      }
      if (groupOptionsInValue.length) {
        setValue(remove(currentValue, option => indexOf(groupOptions, option) === -1));
      } else {
        setValue([...currentValue, ...groupOptions]);
      }
    },
  }),
  withHandlers({
    toggleMenu: ({isMenu, setIsMenu}) => () => {
      setIsMenu(!isMenu);
    },
  })
)(Group);
