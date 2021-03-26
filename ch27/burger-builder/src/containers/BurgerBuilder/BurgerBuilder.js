import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionCreators from '../../store/actions/index';

const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector(state => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state =>state.burgerBuilder.error);
  const isAuthenticated = useSelector(state =>state.auth.token !== null);
  
  const onIngredientAdded = (ingName) => dispatch(actionCreators.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(actionCreators.removeIngredient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(actionCreators.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actionCreators.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actionCreators.setAuthRedirectPath(path));

  useEffect(() =>{
    // have router props
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    
    return sum > 0;
  };

  const purchaseHandler = () => {
    if(isAuthenticated) {
      setPurchasing(true);
    } else {
      // Store the path to Redux for redirecting
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...ings
  };

  for(let key in disabledInfo) {
    disabledInfo[key] = (disabledInfo[key] <= 0);
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if(ings) {
    burger = (
      <Auxiliary>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabledInfo={disabledInfo}
          price={price}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated} />
      </Auxiliary>
    );

    orderSummary = <OrderSummary
      ingredients={ings}
      price={price}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler} />;  
  }

  // {salad: true, meat: false, ...}

  return (
    <Auxiliary>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxiliary>
  );
};

export default withErrorHandler(burgerBuilder, axios);