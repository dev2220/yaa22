import React, {useState, memo, useCallback} from 'react';
import {compose, withHandlers, withPropsOnChange, pure} from 'recompose';
import styled from 'styled-components';
import {debounce} from 'lodash';
import ReactResizeDetector from 'react-resize-detector';
import {FixedSizeList} from 'react-window';
import copy from 'copy-to-clipboard';
import BaseCreative from './Creative';

const marginInCreative = 7;

const CreativesWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
`;

const StyledBaseCreative = styled(BaseCreative)`
  margin: ${marginInCreative}px;
  margin-right: ${({creativeType}) => (creativeType === 'text' ? 24 : marginInCreative)}px;
`;

const calcRows = (rowWidth, getItemWidth, assets) => {
  let lastIndex = 0;
  let currentRowLength = 0;
  const rows =
    assets?.reduce(
      (acc, item) => {
        const itemWidth = getItemWidth(item);
        const expectedWidth = currentRowLength + itemWidth;
        const marginSpace = marginInCreative * 2;
        if (expectedWidth + marginSpace < rowWidth) {
          currentRowLength = expectedWidth + marginSpace;
          acc[lastIndex].push(item);
        } else {
          currentRowLength = itemWidth;
          lastIndex++;
          acc.push([item]);
        }

        return acc;
      },
      [[]]
    ) || [];
  return rows;
};

const enhance = compose(
  withPropsOnChange(['selectedCreativesIds'], ({selectedCreativesIds, asset}) => ({
    isSelected: selectedCreativesIds.includes(asset.id),
  })),
  withHandlers({
    onClick: ({toggleCreativeSelection, asset}) => () => toggleCreativeSelection(asset.id),
    onDelete: ({setCurrentDelete, asset}) => () => setCurrentDelete(asset),
    onRename: ({asset, setCurrentRename}) => () => {
      setCurrentRename(asset);
    },
    onTag: ({setCurrentTaggingAsset, asset}) => () => {
      setCurrentTaggingAsset(asset);
    },
    onCopyName: ({asset}) => () => {
      copy(asset?.name);
    },
    onPreviewClick: ({setSelectedPreviewCreative, asset}) => () =>
      setSelectedPreviewCreative(asset),
  }),
  pure
);

const Creative = enhance(
  ({
    asset,
    onTag,
    onDelete,
    setCurrentTaggingAsset,
    setCurrentDelete,
    setCurrentRename,
    onRename,
    ...rest
  }) => (
    <StyledBaseCreative
      {...asset}
      {...rest}
      onTag={setCurrentTaggingAsset && onTag}
      onDelete={setCurrentDelete && onDelete}
      onRename={setCurrentRename && onRename}
    />
  )
);

const resizeListStyles = {willChange: undefined};

const Row = memo(({data: {rows, rest}, index, style}) => (
  <div style={{...style, willChange: undefined, display: 'flex'}}>
    {rows?.[index].map(asset => <Creative key={asset.id} asset={asset} {...rest} />)}
  </div>
));

const VirtualAssetsList = ({assets, getItemWidth, ...rest}) => {
  const [{width, height}, setDimensions] = useState({width: 0, height: 0});
  const rows = calcRows(width, getItemWidth, assets);
  const handleResize = useCallback(
    debounce(
      (resizedWidth, resizedHeight) => setDimensions({width: resizedWidth, height: resizedHeight}),
      200
    ),
    []
  );

  return (
    <CreativesWrapper>
      <ReactResizeDetector handleWidth handleHeight onResize={handleResize}/>
      <FixedSizeList
        itemSize={166 + marginInCreative * 2}
        width={width}
        height={height}
        itemCount={rows.length}
        itemData={{rows, rest}}
        style={resizeListStyles}
      >
        {Row}
      </FixedSizeList>
    </CreativesWrapper>
  );
};

export default VirtualAssetsList;
