import React from 'react';
import RcTooltip from 'rc-tooltip';
import styled from 'styled-components';

const TooltipInner = styled.div`
  max-width: 280px;
  font-size: 13px;
  font-weight: 300;
`;

const Tooltip = ({children, text, theme = 'primary', position = 'top', ...props}) => (
  <RcTooltip
    overlayClassName={theme}
    placement={position}
    overlay={<TooltipInner>{text}</TooltipInner>}
    {...props}
  >
    {children}
  </RcTooltip>
);

export default Tooltip;
