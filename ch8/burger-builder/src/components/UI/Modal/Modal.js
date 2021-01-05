import React from 'react';
import cssClasses from './Modal.css';

const modal = (props) => {
  return(
    <div className={cssClasses.Modal}>
      {props.children}
    </div>
  );
}

export default modal;