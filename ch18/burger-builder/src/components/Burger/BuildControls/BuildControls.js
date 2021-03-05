import React from 'react';
import cssClasses from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
  return(
    <div className={cssClasses.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      
      {controls.map(ctrl => (
        <BuildControl 
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabledInfo[ctrl.type]}/>
      ))}

      <button 
        className={cssClasses.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>
          { props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER' }
      </button>
    </div>
  );
};

export default buildControls;