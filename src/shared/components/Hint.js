import React from 'react';
import styled from 'styled-components';
import {branch, renderNothing} from 'recompose';

const HintWrapper = styled.div`
  width: 170px;
  position: absolute;
  background-color: ${({theme}) => theme.palette.greyBackground};
  border: 1px solid ${({theme}) => theme.palette.controlBorder};
  text-align: left;
  min-width: 120px;
  z-index: 1;
  left: 524px;
`;

const DetailItem = styled.div`
  margin: 2px 10px;
  word-break: break-word;
`;

const Hint = ({hint}) => (
  <HintWrapper>
    {hint.map(
      ({title, value}, idx) =>
        value || value === 0 ? (
          <DetailItem key={idx}>
            <b>{title}:</b>
            &nbsp;
            <div style={{display: 'inline-block'}}>{value}</div>
          </DetailItem>
        ) : null
    )}
  </HintWrapper>
);

export default branch(({hint}) => !hint?.length, renderNothing)(Hint);
