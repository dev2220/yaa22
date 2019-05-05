// @flow
import {compose, withStateHandlers, withState, lifecycle} from 'recompose';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

const step = compose(
  connect(
    createStructuredSelector({
      activeSubSection: state => state.activeSubSection,
    })
  ),
  withStateHandlers(() => ({sectionsRef: {}}), {
    setSectionRef: ({sectionsRef}) => (ref, idx) => ({sectionsRef: {...sectionsRef, [idx]: ref}}),
  }),
  withState('isScrolledOnInit', 'setIsScrolledOnInit', false),
  lifecycle({
    componentDidUpdate() {
      const {sectionsRef, activeSubSection, setIsScrolledOnInit, isScrolledOnInit} = this.props;
      if (sectionsRef[0] && !isScrolledOnInit && activeSubSection !== 0) {
        setIsScrolledOnInit(true);
        window.scroll({
          top: sectionsRef[activeSubSection].offsetTop - 50,
          behavior: 'smooth',
        });
      }
    },
  })
);

export default step;
