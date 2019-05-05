import React from 'react';
import {pure} from 'recompose';
import styled from 'styled-components';
import {Element} from 'react-scroll';
import {SubHeader} from './SectionHeaders';

export const SubSectionWrapper = styled(Element)`
  display: flex;
`;

const FieldsWrapper = styled.div`
  width: 100%;
  & > * {
    margin-bottom: ${({theme}) => theme.defaultMarginAfterInputField}px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const SubSection = ({header, explanation, children, tooltip}) => (
  <SubSectionWrapper name={header}>
    <SubHeader header={header} tooltip={tooltip}>
      {explanation}
    </SubHeader>
    <FieldsWrapper>{children}</FieldsWrapper>
  </SubSectionWrapper>
);

export default pure(SubSection);
