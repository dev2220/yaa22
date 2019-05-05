import {compose, withState, withProps, withHandlers, lifecycle} from 'recompose';
import Select from '../Select';
import Menu from './Menu';
import MultiColOption from './MultiColOption';

const customComponents = ({isDropDown, isMenuWithFilter}) => {
  const componentsToReturn = {
    ...(isMenuWithFilter && {Menu, Option: MultiColOption}),
  };
  if (isDropDown) {
    return componentsToReturn;
  }
  return {...componentsToReturn, DropdownIndicator: null};
};

export default compose(
  withProps(props => ({
    components: customComponents(props),
    loadCustomOptions: inputText =>
      props
        .loadCustomOptions(inputText)
        .then(response =>
          response?.map(
            option =>
              props.forbiddenOptions.map(forbidOpt => forbidOpt.id).includes(option.id)
                ? {...option, isDisabled: true}
                : option
          )
        ),
  })),
  withState(
    'filterValue',
    'setFilterValue',
    ({customOptions}) => customOptions?.menuFilters?.[0]?.value
  ),
  withState('isLoading', 'setLoading', false),
  withState('options', 'setOptions', []),
  withState('focusedOption', 'setFocusedOption', null),
  withState('menuIsOpen', 'setMenuIsOpen', false),
  withState('inputValue', 'onInputChange', ''),
  withHandlers({
    reloadOptions: ({
      setFocusedOption,
      setOptions,
      setLoading,
      loadCustomOptions,
      customOptions,
      filterValue,
    }) => val => {
      setLoading(true);
      setOptions([]);
      setFocusedOption(null);
      loadCustomOptions(val).then(res => {
        const filteredOptions = res.filter(opt => customOptions.menuFilterFunc(opt, filterValue));
        if (filteredOptions?.length) {
          setFocusedOption(filteredOptions[0]);
        }
        setLoading(false);
        setOptions(filteredOptions);
      });
    },
  }),
  withHandlers({
    onInputChange: ({reloadOptions, onInputChange}) => val => {
      onInputChange(val);
      reloadOptions(val);
    },
    onMenuOpen: ({setMenuIsOpen}) => () => {
      setMenuIsOpen(true);
    },
    onMenuClose: ({setMenuIsOpen}) => () => {
      setMenuIsOpen(false);
    },
  }),
  lifecycle({
    componentDidUpdate({filterValue: prevFilterValue, menuIsOpen: prevMenuIsOpen}) {
      const {filterValue, reloadOptions, menuIsOpen, inputValue} = this.props;
      if (prevFilterValue !== filterValue || (menuIsOpen !== prevMenuIsOpen && menuIsOpen)) {
        reloadOptions(inputValue);
      }
    },
  })
)(Select);
