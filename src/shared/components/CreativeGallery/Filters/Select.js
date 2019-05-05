import styled from 'styled-components';
import Select from 'shared/components/Select/Select';

const StyledSelect = styled(Select)`
  .select__control,
  .select__control:hover,
  .select__control:focus {
    border: none;
    padding-left: 0;
  }
`;

export default StyledSelect;
