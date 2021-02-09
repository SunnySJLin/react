import * as ActionTypes from './actions';

const initialState = {
  counter: 0,
  results: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.INCREMENT:
      // const newState = state;
      // -- ERROR: this directly modifies the existing object reference - don't do this!
      const newState = Object.assign({}, state);
      newState.counter = state.counter + 1;
      return newState;
    case ActionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      }
    case ActionTypes.ADD:
      return {
        ...state,
        counter: state.counter + action.val
      }
    case ActionTypes.SUBTRACT:
      return {
        ...state,
        counter: state.counter - action.val
      }
    case ActionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({id: new Date(), value: state.counter})
      }
    case ActionTypes.DELETE_RESULT:
      // -- Problem: this only does a shallow copy!
      // -- ERROR: newArray is still the same object!
      // const id = 2;
      // const newArray = [...state.results];
      // newArray.splice(id, 1);

      // every elements
      // const updatedArray = state.results.filter(result => true); 
      // filter by index
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