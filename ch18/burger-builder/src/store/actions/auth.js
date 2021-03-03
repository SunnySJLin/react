import axios from 'axios';

import * as actionTypes from './actionTypes';

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

export const auth = (email, password, isSignup) => {
  return dispatch =>  {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken	: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChlkIOPmYlrL2fgSN-U_yWjwJ9x5DWb1Q';
    if(!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChlkIOPmYlrL2fgSN-U_yWjwJ9x5DWb1Q';
    }
    console.log(url);

    axios.post(url, authData)
      .then(response => {
        console.log(response.data);
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};