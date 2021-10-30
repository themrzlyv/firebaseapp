import React, { useContext, createContext } from 'react';
import Storage from '../data/Storage';

export const Authentication = () => {
  const { refToken } = Storage.getRefreshToken();
  const { accessToken } = Storage.getAccessToken();

  const isAuthorized = () => {
    if (refToken || accessToken) return true;
    else return false;
  };

  return { isAuthorized };
};

const AuthContext = createContext(Authentication());

export const AuthProvider = ({ children }: any) => {
  const auth = Authentication();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
