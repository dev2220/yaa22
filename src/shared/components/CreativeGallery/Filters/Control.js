import styled from 'styled-components';

const Control = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100px;
  border-left: 1px solid ${({theme}) => theme.palette.greyWhite};
  padding-left: 24px;
  margin: 0px 24px 0px 0px;

  &:first-child {
    border-left: none;
    padding-left: 0;
  }
`;

export default Control;
