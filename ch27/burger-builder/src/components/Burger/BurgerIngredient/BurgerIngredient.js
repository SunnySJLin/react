import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './BurgerIngredient.css';

const burgerIngredient = props => {
  let ingredient = null;

  switch (props.type) {
    case 'bread-bottom':
      ingredient = <div className={cssClasses.BreadBottom} />;
      break;
    case 'bread-top':
      ingredient = (
        <div className={cssClasses.BreadTop}>
          <div className={cssClasses.Seeds1} />
          <div className={cssClasses.Seeds2} />
        </div>
      );
      break;
    case 'meat':
      ingredient = <div className={cssClasses.Meat} />;
      break;
    case 'cheese':
      ingredient = <div className={cssClasses.Cheese} />;
      break;
    case 'bacon':
      ingredient = <div className={cssClasses.Bacon} />;
      break;
    case 'salad':
      ingredient = <div className={cssClasses.Salad} />;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default burgerIngredient;