import React from 'react';

import classes from './Spinner.module.css';

const spinner = () => (
  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
  <div className={classes.ldsring}>
  <div />
  <div />
  <div />
  <div />
</div>
</div>
);


export default spinner;