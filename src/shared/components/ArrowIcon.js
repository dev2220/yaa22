import React from 'react';
import styled from 'styled-components';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';

const IconWithoutExtraProps = ({
  isMenu: _ignore,
  shouldRotate: _ignore1,
  isLeft: _ignore3,
  ...rest
}) => <Icon {...rest} />;

const ArrowIcon = styled(IconWithoutExtraProps).attrs(({icon = faAngleDown}) => ({icon}))`
  margin-left: auto;
  width: 9px !important;
  font-size: ${({theme}) => theme.typography.texts.sizes.medium}px;
  transform: ${({isMenu, shouldRotate, isLeft}) =>
    shouldRotate && (isMenu ? 'none' : isLeft ? 'rotate(-90deg)' : 'rotate(90deg)')};
  color: ${({theme}) => theme.palette.grey};
  transition: transform 200ms;
`;

export default ArrowIcon;
