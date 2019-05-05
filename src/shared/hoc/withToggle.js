import {isFunction} from 'lodash';
import {withStateHandlers} from 'recompose';

const withToggle = (propName = 'isToggled', fnName = 'toggle', defaultValue = true) =>
  withStateHandlers(
    isFunction(defaultValue)
      ? props => ({[propName]: defaultValue(props)})
      : {[propName]: defaultValue},
    {
      [fnName]: state => () => ({
        [propName]: !state[propName],
      }),
    }
  );

export default withToggle;
