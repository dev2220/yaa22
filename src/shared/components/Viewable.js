import React from 'react';
import {compose, withHandlers, withState, withProps} from 'recompose';
import styled from 'styled-components';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Text as BaseText} from './Typography';
import BaseCheckbox from './Checkbox';

const IconWithoutExtraProps = ({isViewable: _ignore, ...rest}) => <FontAwesomeIcon {...rest} />;

const Icon = styled(IconWithoutExtraProps).attrs({icon: faAngleRight})`
  color: ${({theme}) => theme.palette.blue};
  transform: ${({isViewable}) => (isViewable ? 'rotate(90deg)' : 'none')};
  transition: transform 200ms;
`;

const Text = styled(BaseText)`
  margin-left: 4px;
`;

const Wrapper = styled.div`
  max-width: 436px;
  display: flex;
  cursor: pointer;
`;

const Checkbox = styled(BaseCheckbox)`
  margin-top: 2px;
  pointer-events: none;
`;

const Viewable = ({isViewable, children, viewableType, toggleViewable, text}) => (
  <>
    <Wrapper onClick={toggleViewable}>
      {viewableType === 'checkbox' ? (
        <Checkbox checked={isViewable} />
      ) : (
        <Icon isViewable={isViewable} />
      )}
      <Text link={viewableType !== 'checkbox'}>{text}</Text>
    </Wrapper>
    {isViewable && children}
  </>
);

export default compose(
  withState('innerIsViewable', 'setIsViewable', false),
  withProps(({innerIsViewable, isViewable}) => ({
    isViewable: isViewable === undefined ? innerIsViewable : isViewable,
  })),
  withHandlers({
    toggleViewable: ({onChange, setIsViewable, isViewable}) => () => {
      if (onChange) {
        onChange(!isViewable);
      }
      setIsViewable(!isViewable);
    },
  })
)(Viewable);
