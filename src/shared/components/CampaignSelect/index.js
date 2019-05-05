import React, {useState} from 'react';
import styled from 'styled-components';
import Select from '../Select';
import SingleValue from './SingleValue';
import Menu from './Menu';
import Option from './Option';

const StyledSelect = styled(Select)`
  .select {
    &__control {
      height: 48px;
      width: 524px;
    }
    &__value-container {
      overflow: visible;
    }
    &__single-value {
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      height: 35px;
    }
    &__menu {
      width: 524px;
    }
  }
`;
const CampaignSelect = props => {
  const [currentHint, setCurrentHint] = useState(null);
  return (
    <StyledSelect
      setCurrentHint={setCurrentHint}
      currentHint={currentHint}
      components={{SingleValue, Option, Menu}}
      {...props}
    />
  );
};

export default CampaignSelect;
