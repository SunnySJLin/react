import React from 'react';
import cssClasses from './BuildControl.css';

const buildControl = (props) => {
  return(
    <div className={cssClasses.BuildControl}>
      <div className={cssClasses.Label}>{props.label}</div>
      <button className={cssClasses.Less}>Less</button>
      <button className={cssClasses.More}>More</button>
    </div>
  );
};

export default buildControl;