import React from 'react';
import styled, {css} from 'styled-components';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import Tooltip from './Tooltip';

export const H1 = styled.h1`
  font-size: ${({theme}) => theme.typography.headers.sizes.large}px;
  font-weight: ${({theme}) => theme.typography.headers.fontWeights.bold};
`;
export const H2 = styled(H1)`
  font-size: 21px;
  font-weight: ${({theme}) => theme.typography.headers.fontWeights.light};
`;

export const H3 = styled.h1`
  font-size: ${({theme}) => theme.typography.headers.sizes.medium}px;
`;

export const H4 = styled.h1`
  font-size: ${({theme}) => theme.typography.headers.sizes.small}px;
`;

export const H5 = styled.h1`
  color: ${({theme}) => theme.palette.greyBlack};
  font-size: ${({theme}) => theme.typography.headers.sizes.xSmall}px;
  font-weight: ${({theme}) => theme.typography.headers.fontWeights.light};
`;

const linkCss = css`
  color: ${({theme}) => theme.palette.blue};
  cursor: pointer;
`;

const successCss = css`
  color: ${({theme}) => theme.palette.green};
`;

const errorCss = css`
  color: ${({theme}) => theme.palette.red};
`;

const disabledCss = css`
  color: ${({theme}) => theme.palette.grey};
`;

const infoCss = css`
  color: ${({theme}) => theme.palette.blue};
`;

export const Text = styled.span`
  color: ${({theme}) => theme.palette.black};
  font-size: ${({theme}) => theme.typography.texts.sizes.medium}px;
  margin-bottom: ${({titleMargin}) => (titleMargin ? 5 : 0)}px;
  font-weight: ${({bold}) => bold && 'bold'};
  ${({link}) => link && linkCss};
  ${({success}) => success && successCss};
  ${({error}) => error && errorCss};
  ${({disabled}) => disabled && disabledCss};
  ${({info}) => info && infoCss};
`;

export const Caption = styled(Text)`
  font-weight: ${({theme}) => theme.typography.texts.fontWeights.bold};
`;

export const Explanation = styled(Text)`
  color: ${({theme}) => theme.palette.greyBlack};
`;

export const SmallText = styled(Text)`
  line-height: 1.46;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
`;

const Icon = styled(FontAwesomeIcon)`
  font-weight: 300;
  font-size: ${({theme}) => theme.typography.texts.sizes.medium}px;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: #c8ccd2;
  color: white;
  text-align: center;
  margin-left: 4px;
  align-self: center;
  cursor: hand;
`;

export const WithInfo = ({children, tooltip, ...rest}) => (
  <InfoWrapper {...rest}>
    {children}
    {tooltip && (
      <Tooltip {...(typeof tooltip === 'string' ? {text: tooltip} : {...tooltip})}>
        <Icon icon={faInfoCircle} />
      </Tooltip>
    )}
  </InfoWrapper>
);
