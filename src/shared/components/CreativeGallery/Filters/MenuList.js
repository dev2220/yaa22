import styled from 'styled-components';
import React from 'react';
import {components} from 'react-select';
import Radio from 'shared/components/RadioGroup/Radio';
import {compose, withStateHandlers} from 'recompose';
import {faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons';
import Icon from '../../Icon';
import KeyHandler from '../../KeyHandler';
import {EMPTY_DEFAULT} from './filterOptions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input.attrs({type: 'number'})`
  margin: 8px;
  height: 26px;
  width: 100%;
  border: 1px solid ${({theme}) => theme.palette.greyWhite};

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const RadioGroup = styled(Radio)`
  height: 36px;
  padding: 0 10px;
  span {
    left: auto;
  }
  &:hover {
    background-color: ${({theme}) => theme.palette.white};
  }
`;

const InputContainer = styled(KeyHandler)`
  display: flex;
  position: relative;
  align-items: center;
`;

const ApplyBtn = styled(Icon).attrs({icon: faArrowAltCircleRight})`
  cursor: pointer;
  color: ${({theme}) => theme.palette.greyWhite};
`;

const MenuList = ({
  updateEquality,
  videoLength,
  updateVideoLength,
  equality,
  apply,
  selectProps: {radioOptions},
  ...props
}) => (
  <>
    <components.MenuList {...props}>
      <Wrapper>
        {radioOptions.map(o => (
          <RadioGroup
            checked={equality === o.id}
            onClick={() => updateEquality(o.id)}
            key={o.id}
            name={o.name}
          />
        ))}
      </Wrapper>
    </components.MenuList>
    {equality !== EMPTY_DEFAULT && (
      <InputContainer onEnter={apply} stopPropagation>
        <Input
          onMouseDown={e => e.stopPropagation()}
          value={videoLength || ''}
          onChange={e => updateVideoLength(e.currentTarget.value)}
        />
        <ApplyBtn onClick={apply} />
      </InputContainer>
    )}
  </>
);

const enhance = compose(
  withStateHandlers(
    ({selectProps: {value}}) => ({
      equality: value?.equality,
      videoLength: value?.videoLength,
    }),
    {
      updateEquality: (_, {setValue}) => equality => {
        if (equality === EMPTY_DEFAULT) {
          setValue({equality, videoLength: 0});
          return {equality, videoLength: 0};
        }
        return {equality};
      },
      updateVideoLength: () => videoLength => ({videoLength}),
      apply: ({equality, videoLength}, {setValue}) => () => setValue({equality, videoLength}),
    }
  )
);

export default enhance(MenuList);
