import React from 'react';

import Card from '../UI/Card';
import { useStore } from '../../hooks-store/store';
import './ProductItem.css';

const ProductItem = props => {
  // To get dispatch function and store to dispatch constant
  const dispatch = useStore()[1];

  const toggleFavHandler = () => {
    dispatch('TOGGLE_FAV', props.id);
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
