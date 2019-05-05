import React, {useMemo, useCallback} from 'react';
import styled from 'styled-components';
import Select from 'shared/components/Select';
import {TimeInput} from 'shared/components/DateTime/Time';
import moment from 'moment';

const Wrapper = styled.div`
  display: flex;

  > * {
    margin-right: 10px;
  }
`;

const timeFormat = 'HHmm';

const titles = {selectTitle: 'Day', startTimeTitle: 'Start Time', endTimeTitle: 'End Time'};

const DayParting = ({value, options, onChange, variationIndex}) => {
  const {startTime, endTime} = useMemo(
    () => ({
      startTime: moment(value.startTime, timeFormat),
      endTime: moment(value.endTime, timeFormat),
    }),
    [value.endTime, value.startTime]
  );

  const onDayChange = useCallback(day => onChange({...value, day: day.id}), [onChange, value]);

  const onStartTimeChange = useCallback(
    time => {
      const st = time.format(timeFormat);
      const et = st > value.endTime ? st : value.endTime;
      onChange({...value, startTime: st, endTime: et});
    },
    [onChange, value]
  );

  const onEndTimeChange = useCallback(
    time => {
      const et = time.format(timeFormat);
      const st = et > value.startTime ? value.startTime : et;
      onChange({...value, startTime: st, endTime: et});
    },
    [onChange, value]
  );

  const titlesToDisplay = variationIndex === 0 ? titles : {};
  return (
    <Wrapper>
      <Select
        subTitle={titlesToDisplay.selectTitle}
        size="short"
        options={options}
        value={value.day}
        onChange={onDayChange}
      />
      <TimeInput
        subTitle={titlesToDisplay.startTimeTitle}
        value={startTime}
        onChange={onStartTimeChange}
      />
      <TimeInput
        subTitle={titlesToDisplay.endTimeTitle}
        value={endTime}
        onChange={onEndTimeChange}
      />
    </Wrapper>
  );
};

export default DayParting;
