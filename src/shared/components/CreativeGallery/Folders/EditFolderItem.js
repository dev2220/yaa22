import React from 'react';
import {compose, lifecycle, withHandlers, withProps, withState} from 'recompose';
import {faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import Tooltip from 'shared/components/Tooltip';
import Icon from 'shared/components/Icon';
import KeyHandler from 'shared/components/KeyHandler';
import {EditItem, Input} from './styled';

const ApplyBtn = styled(Icon)`
  color: ${({theme}) => theme.palette.selectedText};
  cursor: pointer;
  font-size: 16px;
  margin: 0 0 0 12px;
`;

const EditFolderItem = ({inputRef, folderName, setFolderName, cancelEdit, apply, error = ''}) => (
  <Tooltip theme="secondary" visible={!!error} position="right" trigger={[]} text={error}>
    <KeyHandler onEnter={apply} onEscape={cancelEdit} stopPropagation>
      <EditItem onClickOutside={() => cancelEdit()} error={error}>
        <Input
          value={folderName}
          onChange={e => setFolderName(e.currentTarget.value)}
          ref={inputRef}
        />
        <ApplyBtn icon={faArrowAltCircleRight} onClick={apply} />
      </EditItem>
    </KeyHandler>
  </Tooltip>
);

const enhance = compose(
  withState('folderName', 'setFolderName', ({folder: {name}}) => name),
  withHandlers({
    apply: ({updateFolderName, folderName}) => () => updateFolderName(folderName),
  }),
  withProps(() => ({
    inputRef: React.createRef(),
  })),
  lifecycle({
    componentDidMount() {
      this.props.inputRef.current.focus();
    },
  })
);

export default enhance(EditFolderItem);
