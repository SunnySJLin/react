import React, { useEffect, useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    console.log('RENDERING INGREDIENTS',userIngredients);
  }, [userIngredients]);
  // Only re-run the effect if userIngredients changes

  // Store into userIngredients array
  const addIngredientHandler = ingredient => {
    setIsLoading(true);

    fetch('https://react17-hooks-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    }).then(res => {
      return res.json();
    }).then(responseData => {
      setIsLoading(false);
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient }
      ]);
    }).catch(error => {
      setErrorMsg('Something went wrong!');
      setIsLoading(false);
    });
  };

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(`https://react17-hooks-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response =>{
      setIsLoading(false);
      setUserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      );
    }).catch(error => {
      setErrorMsg('Something went wrong!');
      setIsLoading(false);
    });
  };

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);

  const clearError = () => {
    setErrorMsg(null);
  }

  return (
    <div className="App">
      {errorMsg && <ErrorModal onClose={clearError}>{errorMsg}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      
      <section>
        <Search
          onLoadIngredients={filteredIngredientsHandler}
        />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
