import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET': return action.ingredients;
    case 'ADD': return [...currentIngredients, action.ingredient];
    case 'DELETE': return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND': return { loading: true, errorMsg: null };
    case 'RESPONSE': return { ...curHttpState, loading: false };
    case 'ERROR': return { loading: false, errorMsg: action.errorMessage };
    case 'CLEAR': return { ...curHttpState, errorMsg: null };
    default:
      throw new Error('Should not be reached!');
  }
};

const Ingredients = () => {
  const [userIngredients, dispatchIng] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    errorMsg: null
  });

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);
  // Only re-run the effect if userIngredients changes

  // Store into userIngredients array
  const addIngredientHandler = useCallback(ingredient => {
    dispatchHttp({ type: 'SEND' });

    fetch('https://react17-hooks-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      dispatchHttp({ type: 'RESPONSE' })
      return res.json();
    }).then(responseData => {
      dispatchIng({
        type: 'ADD',
        ingredient: { id: responseData.name, ...ingredient }
      });
    }).catch(error => {
      dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
    });
  }, []);

  const removeIngredientHandler = useCallback(ingredientId => {
    dispatchHttp({ type: 'SEND' });

    fetch(`https://react17-hooks-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      dispatchHttp({ type: 'RESPONSE' })

      dispatchIng({ type: 'DELETE', id: ingredientId });
    }).catch(error => {
      dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
    });
  }, []);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatchIng({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const clearError = useCallback(() => {
    dispatchHttp({ type: 'CLEAR' });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {httpState.errorMsg && <ErrorModal onClose={clearError}>{httpState.errorMsg}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
