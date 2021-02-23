import * as actionTypes from './actionTypes';

export const saveResult = (res) => {
  // const updatedResult = res * 2;
  
  // when using 'redux-thunk'
  // => It's synchronous action and only synchronous actions may edit the store.
  return {
    type: actionTypes.STORE_RESULT,
    result: res
  };
};

export const storeResult = (res) => {
  // When using 'redux-thunk'
  // => Never make it to the store, only use storeResult as a utility step in-between to run asynchronous code.
  // => Required to run on a lot of actions and dispatch the synchronous action to change stae in the store.
  return (dispatch, getState) =>  {
    setTimeout(() => {
      // const oldCounter = getState().ctr.counter;
      // console.log(oldCounter);

      dispatch(saveResult(res));
    }, 2000);
  }
};

export const deleteResult = (resElId) => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultElId: resElId
  };
};