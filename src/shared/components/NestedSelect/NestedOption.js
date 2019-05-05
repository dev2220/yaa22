import React from 'react';
import {withState, compose} from 'recompose';
import styled from 'styled-components';
import TextWrapper from '../TextWrapper';
import BaseArrowIcon from '../ArrowIcon';
import {Option} from '../Select';
import withHover from '../../hoc/withHover';

const ArrowIcon = styled(BaseArrowIcon)`
  margin-left: 0;
`;

const enhance = compose(withState('isMenu', 'setIsMenu', false));

const FocusableOption = withHover(Option, 'isFocused');

const NestedOption = enhance(
  ({innerProps, children, indention = 0, isFocused, data, setIsMenu, isMenu, ...rest}) => {
    const {onClick} = innerProps;
    const {selectOption, getValue} = rest;
    const value = getValue() || [];
    const {getNestedValue, getOptionsValue, getOptionLabel, setCurrentHint} = rest.selectProps;
    const nestedOptions = getNestedValue(data);
    const options = getOptionsValue(data);
    const isMenuOptions = nestedOptions?.length || options?.length;
    return (
      <>
        <Option
          indention={indention}
          useChildren
          {...{innerProps, ...rest}}
          isFocused={isFocused && !isMenu}
          onClick={() => (isMenuOptions ? setIsMenu(!isMenu) : onClick())}
          data={data}
        >
          <ArrowIcon isLeft shouldRotate isMenu={isMenu} />
          <TextWrapper>{children}</TextWrapper>
        </Option>
        {isMenu &&
          options?.map((option, idx) => (
            <FocusableOption
              key={idx}
              innerProps={{...innerProps, onClick: () => selectOption(option)}}
              data={option}
              isCheckedOption
              indention={indention + 1}
              setCurrentHint={setCurrentHint}
              {...rest}
              iconSpace
              label={getOptionLabel(option)}
              isSelected={value.filter(opt => option.id === opt.id).length === 1}
            />
          ))}
        {isMenu &&
          nestedOptions?.map((option, idx) => (
            <NestedOption
              key={idx}
              innerProps={{...innerProps, onClick: () => selectOption(option)}}
              data={option}
              indention={indention + 1}
              {...rest}
            >
              {getOptionLabel(option)}
            </NestedOption>
          ))}
      </>
    );
  }
);

export default NestedOption;
