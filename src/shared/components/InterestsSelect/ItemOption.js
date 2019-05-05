import React from 'react';
import {compose, withHandlers, withPropsOnChange, withStateHandlers} from 'recompose';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {Label, OptionWrapper, Score} from './styled';
import ArrowIcon from '../ArrowIcon';
import OriginalCheckbox from '../Checkbox';
import Icon from '../Icon';
import {TertiaryButton} from '../Button';

const Checkbox = styled(OriginalCheckbox)`
  pointer-events: none;
`;

const CopyButton = styled(TertiaryButton)`
  display: none;
  align-items: center;
  color: ${({theme}) => theme.palette.blue};
  border: 1px solid ${({theme}) => theme.palette.blue};
  font-size: 11px;
  padding: 5px 8px;
  margin-left: 8px;
  position: absolute;
  right: 45px;
`;

const Wrapper = styled(OptionWrapper)`
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    ${CopyButton} {
      display: flex;
    }
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ItemOption = ({
  data,
  group,
  selectOption,
  isSelected,
  showDetails,
  itemDetails,
  toggleItemDetails,
  createList,
  variationIndex,
  isExcludeSection,
}) => (
  <>
    <Wrapper
      leftPadding={40}
      onClick={e => {
        e.stopPropagation();
        selectOption();
      }}
    >
      <ItemWrapper>
        <ArrowIcon
          onClick={e => {
            e.stopPropagation();
            toggleItemDetails();
          }}
          isMenu={showDetails}
          shouldRotate
          isLeft
        />
        <Label>
          {data.name} <Score>{data.numOfInterests}</Score>
        </Label>
        <CopyButton
          onClick={e => {
            e.stopPropagation();
            const type = 'copy';
            createList({data, group, variationIndex, isExcludeSection, type});
          }}
        >
          <Icon icon={faCopy} />
          Copy to New List
        </CopyButton>
      </ItemWrapper>
      <Checkbox checked={isSelected} />
    </Wrapper>
    {showDetails &&
      itemDetails?.map(s => (
        <OptionWrapper leftPadding={70} key={s.id}>
          <Label>{s.name}</Label>
          <Score>{s.size?.toLocaleString()}</Score>
        </OptionWrapper>
      ))}
  </>
);

const enhance = compose(
  withStateHandlers(
    {showDetails: false, itemDetails: []},
    {
      setItemDetails: () => itemDetails => ({showDetails: true, itemDetails}),
      toggleVisibility: ({showDetails}) => () => ({showDetails: !showDetails}),
    }
  ),
  withHandlers({
    selectOption: ({selectOption, data}) => () => selectOption(data),
    toggleItemDetails: ({
      loadItemDetails,
      setItemDetails,
      toggleVisibility,
      showDetails,
      itemDetails,
      data,
    }) => async () => {
      if (!showDetails && !itemDetails?.length) {
        const details = await loadItemDetails(data.id);
        setItemDetails(details || []);
      } else {
        toggleVisibility();
      }
    },
  }),
  withPropsOnChange(['value', 'data'], ({value, data}) => ({
    isSelected: (value || []).some(i => i.id === data.id),
  }))
);

export default enhance(ItemOption);
