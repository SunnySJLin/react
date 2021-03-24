import { useReducer, useCallback } from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.reqId
      };
    case 'RESPONSE':
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.reqExtra
      };
    case 'ERROR':
      return {
        loading: false,
        error: action.errorMessage
      };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not be reached!');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({type: 'CLEAR'}), []);

  // requestExtra: may be ingredient when adding ingredient or ingredientId when removing by ingredient id
  const sendRequest = useCallback(
    (url, method, body, requestExtra, requestIdentifier) => {
      dispatchHttp({ type: 'SEND', reqId: requestIdentifier }); 
      
      fetch(url, {
        method: method,
        body: body,
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        return res.json();
      }).then(responseData => {
        dispatchHttp({ type: 'RESPONSE', responseData: responseData, reqExtra: requestExtra });
      }).catch(error => {
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
      });
    },
    []
  );

  return {
    isLoading: httpState.loading,
    error: httpState.error,
    data: httpState.data,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    sendRequest: sendRequest,
    clear: clear
  };
};

export default useHttp;