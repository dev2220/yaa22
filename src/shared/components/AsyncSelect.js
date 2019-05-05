import React from 'react';
import AsyncReactSelect from 'react-select/lib/Async';
import AsyncCreatableReactSelect from 'react-select/lib/AsyncCreatable';
import {compose, withHandlers, withState} from 'recompose';

const AsyncSelect = ({
  onChange,
  setRef,
  isMappedValue,
  loadOptions,
  setInnerMenuIsOpen,
  menuIsOpen,
  innerMenuIsOpen,
  isCreatable,
  ...rest
}) => {
  const Select = isCreatable ? AsyncCreatableReactSelect : AsyncReactSelect;
  return (
    <Select
      loadOptions={loadOptions}
      onInputChange={inputValue =>
        inputValue.length ? setInnerMenuIsOpen(undefined) : loadOptions(inputValue)
      }
      onChange={value =>
        isMappedValue ? onChange(value.map(({id, name}) => ({id, name}))) : onChange(value)
      }
      ref={setRef}
      menuIsOpen={menuIsOpen || innerMenuIsOpen}
      {...rest}
    />
  );
};

export default compose(
  withState('asyncRef', 'setAsyncRef', null),
  withState('innerMenuIsOpen', 'setInnerMenuIsOpen', undefined),
  withHandlers({
    setRef: ({setInnerRef, setAsyncRef}) => asyncRef => {
      setAsyncRef(asyncRef);
      if (setInnerRef) {
        setInnerRef(asyncRef);
      }
    },
    onFocus: ({onFocus, asyncRef, loadOptions, setInnerMenuIsOpen}) => async () => {
      if (onFocus) {
        onFocus();
      }
      asyncRef.setState({isLoading: true});
      const newOptions = await loadOptions('');
      asyncRef.setState({isLoading: false, defaultOptions: newOptions});
      if (!newOptions?.length) {
        setInnerMenuIsOpen(false);
      }
    },
    loadOptions: ({loadOptions, setInnerMenuIsOpen}) => inputValue =>
      loadOptions(inputValue).then(data => {
        if (!data?.length && inputValue === '') {
          setInnerMenuIsOpen(false);
        }
        return data;
      }),
  })
)(AsyncSelect);
