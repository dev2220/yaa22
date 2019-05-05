import React from 'react';
import styled from 'styled-components';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Icon} from 'shared/components';

const Wrapper = styled.div`
  color: ${({theme}) => theme.palette.greyBlack};
  font-size: ${({theme}) => theme.typography.texts.sizes.small};
  padding: 8px 8px 8px 36px;
  cursor: pointer;
`;

const NewFolderButton = ({onClick}) => (
  <Wrapper onClick={onClick}>
    <Icon icon={faPlus} />
    New Folder
  </Wrapper>
);

export default NewFolderButton;
