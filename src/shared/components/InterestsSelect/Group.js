import React from 'react';
import {compose, withStateHandlers} from 'recompose';
import styled from 'styled-components';
import {faFolder, faFolderOpen} from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon';
import {Label, OptionWrapper} from './styled';

const OptionsWrapper = styled.div`
  display: ${({isMenu}) => !isMenu && 'none'};
`;
const Group = ({isMenu, children, toggleMenu, label, onOpen: _ignore, ...innerProps}) => (
  <>
    <OptionWrapper
      {...innerProps}
      isCheckedOptions
      onClick={e => {
        e.stopPropagation();
        toggleMenu();
      }}
    >
      <Icon icon={isMenu ? faFolderOpen : faFolder} />
      <Label>{label}</Label>
    </OptionWrapper>
    <OptionsWrapper isMenu={isMenu}>{children}</OptionsWrapper>
  </>
);

export default compose(
  withStateHandlers(
    {isMenu: false},
    {
      toggleMenu: ({isMenu}, {onOpen}) => () => {
        if (!isMenu) {
          onOpen();
        }
        return {isMenu: !isMenu};
      },
    }
  )
)(Group);
