import React, {Suspense} from 'react';

const LazyComponent = Component => props => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

export default LazyComponent;
