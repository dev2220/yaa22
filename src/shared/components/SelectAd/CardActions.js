import React from 'react';
import styled from 'styled-components';
import Menu, {Item as MenuItem} from 'rc-menu';
import Dropdown from 'rc-dropdown';
import {faEllipsisH, faLayerGroup, faEye} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Icon = ({isPreview: _ignore, ...rest}) => <FontAwesomeIcon {...rest} />;

const CardMenu = styled(Icon).attrs({icon: faEllipsisH})`
  cursor: pointer;
  border-radius: 50%;
  &&& {
    height: 16px;
    width: 16px;
  }
  &:hover {
    color: ${({theme}) => theme.palette.PRIMARY_COLOR};
  }
`;
const LayerGroup = styled(CardMenu).attrs({icon: faLayerGroup})`
  margin-right: 6px;
  color: ${({theme}) => theme.palette.grey};
  cursor: default;
`;

const Eye = styled(CardMenu).attrs({icon: faEye})`
  margin-right: 8px;
  color: ${({isPreview, theme}) => isPreview && theme.palette.blue};
`;

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({theme}) => theme.palette.greyBlack};
  padding: 8px 5px;
`;

const SecondCardActions = styled.div`
  display: flex;
  align-items: center;
`;

const CardActions = ({
  handleOpenConfirmationDelete,
  onDuplicate,
  sumTexts,
  isPreview,
  setIsPreview,
  onChangeCreative,
  isPlaceholder,
  type,
}) => (
  <Root>
    <SecondCardActions>
      <LayerGroup />
      {sumTexts}
    </SecondCardActions>
    <SecondCardActions>
      <Eye isPreview={isPreview} onClick={() => setIsPreview(!isPreview)} />
      {isPlaceholder ? (
        <CardMenu />
      ) : (
        <Dropdown
          trigger={['hover']}
          placement="topRight"
          overlayStyle={{zIndex: 2}}
          overlay={
            <Menu>
              <MenuItem onClick={onChangeCreative}>Change {type}</MenuItem>
              <MenuItem onClick={handleOpenConfirmationDelete}>Remove Ads</MenuItem>
              <MenuItem onClick={onDuplicate}>Duplicate</MenuItem>
            </Menu>
          }
        >
          <CardMenu />
        </Dropdown>
      )}
    </SecondCardActions>
  </Root>
);

export default CardActions;
