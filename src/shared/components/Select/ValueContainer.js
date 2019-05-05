import React from 'react';
import {debounce} from 'lodash';
import {components} from 'react-select';
import ReactResizeDetector from 'react-resize-detector';
import {compose, lifecycle, withHandlers, withState, withStateHandlers} from 'recompose';
import styled from 'styled-components';

const isOverflown = element =>
  element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;

const ValuesWrapper = styled.div`
  display: flex;
  flex: 1 1 0;
  overflow: hidden;
  flex-wrap: ${({isExtended}) => (isExtended ? `wrap` : `nowrap`)};
`;

const ExpandBtn = styled.div`
  border-radius: 12px;
  margin: 2px 8px 2px auto;
  cursor: pointer;
  padding: 3px 12px;
  font-size: 12px;
  align-self: flex-start;
  background: ${({theme}) => theme.palette.brightWhite};
`;

const CollapseBtn = styled(ExpandBtn)`
  margin-top: 4px;
`;

const BaseValueContainer = ({
  children,
  setContainerRef,
  handleOnChange,
  visibleItems,
  isExtended,
  toggleExtend,
  ...props
}) => (
  <components.ValueContainer {...props}>
    <ValuesWrapper isExtended={isExtended} ref={setContainerRef}>
      <ReactResizeDetector handleWidth onResize={debounce(handleOnChange, 150)} />
      {!children[0]?.length || isExtended ? children[0] : children[0].slice(0, visibleItems)}
      {children[1]}
      {children[0]?.length <= visibleItems || !children[0]?.length || isExtended ? (
        ''
      ) : (
        <ExpandBtn
          onMouseDown={e => {
            e.stopPropagation();
            toggleExtend(true);
          }}
        >
          +{children[0].length - visibleItems}
        </ExpandBtn>
      )}
    </ValuesWrapper>
    {children[0]?.length && isExtended && (
      <CollapseBtn
        onMouseDown={e => {
          e.stopPropagation();
          toggleExtend(false);
        }}
      >
        -
      </CollapseBtn>
    )}
  </components.ValueContainer>
);

export default compose(
  withStateHandlers(
    ({selectProps: {isExtended}}) => {
      if (typeof isExtended === 'boolean') {
        return {isExtended};
      }

      return {isExtended: false};
    },
    {
      toggleExtend: (_, {selectProps: {toggleExtend}}) => isExtended => {
        if (typeof toggleExtend === 'function') {
          toggleExtend(isExtended);
        }

        return {isExtended};
      },
    }
  ),
  withState('containerRef', 'setContainerRef', null),
  withState('visibleItems', 'setVisibileItems', ({children}) => children[0]?.length),
  withHandlers({
    handleOnChange: ({containerRef, children, setVisibileItems}) => () => {
      if (containerRef && isOverflown(containerRef)) {
        setVisibileItems(children[0]?.length - 1);
      } else {
        setVisibileItems(children[0]?.length);
      }
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      const {visibleItems, handleOnChange, setVisibileItems, children, containerRef} = this.props;
      const isOverflownContainer = containerRef && isOverflown(containerRef);
      const sumItems = children[0]?.length;
      const prevSumItems = prevProps.children[0]?.length;
      if (isOverflownContainer && visibleItems !== 0) {
        setVisibileItems(visibleItems - 1);
      }

      const isInputChangedItems =
        sumItems !== prevSumItems || children[1] !== prevProps.children[1];
      if (isInputChangedItems) {
        handleOnChange();
      }
    },
  })
)(BaseValueContainer);
