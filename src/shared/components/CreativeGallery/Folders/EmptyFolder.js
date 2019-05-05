import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  z-index: 0;
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 50%;
`;

const Text = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme}) => theme.palette.grey};
  background-color: ${({theme}) => theme.palette.selectedText};
  padding: 0px 10px;
  left: 40px;
  position: relative;
`;

const CrossingLine = styled.div`
  border-top: 1px solid #dfdfdf;
  content: '';
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  width: 200px;
  z-index: -1;
`;

const EmptyFolder = () => (
  <Root>
    <Text>Folder is empty</Text>
    <CrossingLine />
  </Root>
);

export default EmptyFolder;
