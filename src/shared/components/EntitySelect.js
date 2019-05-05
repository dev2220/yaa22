import styled, {css} from 'styled-components';
import {withProps} from 'recompose';
import Select from './Select';
import {Root} from './Input';

const RootComponent = styled(Root)`
  &&& {
    width: auto;
  }
`;

const errorStyle = css`
  border-color: ${({theme}) => theme.palette.red};
  border-radius: 0;
  &:hover {
    border-radius: 0;
    border-color: ${({theme}) => theme.palette.red};
  }
`;

const hideBorderRight = css`
  border-right-color: transparent;
  &:hover {
    border-right-color: transparent;
  }
`;
const entityError = css`
  ${errorStyle};
  border-right: none;
  &:hover {
    border-right: none;
  }
`;

const EntitySelect = styled(Select)`
  min-width: 120px;
  display: flex;
  flex-direction: column;
  .select__control {
    cursor: hand;
    background-color: #f9f9f9;
    border-radius: 2px;
    flex: 1;
    ${({hasError}) => hasError && entityError};
    ${({isEntityFocus}) => !isEntityFocus && hideBorderRight};
  }
  .select__value-container,
  .select__indicators {
    cursor: hand;
  }
  .select__dropdown-indicator {
    padding: 0;
    margin-right: 4px;
    color: ${({theme}) => theme.palette.greyDark};
  }
  .select__menu {
    div {
      text-overflow: initial;
    }
    top: 100%;
    text-align: left;
    &-list {
      padding: 0;
    }
  }
  .select__single-value {
    font-size: 13px;
  }
`;

export default withProps(() => ({RootComponent}))(EntitySelect);
