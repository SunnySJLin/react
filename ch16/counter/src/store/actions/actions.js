export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

export const increment = () => {
  return {
    type: INCREMENT
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  };
};

export const add = (value) => {
  return {
    type: ADD,
    val: value
  };
};

export const subtract = (value) => {
  return {
    type: SUBTRACT,
    val: value
  };
};

export const saveResult = (res) => {
  // when using 'redux-thunk'
  // => It's synchronous action and only synchronous actions may edit the store.
  return {
    type: STORE_RESULT,
    result: res
  };
};

export const storeResult = (res) => {
  // When using 'redux-thunk'
  // => Never make it to the store, only use storeResult as a utility step in-between to run asynchronous code.
  // => Required to run on a lot of actions and dispatch the synchronous action to change stae in the store.
  return dispatch =>  {
    setTimeout(() => {
      dispatch(saveResult(res));
    }, 2000);
  }
};

export const deleteResult = (resElId) => {
  return {
    type: DELETE_RESULT,
    resultElId: resElId
  };
};