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

export const auth = (email, password, isSignup) => {
  return dispatch =>  {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken	: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[YOUR_API_KEY]';
    if(!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[YOUR_API_KEY]';
    }
    console.log(url);

    axios.post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};