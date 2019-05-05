import React from 'react';
import {compose, withState, withPropsOnChange, withHandlers} from 'recompose';
import {flatMap} from 'lodash';
import {defaultCreateLine} from 'shared/utils/variation';
import Header from './Header';
import Section from './Section';
import {Wrapper} from './styled';

const VariationsEditor = ({
  title,
  tooltip,
  maxExcludes = 0,
  maxIncludes = Number.MAX_VALUE,
  isExcludeOn,
  setExcludeOn,
  entities,
  createLine,
  onChangeIncludes,
  onChangeExcludes,
  disabled,
  value: {includes = [], excludes},
  error,
  isFull,
  disableExclude = false,
}) => (
  <Wrapper isFull={isFull}>
    <Header
      {...{
        title,
        tooltip,
        isExcludeOn: isExcludeOn || disabled || disableExclude,
        onChangeExcludes,
        setExcludeOn: maxExcludes > 0 ? setExcludeOn : undefined,
        shouldExcludeSpace: maxIncludes !== 1 || maxExcludes !== 1,
      }}
    />
    <Section
      isFull={isFull}
      value={includes}
      createLine={createLine}
      onChange={onChangeIncludes}
      maxItems={maxIncludes}
      entities={entities}
      disabled={disabled}
      shouldExcludeSpace={maxIncludes !== 1 || maxExcludes !== 1}
      forbiddenOptions={flatMap(excludes, exclude => exclude.value)}
      withoutMargin={!isExcludeOn}
      error={error}
    />
    {isExcludeOn && (
      <Section
        isFull={isFull}
        withoutMargin
        disabled={disabled}
        createLine={createLine}
        forbiddenOptions={flatMap(includes, include => include.value)}
        value={excludes}
        onChange={onChangeExcludes}
        title={`Exclude ${title}`}
        maxItems={maxExcludes}
        entities={entities}
        shouldExcludeSpace={maxIncludes !== 1 || maxExcludes !== 1}
        isExcludeSection
        includeValues={includes}
      />
    )}
  </Wrapper>
);

const enhanceVariationsEditor = compose(
  withPropsOnChange(['createLine'], ({createLine}) => ({
    createLine: createLine || defaultCreateLine,
  })),
  withPropsOnChange(['entityDefaults', 'entities'], ({entityDefaults, entities}) => ({
    entities: entities.map(entity => ({...entityDefaults, ...entity})),
  })),
  withState('isExcludeOn', 'setIsExcludeOn', ({value}) => !!value?.excludes?.length),
  withHandlers({
    onChangeIncludes: ({onChange, value: {excludes}}) => includes => {
      onChange({includes, excludes});
    },
    onChangeExcludes: ({onChange, value: {includes}, setIsExcludeOn}) => excludes => {
      onChange({includes, excludes});
      if (!excludes?.length) {
        setIsExcludeOn(false);
      }
    },
  }),
  withHandlers({
    setExcludeOn: ({setIsExcludeOn, createLine, onChangeExcludes, entities}) => () => {
      onChangeExcludes([createLine({entities})]);
      setIsExcludeOn(true);
    },
  })
);

export default enhanceVariationsEditor(VariationsEditor);
