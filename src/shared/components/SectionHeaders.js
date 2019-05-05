import React from 'react';
import styled, {css} from 'styled-components';
import {
  WithInfo,
  H2,
  H4,
  Explanation as BaseExplanation,
  Caption as BaseCaption,
} from './Typography';

const withBorderBottom = css`
  border-bottom: solid 1px rgba(51, 51, 51, 0.1);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${({theme}) => theme.input.padding}px;
  ${({border}) => border && withBorderBottom};
  position: relative;
`;

const SubHeaderWrapper = styled(Wrapper)`
  width: 200px;
  flex-shrink: 0;
  margin-right: 60px;
  border: none;
`;

const Explanation = styled(BaseExplanation)`
  margin-top: 1px;
  font-size: 12px;
  color: ${({theme}) => theme.palette.grey};
`;

const CustomWithInfo = styled(WithInfo)`
  margin-bottom: 1px;
`;

export const Header = ({header, children, border, tooltip}) => (
  <Wrapper border={border}>
    <CustomWithInfo tooltip={tooltip}>
      <H2>{header}</H2>
    </CustomWithInfo>
    <Explanation>{children}</Explanation>
  </Wrapper>
);

export const SubHeader = ({header, children, tooltip}) => (
  <SubHeaderWrapper>
    <WithInfo tooltip={tooltip}>
      <H4>{header}</H4>
    </WithInfo>
    <Explanation>{children}</Explanation>
  </SubHeaderWrapper>
);

export const Caption = ({children, tooltip, className}) => (
  <WithInfo tooltip={tooltip} className={className}>
    <BaseCaption>{children}</BaseCaption>
  </WithInfo>
);
