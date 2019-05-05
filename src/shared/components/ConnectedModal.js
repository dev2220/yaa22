import {compose, withPropsOnChange, withHandlers} from 'recompose';
import {connect} from 'react-redux';
import * as actions from 'shared/store/actions';
import Modal from './Modal';

export default compose(
  connect(
    null,
    {closeModal: actions.closeModal}
  ),
  withHandlers({closeModal: ({closeModal}) => () => closeModal()}),
  withPropsOnChange(['close'], ({close, closeModal}) => ({close: close || closeModal}))
)(Modal);
