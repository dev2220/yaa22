import React from 'react';
import {compose, withHandlers, withState} from 'recompose';
import Group from './Group';
import ItemOption from './ItemOption';

const Option = ({
  innerProps,
  label,
  groupItems,
  getGroupItems,
  selectOption,
  data,
  selectProps: {loadItemDetails, isExcludeSection, value, createList, variationIndex},
}) => (
  <Group {...innerProps} label={label} onOpen={getGroupItems}>
    {groupItems.map(i => (
      <ItemOption
        key={i.id}
        data={i}
        value={value}
        selectOption={selectOption}
        group={data}
        loadItemDetails={loadItemDetails}
        variationIndex={variationIndex}
        isExcludeSection={isExcludeSection}
        createList={createList}
      />
    ))}
  </Group>
);

const enhance = compose(
  withState('groupItems', 'setGroupItems', []),
  withHandlers({
    getGroupItems: ({
      groupItems,
      setGroupItems,
      data,
      selectProps: {loadGroupItems},
    }) => async () => {
      if (!groupItems?.length) {
        const items = await loadGroupItems(data.id);
        setGroupItems(items || []);
      }
    },
  })
);

export default enhance(Option);
