import React from 'react';
import styled from 'styled-components';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {splitCamelCaseString} from 'shared/utils/string';
import {statsToDisplay} from 'shared/constants/creatives';
import BaseIcon from '../Icon';

const Times = styled(BaseIcon).attrs({icon: faTimesCircle})`
  width: 12px;
  height: 12px;
  transform: scale(1);
  margin-right: 5px;
  color: ${({theme}) => theme.palette.greyWhite};
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  min-height: 150px;
  background: white;
  & > * {
    padding: 4px 8px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.palette.white};
`;

const Header = styled.div`
  font-weight: 600;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubHeader = styled.div`
  font-size: 11px;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 6px;
  padding-bottom: 6px;
  flex: 1;
`;

const Info = styled(SubHeader)`
  width: 50%;
  &:nth-child(1n) {
    padding-right: 8px;
  }
  &:nth-child(2n) {
    padding-left: 8px;
  }
  &:nth-child(2n - 1) {
    border-right: 1px solid ${({theme}) => theme.palette.white};
  }
`;

const Footer = styled(HeaderWrapper)`
  flex-direction: row;
  flex-wrap: wrap;
  color: ${({theme}) => theme.palette.greyBlack};
  border-top: 1px solid ${({theme}) => theme.palette.white};
  border-radius: 0.5px;
  flex: 1;
  background-color: transparent;
`;

const TagRoot = styled.div`
  display: flex;
  align-items: center;
  margin-right: 17px;
  font-size: 11px;
`;

const Tag = ({children}) => (
  <TagRoot>
    <Times />
    {children}
  </TagRoot>
);

const Tooltip = ({fileSizeInKB, isTextTooltip, tags = [], name, createdTime, stats, className}) => (
  <Root className={className} isTextTooltip={isTextTooltip}>
    <HeaderWrapper>
      <Header>{name}</Header>
      <SubHeader>
        <div>
          Upload Date &nbsp;
          {createdTime.toString()}
        </div>
        <div>
          {fileSizeInKB}
          {fileSizeInKB && 'KB'}
        </div>
      </SubHeader>
    </HeaderWrapper>

    <Content>
      {statsToDisplay.map((infoLabel, idx) => (
        <Info key={idx}>
          <div>{splitCamelCaseString(infoLabel)}</div>
          <div>N/A</div>
        </Info>
      ))}
    </Content>
    {tags.length > 0 && (
      <Footer>
        {tags.map((tag, idx) => (
          <Tag key={idx}>{tag.name}</Tag>
        ))}
      </Footer>
    )}
  </Root>
);

export default Tooltip;
