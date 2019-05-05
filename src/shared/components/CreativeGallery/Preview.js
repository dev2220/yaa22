import React from 'react';
import {TABS} from 'shared/constants/creatives';
import styled, {css} from 'styled-components';
import Creative from './Creative';
import {useSelectedAssetsFromCache} from './utils';

const Root = styled.div`
  flex-direction: column;
  background-color: ${({theme}) => theme.palette.white};
  min-height: 112px;
`;

const Wrapper = styled.div`
  flex-wrap: nowrap;
  display: flex;
  position: relative;
  overflow-x: auto;
  padding: 0px 30px;
  padding-bottom: 22px;
  margin-top: 25px;
`;

const PreviewCreative = styled(Creative)`
  height: ${({creativeType}) => (creativeType !== 'text' ? '64px' : '103px')};
  max-width: ${({creativeType}) => creativeType !== 'text' && '180px'};
  flex-shrink: 0;
  font-size: 11px;
  min-width: 0;
  margin-right: ${({creativeType}) => creativeType === 'text' && '16px'};
  padding: ${({creativeType}) => (creativeType !== 'text' ? '0px' : '10px')};
  margin-right: 12px;
  border: none;
  width: ${({creativeType}) => (creativeType !== 'text' ? 'auto' : '240px')};
  img {
    width: auto !important;
  }
  svg {
    width: 14px !important;
    height: 14px !important;
  }
`;

const linksCss = css`
  cursor: pointer;
  padding-top: 8px;
  color: ${({theme}) => theme.palette.blue};
  display: inline-block;
  bottom: 2px;
  position: relative;
  font-size: 12px;
`;

const Links = styled.div`
  float: right;
  right: 8px;
  position: relative;
`;

const ClearAll = styled.div`
  ${linksCss};
`;

const Hide = styled.div`
  ${linksCss};
`;

const Seperator = styled.div`
  display: inline-block;
  border-right: solid 1px ${({theme}) => theme.palette.greyDark};
  height: 14px;
  margin: 0px 8px;
`;

const PreviewCreatives = ({
  creativeType,
  creativesIds,
  setSelectedPreviewCreative,
  onChange,
  onClearAll,
  onHide,
  selectedTab,
}) => {
  const creatives = useSelectedAssetsFromCache(creativesIds, selectedTab);
  return (
    <Root>
      <Links>
        <ClearAll onClick={onClearAll}>Clear all</ClearAll>
        <Seperator />
        <Hide onClick={onHide}>Hide</Hide>
      </Links>
      <Wrapper>
        {creatives.map(creative => (
          <PreviewCreative
            onRemove={() => onChange(creative.id)}
            onPreviewClick={() => setSelectedPreviewCreative(creative)}
            {...creative}
            key={creative.id}
            creativeType={creativeType === TABS.CREATIVES ? 'img' : 'text'}
          />
        ))}
      </Wrapper>
    </Root>
  );
};

export default PreviewCreatives;
