import {Option} from '../Select';
import withHover from '../../hoc/withHover';

const FocusableOption = withHover(Option, 'isFocused');

export default FocusableOption;
