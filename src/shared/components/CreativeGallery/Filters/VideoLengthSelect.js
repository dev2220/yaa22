import React from 'react';
import Clickoutside from 'react-click-outside';
import {compose, withStateHandlers} from 'recompose';
import MenuList from './MenuList';
import StyledSelect from './Select';

const formatLabel = options => ({equality, videoLength}) =>
  `${options?.find(o => o.id === equality)?.name || ''} ${
    videoLength !== 0 && videoLength ? videoLength : ''
  }`;

const VideoLengthSelect = ({
  isMenuOpen,
  closeMenu,
  videoLengthValue,
  openMenu,
  setValue,
  radioOptions,
}) => (
  <Clickoutside onClickOutside={() => closeMenu()} onMouseDown={() => isMenuOpen && closeMenu()}>
    <StyledSelect
      value={videoLengthValue}
      onChange={setValue}
      formatOptionLabel={formatLabel(radioOptions)}
      components={{MenuList}}
      onMenuOpen={openMenu}
      autoFocus={false}
      menuIsOpen={isMenuOpen}
      closeMenuOnSelect={false}
      isSearchable={false}
      radioOptions={radioOptions}
    />
  </Clickoutside>
);

const enhance = compose(
  withStateHandlers(({videoLengthValue}) => ({isMenuOpen: false, videoLengthValue}), {
    openMenu: () => () => ({isMenuOpen: true}),
    closeMenu: () => () => ({isMenuOpen: false}),
    setValue: (_, {onChange}) => videoLengthValue => {
      onChange?.(videoLengthValue);
      return {isMenuOpen: false, videoLengthValue};
    },
  })
);

export default enhance(VideoLengthSelect);
