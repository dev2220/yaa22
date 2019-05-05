import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {range} from 'lodash';
import styled, {css} from 'styled-components';
import {Root} from './Input';
import {Caption} from './SectionHeaders';

export const genDashedMarks = ({min, max}) =>
  range(min, max).reduce(
    (acc, value) => ({...acc, [value]: value % 2 === 0 ? value : '\u20D3'}),
    {}
  );

const stylesOverride = css`
  margin: 0 7px 20px 7px;
  width: calc(100% - 14px);

  .rc-slider-rail,
  .rc-slider-track {
    height: 2px;
  }

  .rc-slider-track {
    background-color: ${({theme}) => theme.palette.blue};
  }

  .rc-slider-handle {
    height: 16px;
    width: 16px;
    margin-left: -8px;
    margin-top: -7px;
  }

  .rc-slider-dot.rc-slider-dot-active,
  .rc-slider-handle:focus,
  .rc-slider-handle {
    border-color: ${({theme}) => theme.palette.blue};
  }

  .rc-slider-dot {
    display: ${({showSteps}) => (showSteps ? 'block' : 'none')};
    margin-left: -5px;
    width: 9px;
    height: 9px;
  }
`;

const StyledRange = styled(Slider.Range)`
  ${stylesOverride};
`;

const StyledSlider = styled(Slider)`
  ${stylesOverride};
`;

const Range = ({
  value,
  onChange,
  min,
  max,
  marks,
  showSteps = false,
  title,
  tooltip,
  type = 'range',
  ...rest
}) => {
  const Comp = type === 'range' ? StyledRange : StyledSlider;
  return (
    <Root>
      {title && <Caption tooltip={tooltip}>{title}</Caption>}
      <Comp
        allowCross={false}
        onChange={onChange}
        value={value}
        marks={marks}
        min={min}
        max={max}
        step={null}
        dots={false}
        showSteps={showSteps}
        {...rest}
      />
    </Root>
  );
};

export default Range;
