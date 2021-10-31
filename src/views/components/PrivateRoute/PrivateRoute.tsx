import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../services/selectors/authSelector';

export interface iPrivateRoute {
  exact?: boolean;
  path?: string;
  Component: React.FunctionComponent;
}

const PrivateRoute: React.FC<iPrivateRoute> = ({ exact, path, Component }) => {
  const { currentUser, isLoading } = useSelector(authSelector);
  return (
    <Route
      render={() =>
        isLoading ? <h4>loading</h4> : currentUser ? <Component /> : <Redirect to="auth/login" />
      }
    />
  );
};

export default PrivateRoute;
