import styled, {css} from 'styled-components';
import {Icon} from 'shared/components';
import Clickoutside from 'react-click-outside';

export const Amount = styled.span`
  margin-right: auto;
  white-space: nowrap;
  font-weight: 600;
  position: absolute;
  right: 20px;
  color: ${({theme}) => theme.palette.greyBlack};
`;

const itemCss = css`
  padding: 8px 14px 8px 23px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const selectedCss = css`
  background-color: ${({theme}) => theme.palette.blue};
  color: white;
  span {
    color: white;
  }

  ${Icon} {
    display: flex;
    color: white;
  }
  ${Amount} {
    display: none;
  }
`;

const viewItemCss = css`
  cursor: pointer;
  color: black;
  ${Icon} {
    display: none;
    color: ${({theme}) => theme.palette.blue};
  }
  &:hover {
    background-color: ${({theme}) => theme.palette.greyBackground};
    ${Icon} {
      display: flex;
    }
    ${Amount} {
      display: none;
    }
    ${({selected}) => selected && selectedCss};
  }
  ${({selected}) => selected && selectedCss};
`;

export const Item = styled.div`
  ${itemCss};
`;

export const ViewItem = styled(Item)`
  ${viewItemCss};
  position: relative;
`;

export const EditItem = styled(Clickoutside)`
  ${itemCss};
  ${viewItemCss};
  ${selectedCss};
  &:hover {
    ${({error}) => !error && selectedCss};
    background-color: ${({error, theme}) => error && theme.palette.red};
  }
  background-color: ${({error, theme}) => (error ? theme.palette.red : theme.palette.blue)};
  ${Icon} {
    display: flex;
    color: white;
  }
`;

export const Input = styled.input.attrs({type: 'text'})`
  font-size: inherit;
  font-family: inherit;
  width: 194px;
  height: 30px;
  border-radius: 2px;
  background-color: #ffffff;
`;

export const Text = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 88%;
`;
