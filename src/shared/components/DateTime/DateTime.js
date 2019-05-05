import React, {useMemo, useCallback} from 'react';
import 'rc-time-picker/assets/index.css';
import 'rc-calendar/assets/index.css';
import styled from 'styled-components';
import moment from 'moment';
import {Caption} from '../SectionHeaders';
import {TimeInput} from './Time';
import {DateInput} from './Date';

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 50px;
  margin-right: 10px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  > * {
    margin-right: 10px;
  }
`;

export const DateTimeInput = ({
  value: originValue,
  onChange,
  title,
  tooltip,
  timeProps,
  calendarProps,
}) => {
  const value = useMemo(() => (originValue ? moment(originValue) : null), [originValue]);
  const handleChange = useCallback(v => onChange(v.format()), [onChange]);
  return (
    <Wrapper>
      {title && (
        <Title>
          <Caption tooltip={tooltip}>{title}</Caption>
        </Title>
      )}
      <DateInput value={value} calendarProps={calendarProps} onChange={handleChange} />
      <TimeInput value={value} onChange={handleChange} {...timeProps} />
    </Wrapper>
  );
};

export default DateTimeInput;
