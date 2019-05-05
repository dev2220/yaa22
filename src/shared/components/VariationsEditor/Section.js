import React from 'react';
import {compose, withHandlers, withPropsOnChange, lifecycle, withStateHandlers} from 'recompose';
import {isEqual, sortBy} from 'lodash';
import {DUPLICATION_ERROR_MSG, EXCLUDE_DUPLICATION_ERROR_MSG} from 'shared/constants/translations';
import {SectionWrapper, SectionTitle, MinimizeVariationsWrapper} from './styled';
import Line from './Line';

export const MAX_SECTION_LINES = 3;

export const createLines = ({value = []}) =>
  value.map((lineValue, idx) => ({
    id: idx,
    lineValue,
  }));

const isEqualLineValue = (a, b) => {
  const propToCompare = a.value.length && Object.keys(a.value[0])[0];
  const a1 = {...a, value: sortBy(a.value, propToCompare)};
  const b1 = {...b, value: sortBy(b.value, propToCompare)};
  return isEqual(a1, b1);
};

// WARNING: current ID as key might not be the right solution
const Section = ({
  entities,
  handleLineChange,
  lines,
  title,
  addLine,
  removeLine,
  maxItems,
  forbiddenOptions,
  onVariationsClick,
  hiddenLines,
  hasError,
  disabled,
  createLine,
  withoutMargin,
  error,
  isExcludeSection = false,
  includeValues,
  ...rest
}) => (
  <SectionWrapper withoutMargin={withoutMargin}>
    <SectionTitle>{title}</SectionTitle>
    {lines.map((line, index) => (
      <div key={line.id}>
        {index > lines.length - 1 - hiddenLines ? null : (
          <Line
            hasError={hasError(line, error, isExcludeSection, includeValues)}
            disabled={disabled}
            createLine={createLine}
            otherLinesValue={lines
              ?.filter(otherLine => otherLine.id !== line.id)
              ?.map(otherLine => otherLine.lineValue)}
            forbiddenOptions={forbiddenOptions}
            index={index}
            handleLineChange={handleLineChange}
            addLine={addLine}
            removeLine={removeLine}
            entityOptions={entities}
            removeAble={lines.length > 1 || isExcludeSection}
            addAble={lines.length < maxItems && !isExcludeSection}
            line={line}
            {...rest}
          />
        )}
      </div>
    ))}
    {!hiddenLines && lines.length > MAX_SECTION_LINES ? (
      <MinimizeVariationsWrapper onClick={() => onVariationsClick(lines)}>
        Show Less Variations
      </MinimizeVariationsWrapper>
    ) : hiddenLines > 0 && lines.length > MAX_SECTION_LINES ? (
      <MinimizeVariationsWrapper onClick={() => onVariationsClick(lines)}>
        Show +{hiddenLines} Variations
      </MinimizeVariationsWrapper>
    ) : null}
  </SectionWrapper>
);

const enhance = compose(
  withPropsOnChange(['entities', 'value'], ({entities, createLine, value}) => {
    if (value?.length) {
      return {lines: createLines({value})};
    }
    if (entities?.length) {
      return {
        lines: createLines({value: [createLine({entities})]}),
      };
    }
    return {lines: []};
  }),
  withStateHandlers(({lines}) => ({hiddenLines: Math.max(0, lines.length - MAX_SECTION_LINES)}), {
    onVariationsClick: ({hiddenLines}) => lines => {
      if (hiddenLines > 0) {
        return {hiddenLines: 0};
      }
      return {hiddenLines: Math.max(0, lines.length - MAX_SECTION_LINES)};
    },
    resetHiddenLines: () => () => ({hiddenLines: 0}),
  }),
  withHandlers({
    addLine: ({value, createLine, onChange, entities}) => index => {
      if (value.length) {
        const toAddLine = createLine({entities});
        const updatedLines = value.map(x => x);
        updatedLines.splice(index + 1, 0, toAddLine);
        onChange(updatedLines);
      } else {
        onChange([createLine({entities}), createLine({entities})]);
      }
    },
    removeLine: ({value, onChange}) => index => {
      const updatedLines = value.map(line => line);
      updatedLines.splice(index, 1);
      onChange(updatedLines);
    },
    handleLineChange: ({value, onChange, createLine, entities}) => (changedProp, newValue, idx) => {
      if (value.length) {
        const updatedLines = value.map(x => x);
        let updatedLine = null;
        if (changedProp === 'entity') {
          updatedLine = createLine({entities, entityName: newValue.name});
        } else {
          updatedLine = {...value[idx], [changedProp]: newValue};
        }
        updatedLines.splice(idx, 1, updatedLine);
        onChange(updatedLines);
      } else if (changedProp === 'entity') {
        onChange([createLine({entities, entityName: newValue.name})]);
      } else {
        onChange([{...createLine({entities}), [changedProp]: newValue}]);
      }
    },
    hasError: ({lines}) => (line, error, isExcludeSection, includeValues) => {
      const equalLines = lines.filter(item => isEqualLineValue(item.lineValue, line.lineValue));
      const lastEqualLineId = equalLines[equalLines.length - 1]?.id;
      if (isExcludeSection && includeValues?.length && line.lineValue.value?.length !== 0) {
        const mergedValues = [...lines, ...createLines({value: includeValues})];
        const excludeEqualLines = mergedValues.filter(item => isEqualLineValue(item.lineValue, line.lineValue));
        if (excludeEqualLines.length > 1) {
          return EXCLUDE_DUPLICATION_ERROR_MSG;
        }
      }
      if (error) {
        return error;
      }
      if (equalLines.length > 1 && line.lineValue.value?.length !== 0) {
        return line.id === lastEqualLineId ? DUPLICATION_ERROR_MSG : true;
      }
      return null;
    },
  }),
  lifecycle({
    componentDidUpdate({lines: prevLines}) {
      const {lines, resetHiddenLines} = this.props;
      if (lines !== prevLines && lines.length <= MAX_SECTION_LINES) {
        resetHiddenLines();
      }
    },
  })
);

export default enhance(Section);
