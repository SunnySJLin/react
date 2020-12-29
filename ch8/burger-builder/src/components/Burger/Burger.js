import React from 'react';
import cssClasses from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  return(
    <div className={cssClasses.Burger}>
      <BurgerIngredient type="bread-top"/>
      <BurgerIngredient type="cheese"/>
      <BurgerIngredient type="meat"/>
      <BurgerIngredient type="salad"/>
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;