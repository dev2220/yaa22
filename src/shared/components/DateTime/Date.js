import styled from 'styled-components';
import Calendar from 'rc-calendar';
import enUS from 'rc-calendar/lib/locale/en_US';
import React from 'react';
import {faCalendarAlt} from '@fortawesome/free-regular-svg-icons';
import DatePicker from 'rc-calendar/lib/Picker';
import {Input} from 'shared/components/Input';
import Icon from 'shared/components/Icon';

export const StyledCalendar = styled(Calendar)`
  margin-top: 40px;
  &.rc-calendar {
    font-size: 14px;
    width: auto;
    border-radius: 6px;
  }

  .rc-calendar-footer,
  .rc-calendar-prev-year-btn,
  .rc-calendar-next-year-btn {
    display: none;
  }

  .rc-calendar-prev-month-btn {
    left: 0;
  }

  .rc-calendar-next-month-btn {
    right: 0;
  }

  .rc-calendar-body {
    height: auto;
  }

  .rc-calendar-header {
    border-bottom: none;
    padding-top: 10px;
  }

  .rc-calendar-header,
  .rc-calendar-decade-panel-header,
  .rc-calendar-month-panel-header,
  .rc-calendar-year-panel-header {
    height: auto;
    background-color: ${({theme}) => theme.palette.greyBackground};
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .rc-calendar-decade-panel-header .rc-calendar-decade-panel-century {
    line-height: 34px;
  }

  .rc-calendar-today .rc-calendar-date {
    border: none;
  }

  .rc-calendar-date:hover,
  .rc-calendar-month-panel-month:hover,
  .rc-calendar-decade-panel-decade:hover,
  .rc-calendar-year-panel-year:hover {
    color: white;
    background: ${({theme}) => theme.palette.blueSecondary};
  }

  .rc-calendar-month-panel-selected-cell .rc-calendar-month-panel-month,
  .rc-calendar-year-panel-selected-cell .rc-calendar-year-panel-year,
  .rc-calendar-decade-panel-selected-cell .rc-calendar-decade-panel-decade,
  .rc-calendar-selected-day .rc-calendar-date {
    color: white;
    background: ${({theme}) => theme.palette.selected};
  }

  .rc-calendar-year-select:hover,
  .rc-calendar-month-select:hover,
  .rc-calendar-decade-select:hover,
  .rc-calendar-month-panel-year-select:hover,
  .rc-calendar-year-panel-decade-select:hover,
  .rc-calendar-day-select:hover {
    color: ${({theme}) => theme.palette.selected};
  }

  .rc-calendar-date {
    width: 40px;
    height: 38px;
    line-height: 36px;
    border-radius: 2px;
  }

  .rc-calendar-year-select,
  .rc-calendar-month-select,
  .rc-calendar-day-select {
    font-size: 14px;
  }

  .rc-calendar-prev-month-btn,
  .rc-calendar-next-month-btn,
  .rc-calendar-prev-year-btn,
  .rc-calendar-next-year-btn {
    font-size: 24px;
  }

  .rc-calendar-month-panel-table,
  .rc-calendar-decade-panel-table,
  .rc-calendar-year-panel-table {
    height: calc(100% - 58px);
  }

  .rc-calendar-table {
    thead {
      transform: scale(1);

      > ::after {
        content: ' ';
        z-index: -1;
        position: absolute;
        top: -10px;
        bottom: 0;
        left: -10px;
        right: -10px;
        background-color: ${({theme}) => theme.palette.greyBackground};
        border-bottom: solid 1px ${({theme}) => theme.palette.greyWhite};
      }

      &::after {
        content: '-';
        display: block;
        line-height: 7px;
        color: transparent;
      }
    }

    tbody:before {
      content: '-';
      display: block;
      line-height: 7px;
      color: transparent;
    }
  }
`;

export const DATE_FORMAT = 'DD/MM/YYYY';
export const calendar = calendarProps => (
  <StyledCalendar locale={enUS} format={DATE_FORMAT} showDateInput={false} {...calendarProps} />
);

const DateInputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled(Input)`
  width: 120px;
`;

const DateIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: 11px;
  color: ${({theme}) => theme.palette.grey};
`;

export const DateInput = ({value, onChange, calendarProps}) => (
  <DatePicker calendar={calendar(calendarProps)} value={value} onChange={onChange}>
    {({value: inputValue}) => (
      <DateInputWrapper>
        <StyledInput
          placeholder="please select"
          readOnly
          value={(inputValue && inputValue.format(DATE_FORMAT)) || ''}
        />
        <DateIcon icon={faCalendarAlt} />
      </DateInputWrapper>
    )}
  </DatePicker>
);
