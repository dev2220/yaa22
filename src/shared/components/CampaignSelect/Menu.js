import React, {useMemo} from 'react';
import {components} from 'react-select';
import Hint from '../Hint';

// TODO: stats values are currently N/A until we will implement it on server (now it gets only mock values)
const Menu = props => {
  const {
    selectProps: {currentHint},
  } = props;
  const hint = useMemo(
    () =>
      currentHint
        ? [
            {title: 'Campaign Name', value: currentHint.name},
            {title: 'Creation Date', value: currentHint.createdTime},
            {title: 'No. of Ad-sets', value: 'N/A' || currentHint.stats.numberOfAdsets},
            {title: 'Spend', value: 'N/A' || currentHint.stats.mediaSpend},
            {title: 'Installs', value: 'N/A' || currentHint.stats.installs},
            {title: 'CPI', value: 'N/A' || currentHint.stats.cpi},
          ]
        : null,
    [currentHint]
  );

  return (
    <>
      <Hint hint={hint} />
      <components.Menu {...props} />
    </>
  );
};

export default Menu;
