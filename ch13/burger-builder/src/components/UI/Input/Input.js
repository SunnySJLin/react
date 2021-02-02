import React from 'react';

import cssClasses from './Input.css';

const input = (props) => {
  let inputElement = null;

  switch(props.inputtype) {
    case ('input'):
      inputElement = <input 
        className={cssClasses.InputElement} 
        {...props} />;
      break;
    case ('textarea'):
      inputElement = <textarea 
        className={cssClasses.InputElement} 
        {...props} />;
      break;
    default:
      inputElement = <input 
        className={cssClasses.InputElement} 
        {...props} />;
      break;
  }

  return (
    <div className={cssClasses.Input}>
      <label className={cssClasses.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;