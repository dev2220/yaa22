import {branch, renderNothing} from 'recompose';

const withHidden = branch(({hidden}) => hidden, renderNothing);
export default withHidden;
