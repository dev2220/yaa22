import styled from 'styled-components';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';

const RemoveIcon = styled(Icon).attrs(({icon = faTimes}) => ({icon}))`
  color: ${({theme}) => theme.palette.greyWhite};
  border-radius: 50%;
  width: 14px !important;
  height: 14px;
  padding: 2px;
  margin-right: 7px;
  transform: none;
  color: white;
  border: 1px solid white;
  background-color: ${({theme}) => theme.palette.grey};
  opacity: ${({hide}) => hide && 0};
`;

export default RemoveIcon;
