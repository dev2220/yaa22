import styled, {css} from 'styled-components';
import RemoveIcon from '../RemoveIcon';
import Icon from '../Icon';
import TextInput, {Root} from '../Input';

const FIXED_WIDTH = 642;
const ACTIONS_BUTTON_WIDTH = 48;
const ACTIONS_BUTTON_MARGIN_LEFT = 15;

const errorStyle = css`
  border-color: ${({theme}) => theme.palette.red};
  border-radius: 0;
  &:hover {
    border-radius: 0;
    border-color: ${({theme}) => theme.palette.red};
  }
`;

export const ValuesWrapper = styled.div`
  display: flex;
  flex: 1 1 0;
  overflow: hidden;
  flex-wrap: ${({isExtended}) => (isExtended ? `wrap` : `nowrap`)};
`;

export const Wrapper = styled.div`
  width: ${({isFull}) => !isFull && '584px'};
`;

export const Button = styled.button`
  padding: 0;
  background: none;
  color: ${({theme}) => theme.palette.blue};
  visibility: ${({display}) => !display && 'hidden'};
  cursor: ${({display}) => (!display ? 'none' : 'pointer')};
`;

export const ButtonsWrapper = styled.div`
  display: inline-flex;
  flex-direction: ${({addAble}) => (addAble ? 'row' : 'row-reverse')};
  align-items: center;
  margin-left: ${ACTIONS_BUTTON_MARGIN_LEFT}px;
`;

export const RemoveLineButton = styled.button`
  padding: 0;
  background: none;
  color: ${({theme}) => theme.palette.blue};
  visibility: hidden;
  cursor: none;
`;

export const SectionWrapper = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: ${({withoutMargin}) => (withoutMargin ? 0 : '40px')};
`;

export const SectionTitle = styled.div`
  position: absolute;
  top: -20px;
  margin-bottom: 7px;
`;

export const LineWrapper = styled.div`
  max-width: ${({isFull}) => !isFull && `${FIXED_WIDTH}px`};
  margin-bottom: 8px;
  position: relative;
  &:hover {
    ${RemoveLineButton} {
      visibility: ${({removeAble}) => (!removeAble ? 'hidden' : 'visible')};
      cursor: ${({removeAble}) => (!removeAble ? 'none' : 'pointer')};
    }
  }
`;

export const ShowMore = styled.div`
  padding: 10px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

const applyWidthToFirstChild = css`
  & > :nth-child(1) {
    width: calc(100% - (${ACTIONS_BUTTON_WIDTH}px + ${ACTIONS_BUTTON_MARGIN_LEFT}px));
  }
`;

export const GroupSelects = styled.div`
  display: flex;
  ${({isActions}) => isActions && applyWidthToFirstChild};
`;

export const RadiusWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 130px;
  background-color: #f9f9f9;
  padding: 2px 6px 2px 2px;
  border: solid 1px #d6d6d6;
  border-left: 0;
  border-radius: 2px;
  ${({hasError}) => hasError && errorStyle};
`;

export const Radius = styled.input`
  width: 70%;
  margin-right: 5px;
  text-align: center;
  padding-top: 0;
  padding-bottom: 0;
  height: 28px;
  border-radius: 1px;
  border: solid 1px #f1f1f1;
  button {
    outline: none;
    -webkit-appearance: none;
    background-color: transparent;
    border: 1px solid ${({theme}) => theme.palette.red};
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    margin: 0;
    position: relative;
  }
`;

export const CustomIcon = styled(Icon)`
  transform: scale(1);
  margin-right: 0;
`;

export const CustomRemoveIcon = styled(RemoveIcon)`
  color: ${({theme}) => theme.palette.brightWhite};
  background: ${({theme}) => theme.palette.grey};
  &:hover {
    background: ${({theme}) => theme.palette.blue};
  }
`;

export const AddLineButton = styled(Button)`
  width: 35px;
  height: 35px;
  margin-left: -10px;
  color: ${({theme}) => theme.palette.grey};
  &:hover {
    color: ${({theme}) => theme.palette.blue};
  }
`;

export const ExtendedLineWrapper = styled.div`
  min-width: 570px;
`;

export const ErrorMsg = styled.div`
  color: ${({theme}) => theme.palette.red};
  text-align: left;
`;

export const HiddenItemsSum = styled.div`
  border-radius: 12px;
  margin-left: auto;
  margin-right: 8px;
  cursor: pointer;
  padding: 3px 12px;
  background: ${({theme}) => theme.palette.brightWhite};
`;

export const MinimizeVariationsWrapper = styled.div`
  border-radius: 12px;
  background-color: #f1f1f1;
  cursor: pointer;
  box-sizing: border-box;
  margin-right: 63px;
  padding: 3px 0;
  max-width: ${FIXED_WIDTH}px;
  margin-bottom: 8px;
`;

export const GroupTextInput = styled(TextInput)`
  flex: 1;
`;

export const GroupTextInputWrapper = styled.div`
  display: flex;
  flex: 1;
  ${Root} {
    flex-direction: row;
  }
`;

export const RadioRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const RadioGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:first-child) {
    margin-top: 16px;
  }
`;

export const GroupRadioWrapper = styled.div`
  width: 369px;
  border: solid 1px ${({theme}) => theme.palette.greyWhite};
  padding: 0 8px 1px;
  ${RadioGroupWrapper} {
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;
    align-items: baseline;
  }
  ${RadioGroupWrapper} ${RadioRoot} {
    display: inline-flex;
    margin-right: 10px;
  }
  ${RadioGroupWrapper} ${RadioRoot} + ${RadioRoot} {
    margin-top: 3px;
    margin-bottom: 5px;
  }
`;
