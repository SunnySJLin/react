import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  };
};

export const auth = (email, password) => {
  return dispatch =>  {
    dispatch(authStart());
    console.log(email, password);

    const authData = {
      email: email,
      password: password,
      returnSecureToken	: true
    }
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChlkIOPmYlrL2fgSN-U_yWjwJ9x5DWb1Q', authData)
      .then(response => {
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        dispatch(authFail(error));
      })
  };
};