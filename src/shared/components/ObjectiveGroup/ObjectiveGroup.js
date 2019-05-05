import React from 'react';
import styled from 'styled-components';
import BaseObjective from './Objective';

const Objective = styled(BaseObjective)`
  margin: 10px 16px;
  margin-left: 0;
  :not(:first-of-type) {
    opacity: 0.3;
    pointer-events: none;
  }
`;

const SelectableObjective = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -10px;
  & > :nth-child(4) {
    margin-right: 0;
  }
`;

const ObjectiveGroup = ({
  value,
  onChange,
  getOptionLabel = option => option.name,
  getOptionValue = option => option.id,
  options,
}) => (
  <SelectableObjective>
    {options.map((item, idx) => (
      <Objective
        key={idx}
        active={value === (getOptionValue ? getOptionValue(item) : item)}
        onClick={() => onChange(item)}
      >
        {getOptionLabel ? getOptionLabel(item) : item}
      </Objective>
    ))}
  </SelectableObjective>
);

export default ObjectiveGroup;
