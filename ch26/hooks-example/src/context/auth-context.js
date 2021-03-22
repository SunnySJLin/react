import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  isAuth: false,
  login: () => { }
});

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{isAuth: isAuthenticated, login: loginHandler}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;