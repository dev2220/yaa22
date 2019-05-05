import styled, {css} from 'styled-components';

const selectedCss = css`
  color: white;
  border-color: ${({theme}) => theme.palette.blue};
  background-color: ${({theme}) => theme.palette.blue};
  font-weight: 600;
`;

const hoveredCss = css`
  background-color: ${({theme}) => theme.palette.white};
  color: ${({theme}) => theme.palette.black};
`;

const Objective = styled.div`
  line-height: 1.3;
  text-align: center;
  border: solid 1px rgba(51, 51, 51, 0.2);
  padding: 0 11px;
  height: 70px;
  font-weight: 600;
  width: 150px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({active}) => active && selectedCss};
  &:hover {
    ${({active}) => !active && hoveredCss};
  }
`;

export default Objective;
