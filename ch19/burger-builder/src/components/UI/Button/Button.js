import React from 'react';
import cssClasses from './Button.css';

const button = (props) => (
   <button 
      disabled={props.disabled}
      className={[ cssClasses.Button, cssClasses[props.btnType] ].join(' ')}
      onClick={props.clicked}>
         {props.children}
   </button> 
);

export default button;