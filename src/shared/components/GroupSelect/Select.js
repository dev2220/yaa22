import styled from 'styled-components';
import {withProps} from 'recompose';
import Select from '../Select';
import Group from './Group';
import GroupValueContainer from './GroupValueContainer';

const components = {
  Group,
  ValueContainer: GroupValueContainer,
};

const GroupSelect = styled(Select)`
  .select__menu {
    position: 'relative';
    box-shadow: 'none';
    &-list {
      max-height: 'unset';
    }
  }
`;

export default withProps(() => ({isGrouped: true, components, backspaceRemovesValue: false}))(
  GroupSelect
);
