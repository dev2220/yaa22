import React, {memo, useCallback} from 'react';
import {TABS, CREATIVE_TYPES} from 'shared/constants/creatives';
import styled from 'styled-components';
import Select from './Select';
import Control from './Control';
import Search from './Search';
import VideoLengthSelect from './VideoLengthSelect';
import {creativeSearchTypes, textSearchTypes} from './filterOptions';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  padding: 0 32px;
  border: 1px solid ${({theme}) => theme.palette.grey};
  border-top: none;
  border-left: none;
  flex-shrink: 0;
  span {
    font-size: 12px;
  }
  .select__single-value {
    font-weight: 600;
  }
`;

const CreativeDimensionsControl = styled(Control)`
  min-width: 130px;
`;

const UploadDateControl = styled(Control)`
  min-width: 180px;
`;

const VideoLengthControl = styled(Control)`
  min-width: 180px;
`;

const KpiSortingControl = styled(Control)`
  min-width: 150px;
`;

const FilterPanel = ({
  dimensionsOptions,
  uploadDateOptions,
  kpiRangeOptions,
  videoLengthOptions,
  onFiltersChange,
  filters,
  selectedTab,
  creativeType,
}) => {
  const updateDimmention = useCallback(({id: dimension}) => onFiltersChange({dimension}), [onFiltersChange]);
  const updateUploadDate = useCallback(({id: uploadDate}) => onFiltersChange({uploadDate}),[onFiltersChange]);
  const updateVideoLength = useCallback(videoLength => onFiltersChange({videoLength}),[onFiltersChange]);
  const updateKpiRange = useCallback(({id: kpiRange}) => onFiltersChange({kpiRange}), [onFiltersChange]);
  const updateSearch = useCallback(search => onFiltersChange({search}), [onFiltersChange]);

  return (
    <Wrapper>
      {selectedTab === TABS.CREATIVES && (
        <>
          <CreativeDimensionsControl>
            <span>Creative Dimensions</span>
            <Select
              options={dimensionsOptions}
              value={filters.dimension}
              onChange={updateDimmention}
              isSearchable={false}
            />
          </CreativeDimensionsControl>
          <UploadDateControl>
            <span>Upload Date</span>
            <Select
              value={filters.uploadDate}
              onChange={updateUploadDate}
              options={uploadDateOptions}
              isSearchable={false}
            />
          </UploadDateControl>
          {creativeType === CREATIVE_TYPES.VIDEO && (
            <VideoLengthControl>
              <span>Video length (sec)</span>
              <VideoLengthSelect
                videoLengthValue={filters.videoLength}
                onChange={updateVideoLength}
                radioOptions={videoLengthOptions}
              />
            </VideoLengthControl>)}
        </>
      )}
      <KpiSortingControl>
        <span>Kpi Range</span>
        <Select
          value={filters.kpiRange}
          onChange={updateKpiRange}
          options={kpiRangeOptions}
          isSearchable={false}
        />
      </KpiSortingControl>
      <Search
        selectedTab={selectedTab}
        options={selectedTab === TABS.CREATIVES ? creativeSearchTypes : textSearchTypes}
        value={filters.search}
        onChange={updateSearch}
      />
    </Wrapper>
  );
};

export default memo(FilterPanel);
