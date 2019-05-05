import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import {statsToDisplay} from 'shared/constants/creatives';
import {splitCamelCaseString} from 'shared/utils/string';

const Root = styled.div`
  display: ${({isInfoVisible}) => (isInfoVisible ? 'flex' : 'none')};
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  padding: 20px 12px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({theme}) => theme.palette.white};
`;

const HeaderText = styled.div`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SmallText = styled.div`
  font-size: 11px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top;
`;

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 24px 0px;
`;

const Stat = styled.div`
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  width: 50%;
  padding-bottom: 6px;
  &:nth-child(2n-1) {
    border-right: 1px solid rgba(0, 0, 0, 0.3);
  }
`;

const DayMetric = styled.div`
  ${({theme}) => theme.palette.greyBlack};
`;

const Tags = styled.div`
  display: flex;
  border-top: 1px solid ${({theme}) => theme.palette.greyWhite};
  flex-wrap: wrap;
  padding: 8px 4px;
`;

const Tag = styled.div`
  padding: 0 8px;
  border-right: 1px solid ${({theme}) => theme.palette.greyWhite};
  margin-bottom: 8px;
`;

const HiddenTagsCount = styled.div`
  padding: 0 8px;
  text-align: center;
`;

const Tooltip = ({name, isInfoVisible, className, fileSizeInKB, tags, createdTime}) => {
  const [hiddenTags, setHiddenTags] = useState(null);
  const tagsContainerRef = useRef();
  useEffect(() => {
    const childNodes = tagsContainerRef.current?.childNodes;
    if (childNodes) {
      const parOff = tagsContainerRef.current?.offsetParent?.offsetHeight;
      const hiddenCount = Array.from(childNodes).filter(n => parOff < n.offsetTop).length;
      setHiddenTags(hiddenCount > 0 ? hiddenCount + 1 : 0);
    }
  }, [isInfoVisible]);
  return (
    <Root isInfoVisible={isInfoVisible} className={className}>
      <HeaderWrapper>
        <HeaderText>{name}</HeaderText>
        <Row>
          <SmallText>{createdTime}</SmallText>
        </Row>
        <Row>
          <DayMetric>30 Days Metric</DayMetric>
          <SmallText>{fileSizeInKB}</SmallText>
        </Row>
      </HeaderWrapper>
      <Stats>
        {statsToDisplay.map(infoLabel => (
          <Stat key={infoLabel}>
            <div>{splitCamelCaseString(infoLabel)}</div>
            <div>N/A</div>
          </Stat>
        ))}
      </Stats>
      {tags?.length !== 0 && (
        <Tags ref={tagsContainerRef}>
          {tags.map((tag, idx) =>
            idx === tags.length - 1 - hiddenTags && hiddenTags !== 0 ? (
              <HiddenTagsCount key={idx}>{hiddenTags} more tags</HiddenTagsCount>
            ) : (
              <Tag key={tag.name}>{tag.name}</Tag>
            )
          )}
        </Tags>
      )}
      {!!hiddenTags && <HiddenTagsCount>{hiddenTags} more tags</HiddenTagsCount>}
    </Root>
  );
};

export default Tooltip;
