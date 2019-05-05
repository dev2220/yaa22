import React from 'react';
import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem} from 'rc-menu';
import {MenuIcon} from './styled';

const TextActions = ({onAddTextFromGallery, applyTextToAll, type = 'image'}) => (
  <Dropdown
    trigger={['hover']}
    placement="topRight"
    overlay={
      <Menu>
        <MenuItem onClick={onAddTextFromGallery}>Add text from gallery</MenuItem>
        <MenuItem onClick={applyTextToAll}>Apply text to all {type?.toLowerCase()}s</MenuItem>
      </Menu>
    }
  >
    <MenuIcon />
  </Dropdown>
);

export default TextActions;
