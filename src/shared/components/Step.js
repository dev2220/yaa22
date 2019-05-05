import React from 'react';
import {PrimaryButton} from 'shared/components';
import styled from 'styled-components';
import PageValidationErrorCard from './PageValidationErrorCard';

const SubmitWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const Step = ({isValid, submitText, onSubmit, children}) => (
  <>
    {children}
    <PageValidationErrorCard />
    <SubmitWrapper>
      <PrimaryButton onClick={onSubmit} disabled={!isValid}>
        {submitText}
      </PrimaryButton>
    </SubmitWrapper>
  </>
);

export default Step;
