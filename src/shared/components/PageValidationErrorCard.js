import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

const Root = styled.div`
  width: 100%;
  height: auto;
  border-radius: 6px;
  border: solid 1px ${({theme}) => theme.palette.red};
  background-color: ${({theme}) => theme.palette.selectedText};
  margin-bottom: 16px;
  padding: 16px 32px;
  display: ${({visibility}) => (visibility ? 'block' : 'none')};
  position: relative;
`;

const Headline = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.palette.red};
`;

const SingleError = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme}) => theme.palette.black};
  margin-top: 5px;
`;

const DangerIcon = styled(FontAwesomeIcon).attrs({icon: faExclamationTriangle})`
  color: ${({theme}) => theme.palette.red};
  font-size: 24px;
  position: absolute;
  right: 32px;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const PageValidationErrorCard = ({pageErrors, currentStep}) => (
  <Root visibility={pageErrors[currentStep]?.length}>
    <Headline>Please fix the following errors</Headline>
    {pageErrors[currentStep]?.map((error, idx) => <SingleError key={idx}>- {error}</SingleError>)}
    <DangerIcon />
  </Root>
);

const mapStateToProps = state => ({
  pageErrors: state.pageErrors,
  currentStep: state.currentStep,
});

export default connect(mapStateToProps)(PageValidationErrorCard);
