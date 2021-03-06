import React from 'react';
import cssClasses from './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [cssClasses.InputElement];
  
  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(cssClasses.Invalid);
  }

  let validationError = null;
  
  if(props.invalid && props.touched) {
    validationError = <p className={cssClasses.ValidationError}>{props.errorMessage}</p>;
  }

  switch(props.elementType) {
    case ('input'):
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('textarea'):
      inputElement = <textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('select'):
      inputElement = (
        <select 
          className={inputClasses.join(' ')} 
          defaultValue={props.value}
          onChange={props.changed} >
            {props.elementConfig.options.map( option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ) )}
        </select>
      );
      break;
    default:
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
  }

  return (
    <div className={cssClasses.Input}>
      <label className={cssClasses.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;