import {withState, compose, withProps, withHandlers} from 'recompose';
import Select from '../Select';
import Menu from './Menu';
import MultiValueLabel from './MultiValueLabel';

export default compose(
  withState('currentOptionsIdx', 'setOptionsIdx', 0),
  withProps(({currentOptionsIdx, optionsArray, forbiddenOptions = []}) => {
    const options = optionsArray[currentOptionsIdx].options.map(
      option =>
        forbiddenOptions.map(forbidOpt => forbidOpt.id).includes(option.id)
          ? {...option, isDisabled: true}
          : option
    );
    return {
      components: {Menu, MultiValueLabel},
      options,
    };
  }),
  withHandlers({
    setOptions: ({optionsArray, setOptions}) => idx => {
      setOptions(optionsArray[idx].options);
    },
  })
)(Select);
