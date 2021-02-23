import * as actionTypes from '../actions/actionTypes';

const initialState = {
  results: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.STORE_RESULT:
      // Change data here for transforming logic
      return {
        ...state,
        results: state.results.concat({id: new Date(), value: action.result * 2})
      }
    case actionTypes.DELETE_RESULT:
      // -- Problem: this only does a shallow copy!
      // -- ERROR: newArray is still the same object!
      // const id = 2;
      // const newArray = [...state.results];
      // newArray.splice(id, 1);
      // Every elements
      // const updatedArray = state.results.filter(result => true); 
      // Filter elements by index
      // const updatedArray = state.results.filter((result, index) => index !== id); 
      const updatedArray = state.results.filter(result => result.id !== action.resultElId);
      return {
        ...state,
        results: updatedArray
      }
  }
  return state;
};

export default reducer;