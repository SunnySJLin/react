import React from 'react';

import cssClasses from './PizzaImage.css';
import PizzaImage from '../../assets/pizza.jpg';

const pizzaImage = (props) => (
  <div className={cssClasses.PizzaImage}>
    <img src={PizzaImage} className={cssClasses.PizzaImg} />
  </div>
);

export default pizzaImage;