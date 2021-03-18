import React, { useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch('https://react17-hooks-default-rtdb.firebaseio.com/ingredients.json')
      .then(res => res.json())
      .then(responseData => {
        const loadedIngredients = [];
        for(const key in responseData) {
          loadedIngredients.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount
          });
        }
        setUserIngredients(loadedIngredients);
        console.log('INITIAL VALUES', loadedIngredients);
      })
  }, []);
  // If you pass an empty array ([]), the props and state inside the effect will always have their initial values.

  useEffect(() => {
    console.log('RENDERING INGREDIENTS',userIngredients);
  }, [userIngredients]);
  // Only re-run the effect if userIngredients changes

  // Store into userIngredients array
  const addIngredientHandler = ingredient => {
    fetch('https://react17-hooks-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    }).then(res => {
      return res.json();
    }).then(responseData => {
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient }
        ]);
      });
  };

  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      
      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
