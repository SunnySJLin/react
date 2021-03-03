import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout( () => {
      dispatch(authLogout())
    }, expirationTime * 1000);
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

    const API_KEY = '[YOUR_API_KEY]';
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
    if(!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY;
    }
    console.log(url);

    axios.post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};