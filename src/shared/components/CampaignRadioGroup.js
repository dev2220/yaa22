import React, {useMemo, useCallback} from 'react';
import styled from 'styled-components';
import CampaignSelect from './CampaignSelect';
import RadioGroup from './RadioGroup';

const SecondRowWrapper = styled.div`
  display: flex;
`;

const Status = styled.div`
  color: ${({isActive}) => (isActive ? '#43a047' : '#adadad')};
  font-size: 11px;
`;

const CampaignID = styled.div`
  color: #adadad;
  font-size: 11px;
`;

const SecondRowLabel = ({data}) => (
  <SecondRowWrapper>
    <Status isActive={data.status === 'Active'}>{data.status}- &nbsp;</Status>
    <CampaignID>Campaign ID: {data.idInChannel}</CampaignID>
  </SecondRowWrapper>
);

const defaultGetLabel = option => option?.label;
const defaultGetValue = option => option?.mode;

const CampaignRadioGroup = ({
  options,
  value,
  onChange,
  selectValueProp = 'selectedOption',
  getSelectedLabel = defaultGetLabel,
  getSelectedValue = defaultGetValue,
  campaignOptions,
  selectedCampaign,
  groupLabel,
  groupTooltip,
  ...rest
}) => {
  const selectedValue = useMemo(
    () => options.find(option => getSelectedValue(option) === getSelectedValue(value)),
    [getSelectedValue, options, value]
  );

  const handleOnRadioChange = useCallback(radio => onChange({...radio, [selectValueProp]: null}), [
    onChange,
    selectValueProp,
  ]);

  return (
    <RadioGroup
      options={options}
      groupLabel={groupLabel}
      groupTooltip={groupTooltip}
      value={selectedValue}
      onChange={handleOnRadioChange}
    >
      <CampaignSelect
        label={getSelectedLabel(selectedValue)}
        onChange={selectVal => onChange({...value, [selectValueProp]: selectVal.id})}
        value={campaignOptions.find(opt => selectedCampaign === opt.id) || null}
        options={campaignOptions}
        getSecondRow={data => <SecondRowLabel data={data} />}
        {...rest}
      />
    </RadioGroup>
  );
};

export default CampaignRadioGroup;
