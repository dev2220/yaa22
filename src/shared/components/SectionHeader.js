import {Header} from 'shared/components/SectionHeaders';
import React from 'react';
import styled from 'styled-components';
import VariationsSummery from 'shared/components/VariationsSummery';

const VariationsSummeryStyled = styled(VariationsSummery)`
  right: 10px;
  position: absolute;
  bottom: 6px;
`;

const SectionHeader = ({header, children, tooltip}) => (
  <Header tooltip={tooltip} header={header}>
    {children}
    <VariationsSummeryStyled className="variationsSummery" />
  </Header>
);

export default SectionHeader;
