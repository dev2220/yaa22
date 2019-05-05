import React from 'react';
import {Root} from '../Input';
import RadioGroup from './RadioGroup';
import {Caption} from '../SectionHeaders';

const RadioGroupInput = ({title, tooltip, ...rest}) => (
  <Root>
    {title && <Caption tooltip={tooltip}>{title}</Caption>}
    <RadioGroup {...rest} />
  </Root>
);

export default RadioGroupInput;
