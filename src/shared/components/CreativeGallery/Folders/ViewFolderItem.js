import React, {useLayoutEffect, useRef} from 'react';
import Menu, {Item as MenuItem} from 'rc-menu';
import Dropdown from 'rc-dropdown';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {Icon} from 'shared/components';
import {Amount, Text, ViewItem} from './styled';

const ViewFolderItem = ({folder, onFolderSelect, selected, onDelete, onRename}) => {
  const itemRef = useRef();

  useLayoutEffect(() => {
    if (selected) {
      const {top, bottom, height} = itemRef.current.getBoundingClientRect();
      const holderRect = itemRef.current.parentElement.getBoundingClientRect();

      const isInvisible =
        top <= holderRect.top ? holderRect.top - top > height : bottom - holderRect.bottom > height;

      if (isInvisible) {
        itemRef.current.scrollIntoView();
      }
    }
  }, [selected, folder.name]);

  return (
    <ViewItem ref={itemRef} onClick={() => onFolderSelect(folder)} selected={selected}>
      <Text>{folder.name}</Text>
      <Amount>{folder.assets?.length}</Amount>
      <Dropdown
        trigger={['hover']}
        placement="bottomRight"
        overlay={
          <Menu>
            <MenuItem onClick={() => onDelete(folder)}>Delete</MenuItem>
            <MenuItem onClick={() => onRename(folder)}>Rename</MenuItem>
          </Menu>
        }
      >
        <Icon icon={faEllipsisH} />
      </Dropdown>
    </ViewItem>
  );
};

export default ViewFolderItem;
