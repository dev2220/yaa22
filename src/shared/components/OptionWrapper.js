import styled, {css} from 'styled-components';
import InfoWrapper from './InfoWrapper';

const calcIndention = (indent, px) => indent * px || 10;

const disabledCss = css`
  cursor: not-allowed;
  & > * {
    color: ${({theme}) => theme.palette.grey};
  }
  &:hover {
    background-color: #ffffff;
  }
`;
const selectedCss = css`
  div,
  label,
  span {
    color: #ffffff;
  }
  background: ${({theme}) => theme.palette.blue};
`;

const hoveredCss = css`
  div,
  label,
  span {
    color: ${({theme}) => theme.palette.black};
  }
  background: ${({theme}) => theme.palette.white};
`;

const borderBottomCss = css`
  border-bottom: solid 1px ${({theme}) => theme.palette.white};
`;

const OptionWrapper = styled.div`
  flex: 1;
  background: #ffffff;
  padding: ${({isCheckedOptions}) => (isCheckedOptions ? '3px' : '10px 10px')};
  padding-left: ${({iconSpace, indention = 0, isCheckedOptions}) =>
    !isCheckedOptions &&
    (iconSpace
      ? `${calcIndention(indention + 1, 15) + 15}px`
      : `${calcIndention(indention + 1, 15)}px`)};
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  ${({isSelected, isCheckedOptions, isSelectWithin}) =>
    isSelected && !isSelectWithin && !isCheckedOptions && selectedCss};
  ${({isDisabled}) => isDisabled && disabledCss};

  &:last-child {
    border: none;
  }
  & > * {
    margin-right: 6px;
    align-items: center;
  }
  & > ${InfoWrapper} > * {
    margin-right: 6px;
  }
  &:hover {
    ${({isSelected}) => !isSelected && hoveredCss};
  }
  &&& {
    padding-left: ${({isGrouped}) => isGrouped && '30px'};
  }
`;

export default OptionWrapper;
