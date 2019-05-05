import React from 'react';
import styled from 'styled-components';
import TimePicker from 'rc-time-picker';
import {inputCss} from 'shared/components/Input';
import {faClock} from '@fortawesome/free-regular-svg-icons';
import Icon from 'shared/components/Icon';
import {Caption} from 'shared/components/SectionHeaders';
import {Text} from 'shared/components/Typography';

export const StyledTimePicker = styled(TimePicker)`
  .rc-time-picker-input {
    ${inputCss};
    width: 80px;
    color: inherit;
  }
  .rc-time-picker-clear {
    display: none;
  }
`;

export const TimeIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: 11px;
  color: ${({theme}) => theme.palette.grey};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TimeInput = ({title, subTitle, tooltip, ...rest}) => (
  <Wrapper>
    {title && <Caption tooltip={tooltip}>{title}</Caption>}
    {subTitle && <Text titleMargin>{subTitle}</Text>}
    <StyledTimePicker
      inputIcon={<TimeIcon icon={faClock} />}
      showSecond={false}
      showMinute={false}
      hideDisabledOptions
      format="HH:00"
      {...rest}
    />
  </Wrapper>
);
