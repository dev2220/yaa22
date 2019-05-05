import React, {useCallback} from 'react';
import {pure} from 'recompose';
import styled, {css, keyframes} from 'styled-components';
import {Header} from 'shared/components/SectionHeaders';
import ReactResizeDetector from 'react-resize-detector';
import Card from './Card';

const fadeInOutBorder = theme => keyframes`
  0% {
    border-color:${theme.palette.blue};
  }
  50%{
    border-color: ${theme.palette.blue};
  }
  100% {
    border-color:transparent;
  }
`;

const activeCardCss = css`
  animation: ${({theme}) => fadeInOutBorder(theme)} 1s ease-in-out;
`;

export const CardWrapper = styled(Card)`
  margin-top: 10px;
  margin-bottom: 24px;
  width: ${({theme}) => theme.card.width}px;
  padding: ${({theme}) => theme.card.padding}px;
  transition: border 0.5s;
  border: 1.5px solid transparent;
  ${({isActive}) => isActive && activeCardCss};
  & > * {
    margin-bottom: ${({theme}) => theme.defaultMarginAfterInputField};
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Section = ({
  header,
  tooltip,
  activeSubSection,
  explanation,
  shouldDisplay = true,
  children,
  onResize,
  setSectionRef,
  idx,
}) => {
  const onRef = useCallback(ref => setSectionRef(ref, idx), [idx, setSectionRef]);
  return shouldDisplay ? (
    <div ref={onRef}>
      {onResize && <ReactResizeDetector handleHeight onResize={onResize} />}
      {header ? (
        <Header tooltip={tooltip} header={header}>
          {explanation}
        </Header>
      ) : (
        <div />
      )}
      <CardWrapper isActive={activeSubSection === idx}>{children}</CardWrapper>
    </div>
  ) : (
    <div />
  );
};

export default pure(Section);
