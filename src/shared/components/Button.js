import styled, {css} from 'styled-components';

const Button = styled.button`
  border-radius: 2px;
  font-size: 14px;
  padding: ${({theme}) => theme.input.padding}px 36px;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.1s;
  opacity: ${({disabled}) => disabled && 0.3};
`;

export const PrimaryButton = styled(Button)`
  color: ${({theme}) => theme.palette.selectedText};
  background-color: ${({theme}) => theme.palette.blue};
  &:hover {
    background-color: ${({theme, disabled}) => !disabled && theme.palette.blueSecondary};
  }
`;

export const SecondaryButton = styled(Button)`
  color: ${({theme}) => theme.palette.blue};
  background-color: ${({theme}) => theme.palette.selectedText};
  border: solid 1px ${({theme}) => theme.palette.blue};
`;

export const TertiaryButton = styled(Button)`
  background-color: transparent;
  color: rgba(51, 51, 51, 0.6);
`;

export const TransparentButton = styled(Button)`
  background-color: transparent;
  color: ${({theme}) => theme.palette.selectedText};
  border: solid 1px ${({theme}) => theme.palette.selectedText};
  padding: 5px 30px;
  font-size: 16px;
`;

const selectedButton = css`
  &&& {
    color: white;
    background-color: ${({theme}) => theme.palette.blue};
    border: none;
  }
`;

const groupDisabledCss = css`
  &&& {
    opacity: 1;
    color: rgba(51, 51, 51, 0.3);
    border-left-color: ${({theme, shouldDisplayBorderLeft}) =>
      shouldDisplayBorderLeft && theme.palette.greyWhite};
  }
`;

export const SelectableButton = styled(PrimaryButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  line-height: 1.5;
  color: ${({theme}) => theme.palette.black};
  background-color: transparent;
  border: solid 1px #e6e6e6;
  font-size: ${({theme}) => theme.typography.texts.sizes.medium}px;
  ${({selected}) => selected && selectedButton};
  ${({disabled, groupOption}) => disabled && groupOption && groupDisabledCss};
  &:hover {
    background-color: ${({theme, disabled}) => !disabled && theme.palette.white};
  }
`;

export default Button;
